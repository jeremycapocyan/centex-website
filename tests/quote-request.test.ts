import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateQuote, type QuoteRequest } from "../src/lib/quote-request";
import { buildQuoteEmail } from "../src/lib/quote-email";
import { centexLogoBase64 } from "../src/lib/email-logo";
import { getMailConfig, sendQuoteEmail } from "../src/lib/microsoft-mail";
import { allowQuoteAttempt, createFormToken, verifyFormToken } from "../src/lib/quote-security";
import { POST } from "../src/app/api/quote-request/route";

const sample: QuoteRequest = { firstName: "Taylor", lastName: "Sample", email: "taylor@example.com", phone: "(512) 555-0142", coverage: "commercial", zip: "78664", comments: "Please discuss business coverage with me.", contactPermission: true };
const config = { tenantId: "11111111-1111-4111-8111-111111111111", clientId: "22222222-2222-4222-8222-222222222222", clientSecret: "test-only-not-a-real-microsoft-secret" };

test("validation normalizes input and rejects invalid or injected contact fields", () => {
  assert.deepEqual(validateQuote({ ...sample, firstName: " Taylor " }).errors, {});
  assert.equal(validateQuote({ ...sample, firstName: " Taylor " }).data.firstName, "Taylor");
  const invalid = validateQuote({ ...sample, email: "victim@example.com\r\nBcc: other@example.com", phone: "123", zip: "ABCDE", coverage: "invalid", firstName: "Bad\r\nName", comments: "x".repeat(4001), contactPermission: false });
  assert.deepEqual(Object.keys(invalid.errors).sort(), ["comments", "contactPermission", "coverage", "email", "firstName", "phone", "zip"]);
  assert.ok(validateQuote(null).errors.email);
  assert.ok(validateQuote({ ...sample, contactPermission: "true" }).errors.contactPermission);
});

test("email escapes user HTML, keeps comments, and embeds the real supplied logo", () => {
  const email = buildQuoteEmail({ ...sample, firstName: '<img src=x onerror="attack()">', comments: "Line one\n<script>bad()</script>&" }, "test-reference");
  assert.ok(email.html.includes("&lt;script&gt;bad()&lt;/script&gt;&amp;"));
  assert.ok(email.html.includes("Line one<br />"));
  assert.ok(!email.html.includes("<script>"));
  assert.ok(email.html.includes('src="cid:centex-logo"'));
  assert.ok(email.html.includes('href="mailto:taylor@example.com?subject=Re%3A'));
  assert.equal(email.to, "info@centexis.com");
  assert.equal(email.from, "service@centexis.com");
  assert.equal(email.replyTo, sample.email);
  assert.ok(email.text.includes("Phone: (512) 555-0142"));
  assert.deepEqual(Buffer.from(centexLogoBase64, "base64"), readFileSync("public/brand/centex-logo.png"));
});

test("form tokens expire and reject tampering, rapid submission, and different secrets", () => {
  const now = Date.now();
  const token = createFormToken(config.clientSecret, now);
  assert.equal(verifyFormToken(token, config.clientSecret, now + 1000), null);
  assert.ok(verifyFormToken(token, config.clientSecret, now + 3000));
  assert.equal(verifyFormToken(token, "other-secret", now + 3000), null);
  assert.equal(verifyFormToken(token + "0", config.clientSecret, now + 3000), null);
  assert.equal(verifyFormToken(token, config.clientSecret, now + 7200001), null);
});

test("throttling bounds repeated submissions and expires", () => {
  const key = `test-${Date.now()}`;
  for (let i = 0; i < 5; i++) assert.equal(allowQuoteAttempt(key, 100000), true);
  assert.equal(allowQuoteAttempt(key, 100000), false);
  assert.equal(allowQuoteAttempt(key, 700001), true);
});

test("sending remains unavailable until all Microsoft settings and activation are present", () => {
  assert.equal(getMailConfig({}), null);
  assert.equal(getMailConfig({ MS_TENANT_ID: config.tenantId, MS_CLIENT_ID: config.clientId, MS_CLIENT_SECRET: config.clientSecret }), null);
  assert.equal(getMailConfig({ QUOTE_FORM_ENABLED: "true", MS_TENANT_ID: "https://untrusted.example", MS_CLIENT_ID: config.clientId, MS_CLIENT_SECRET: config.clientSecret }), null);
});

test("Microsoft sendMail receives fixed destination, reply-to, logo attachment, and HTML", async () => {
  const calls: { url: string; options: RequestInit | undefined }[] = [];
  const fetcher = (async (url, options) => {
    calls.push({ url: String(url), options });
    return calls.length === 1 ? Response.json({ access_token: "fake-token" }) : new Response(null, { status: 202 });
  }) as typeof fetch;
  await sendQuoteEmail(sample, "test-reference", config, fetcher);
  assert.equal(calls.length, 2);
  assert.ok(calls[0].url.startsWith("https://login.microsoftonline.com/"));
  assert.equal(calls[1].url, "https://graph.microsoft.com/v1.0/users/service%40centexis.com/sendMail");
  const body = JSON.parse(String(calls[1].options?.body));
  assert.equal(body.message.toRecipients[0].emailAddress.address, "info@centexis.com");
  assert.equal(body.message.replyTo[0].emailAddress.address, "taylor@example.com");
  assert.equal(body.message.attachments[0].contentId, "centex-logo");
  assert.equal(body.message.attachments[0].isInline, true);
  assert.equal(body.message.attachments[0].contentBytes, centexLogoBase64);
  assert.equal(body.saveToSentItems, true);
});

test("Microsoft authorization or delivery failure never reports success", async () => {
  await assert.rejects(sendQuoteEmail(sample, "test", config, (async () => new Response(null, { status: 401 })) as typeof fetch), /MAIL_AUTH_FAILED/);
  let count = 0;
  await assert.rejects(sendQuoteEmail(sample, "test", config, (async () => ++count === 1 ? Response.json({ access_token: "fake" }) : new Response(null, { status: 403 })) as typeof fetch), /MAIL_NOT_ACCEPTED/);
});

test("quote API rejects invalid input and only confirms accepted submissions", async t => {
  const keys = ["MS_TENANT_ID", "MS_CLIENT_ID", "MS_CLIENT_SECRET", "QUOTE_FORM_ENABLED"] as const;
  const original = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  let calls = 0;
  let fail = false;
  t.mock.method(globalThis, "fetch", async (url: string) => {
    calls++;
    if (String(url).includes("login.microsoftonline.com")) return Response.json({ access_token: "fake" });
    return new Response(null, { status: fail ? 503 : 202 });
  });
  t.mock.method(console, "error", () => {});
  const request = (body: unknown, origin = "https://centex.example", ip = String(Math.random())) => new Request("https://centex.example/api/quote-request/", { method: "POST", headers: { origin, "Content-Type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify(body) });
  const token = () => createFormToken(config.clientSecret, Date.now() - 3000);
  try {
    for (const key of keys) delete process.env[key];
    assert.equal((await POST(request(sample))).status, 503);
    Object.assign(process.env, { MS_TENANT_ID: config.tenantId, MS_CLIENT_ID: config.clientId, MS_CLIENT_SECRET: config.clientSecret, QUOTE_FORM_ENABLED: "true" });
    const localRequest = new Request("http://localhost:3001/api/quote-request/", { method: "POST", headers: { origin: "http://127.0.0.1:3001", host: "127.0.0.1:3001", "Content-Type": "application/json" }, body: "{}" });
    assert.equal((await POST(localRequest)).status, 400, "Next.js hostname normalization does not reject a same-origin request");
    assert.equal((await POST(request(sample, "https://attacker.example"))).status, 403);
    assert.equal((await POST(request({ ...sample, formToken: token(), website: "spam" }))).status, 400);
    assert.equal((await POST(request({ ...sample, formToken: "invalid" }))).status, 400);
    assert.equal((await POST(request({ ...sample, formToken: token(), email: "invalid" }))).status, 400);
    assert.equal((await POST(request({ ...sample, formToken: token(), comments: "x".repeat(25000) }))).status, 400);
    assert.equal(calls, 0);
    const valid = { ...sample, formToken: token(), website: "", to: "attacker@example.com" };
    const success = await POST(request(valid));
    assert.equal(success.status, 200);
    assert.equal((await success.json()).success, true);
    assert.equal(calls, 2);
    assert.equal((await POST(request(valid))).status, 200);
    assert.equal(calls, 2, "duplicate does not send again in the same instance");
    fail = true;
    const failed = { ...sample, formToken: token(), website: "" };
    const failure = await POST(request(failed));
    assert.equal(failure.status, 502);
    assert.equal((await failure.json()).success, undefined);
    assert.equal((await POST(request(failed))).status, 409);
  } finally {
    for (const key of keys) { if (original[key] === undefined) delete process.env[key]; else process.env[key] = original[key]; }
  }
});
