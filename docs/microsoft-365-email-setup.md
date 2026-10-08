# Activate quote-request email delivery

The website form is implemented. Sending is disabled until a Microsoft 365 administrator authorizes the application's access and the production variables below are configured.

## Delivery behavior

- Sender mailbox: **service@centexis.com**
- Recipient: **info@centexis.com** (fixed on the server)
- Reply-To: the validated requester's email address
- Notification: branded HTML email with the original Centex logo attached inline, submitted fields, and a **Send a Reply** button
- Sent messages are saved to the service mailbox's Sent Items.
- This sends a notification email; it does not create an EZLynx applicant.

## Request for your Microsoft 365 administrator

> Please register a single-tenant Microsoft Entra application named “Centex Website Quote Requests.” Authorize Microsoft Graph application email sending from service@centexis.com, scoped to that mailbox only using Exchange Online Application RBAC. The app needs Application Mail.Send, with no mailbox-reading permission. Please configure the tenant ID, application/client ID, and client secret securely in the production Vercel project centex-website-omce. Confirm service@centexis.com is an actual accessible mailbox, not only an alias. We will perform one clearly labeled test request and confirm it reaches info@centexis.com before considering delivery live.

## Administrator configuration

1. Confirm the sender mailbox exists in this Microsoft 365 tenant and can send email. If its user principal name differs from service@centexis.com, confirm the correct mailbox identifier before activation; the current implementation addresses `/users/service@centexis.com/sendMail`.
2. Create a single-tenant app registration in Microsoft Entra ID. Record its Directory (tenant) ID and Application (client) ID. Create a client secret and record its expiry for rotation. The application uses the client-credentials flow; no interactive redirect URL is required.
3. Follow Microsoft's [Exchange Online Application RBAC guide](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac) to register the service principal in Exchange, define a resource scope limited to service@centexis.com, and assign **Application Mail.Send** to that scope. Use the enterprise application's service-principal Object ID where required, not the app-registration Object ID. Test authorization for the sender and confirm another mailbox is out of scope. Do not also grant unscoped tenant-wide Entra Mail.Send: the two authorization systems are additive and an unrestricted grant would defeat the mailbox scope.
4. In Vercel → coach-jeremy → **centex-website-omce** → Settings → Environment Variables, add the following for **Production**. Keep credentials out of GitHub, chat, and client-side code:

| Name | Value |
| --- | --- |
| `MS_TENANT_ID` | Directory/tenant ID (GUID) |
| `MS_CLIENT_ID` | App registration's application/client ID (GUID) |
| `MS_CLIENT_SECRET` | Client secret **value**, stored as a sensitive variable |
| `QUOTE_FORM_ENABLED` | `true` after authorization is configured |

5. Redeploy the project so it receives the new environment variables. Leave other connected Vercel projects and preview environments disabled unless they are intentionally approved for email sending too.
6. Submit one clearly labeled test request with a controlled test email address. Confirm receipt in info@centexis.com, inline-logo rendering, the reply button, ordinary Reply behavior, and a copy in service@centexis.com's Sent Items. Microsoft Graph's 202 response means the request was accepted for processing; it does not independently prove inbox delivery. If delivery fails, inspect Exchange message tracing and the service mailbox for nondelivery reports.

This setup does not require a Microsoft 365 mailbox password or enabling legacy SMTP authentication. The application only calls the OAuth token endpoint and Graph `sendMail`.

## Existing protections and operational limits

- Server and browser validation, limited request size, escaped HTML fields, fixed recipient/sender, explicit contact consent, a honeypot, and signed expiring form tokens.
- Same-origin JSON requests only. Tokens must be at least two seconds old and expire after two hours.
- Instance-local throttling (five attempts per ten minutes) and duplicate suppression. These reset on cold starts and do not coordinate across Vercel instances. Configure a deployment-level Vercel firewall rate limit for POST `/api/quote-request/` before opening the form broadly; add a challenge if spam becomes a problem.
- Graph sending is never automatically retried after an ambiguous failure. The UI preserves entries and directs the requester to contact the agency, avoiding an unverified success message.
- No quote database, browser persistence, or submission-content logging is added. Submitted details are processed by Vercel and Microsoft 365 and retained in agency mailboxes according to the agency's policies.
- Rotate the client secret before its expiry and redeploy. After any configuration change, test delivery again.

## Local preview and tests

`npm run preview:email` produces `.sites-runtime/quote-email-preview.html` using fictional data and the embedded logo. No email is sent. `npm test` tests validation, escaping, authorization failure, provider acceptance, and API rejection paths using mocked network calls; it sends no real emails.

References: [Microsoft Graph sendMail](https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0), [client credentials flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow), [Exchange application scoping](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac).
