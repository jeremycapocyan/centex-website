import { services } from "./content";
import { QUOTE_RECIPIENT, QUOTE_SENDER, type QuoteRequest } from "./quote-request";

export function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function buildQuoteEmail(quote: QuoteRequest, reference: string, logo = "cid:centex-logo") {
  const coverage = services.find(service => service.slug === quote.coverage)?.name || quote.coverage;
  const subject = `New quote request: ${coverage} — ${quote.firstName} ${quote.lastName}`;
  const reply = `mailto:${quote.email}?subject=${encodeURIComponent(`Re: Your ${coverage.toLowerCase()} request — Centex Insurance Solutions`)}`;
  const rows = [
    ["First Name", quote.firstName], ["Last Name", quote.lastName], ["Email", quote.email],
    ["Phone", quote.phone], ["Insurance", coverage], ["ZIP Code", quote.zip],
    ["Comments", quote.comments || "No additional comments provided."],
  ];
  const htmlRows = rows.map(([label, value]) => `<tr><th scope="row" align="left" valign="top" style="width:120px;padding:13px 18px 13px 0;font-family:Arial,sans-serif;font-size:13px;line-height:22px;font-weight:600;color:#253b4b;border-bottom:1px solid #edf1f4;">${label}</th><td valign="top" style="padding:13px 0;font-family:Arial,sans-serif;font-size:14px;line-height:24px;color:#61717c;overflow-wrap:anywhere;word-break:break-word;border-bottom:1px solid #edf1f4;">${escapeHtml(value).replace(/\n/g, "<br />")}</td></tr>`).join("");
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>New Centex quote request</title></head>
<body style="margin:0;padding:0;background:#f2f6f9;color:#253b4b;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">New ${escapeHtml(coverage.toLowerCase())} request from ${escapeHtml(quote.firstName)} ${escapeHtml(quote.lastName)}.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f2f6f9;"><tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2eaf0;border-top:4px solid #0066b3;border-radius:8px;"><tr><td style="padding:26px 26px 12px;">
<img src="${escapeHtml(logo)}" width="166" height="106" alt="Centex Insurance Solutions" style="display:block;border:0;max-width:166px;height:auto;" />
<h1 style="margin:21px 0 8px;font-family:Arial,sans-serif;font-size:25px;line-height:34px;font-weight:500;color:#233c50;">You have a new <span style="color:#0066b3;font-weight:700;">quote request</span></h1>
<p style="margin:0 0 23px;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#61717c;">from your Centex Insurance Solutions website.</p>
<table width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">${htmlRows}</table>
<p style="margin:22px 0 0;font-family:Arial,sans-serif;font-size:12px;line-height:20px;color:#788792;">The requester agreed to be contacted by email or phone about this quote request.</p>
</td></tr><tr><td align="center" style="padding:26px 26px 34px;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td bgcolor="#0066b3" style="border-radius:5px;mso-padding-alt:14px 25px;"><a href="${escapeHtml(reply)}" style="display:inline-block;padding:14px 25px;font-family:Arial,sans-serif;font-size:14px;line-height:20px;font-weight:700;color:#ffffff;text-decoration:none;">Send a Reply</a></td></tr></table>
<p style="margin:17px 0 0;font-family:Arial,sans-serif;font-size:12px;line-height:20px;color:#788792;">You can also use your email application's Reply button.</p>
</td></tr><tr><td style="border-top:1px solid #edf1f4;padding:18px 26px;font-family:Arial,sans-serif;font-size:11px;line-height:18px;color:#788792;">Centex Insurance Solutions &middot; (512) 770-6400<br />Reference: ${escapeHtml(reference)}<br />This request does not bind or change insurance coverage.</td></tr></table>
</td></tr></table></body></html>`;
  const text = `You have a new quote request from your Centex Insurance Solutions website.\n\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n\n")}\n\nPermission to contact about this request: Yes\nReply to: ${quote.email}\nReference: ${reference}\nThis request does not bind or change insurance coverage.`;
  return { from: QUOTE_SENDER, to: QUOTE_RECIPIENT, replyTo: quote.email, subject, html, text };
}
