// Server-only: imported by the quote page and API route, never by client components.
import { centexLogoBase64 } from "./email-logo";
import { buildQuoteEmail } from "./quote-email";
import { QUOTE_RECIPIENT, QUOTE_SENDER, type QuoteRequest } from "./quote-request";

export type MailConfig = { tenantId: string; clientId: string; clientSecret: string };

export function getMailConfig(env: Record<string, string | undefined> = process.env): MailConfig | null {
  const guid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
  if (env.QUOTE_FORM_ENABLED !== "true" || !guid.test(env.MS_TENANT_ID || "") || !guid.test(env.MS_CLIENT_ID || "") || !env.MS_CLIENT_SECRET) return null;
  return { tenantId: env.MS_TENANT_ID!, clientId: env.MS_CLIENT_ID!, clientSecret: env.MS_CLIENT_SECRET };
}

export async function sendQuoteEmail(quote: QuoteRequest, reference: string, config: MailConfig, fetcher: typeof fetch = fetch) {
  const tokenResponse = await fetcher(`https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`, {
    method: "POST", cache: "no-store", signal: AbortSignal.timeout(10000),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: config.clientId, client_secret: config.clientSecret, scope: "https://graph.microsoft.com/.default", grant_type: "client_credentials" }),
  });
  if (!tokenResponse.ok) throw new Error("MAIL_AUTH_FAILED");
  const token = await tokenResponse.json() as { access_token?: string };
  if (typeof token.access_token !== "string" || !token.access_token) throw new Error("MAIL_AUTH_FAILED");
  const email = buildQuoteEmail(quote, reference);
  const response = await fetcher(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(QUOTE_SENDER)}/sendMail`, {
    method: "POST", cache: "no-store", signal: AbortSignal.timeout(15000),
    headers: { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        subject: email.subject,
        body: { contentType: "HTML", content: email.html },
        toRecipients: [{ emailAddress: { address: QUOTE_RECIPIENT } }],
        replyTo: [{ emailAddress: { address: email.replyTo, name: `${quote.firstName} ${quote.lastName}` } }],
        attachments: [{ "@odata.type": "#microsoft.graph.fileAttachment", name: "centex-logo.png", contentType: "image/png", contentId: "centex-logo", isInline: true, contentBytes: centexLogoBase64 }],
      },
      saveToSentItems: true,
    }),
  });
  // Graph 202 confirms acceptance, not final delivery into the recipient inbox.
  if (response.status !== 202) throw new Error("MAIL_NOT_ACCEPTED");
}
