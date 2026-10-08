import { createHmac } from "node:crypto";
import { getMailConfig, sendQuoteEmail } from "@/lib/microsoft-mail";
import { validateQuote } from "@/lib/quote-request";
import { allowQuoteAttempt, getSubmissionState, setSubmissionState, verifyFormToken } from "@/lib/quote-security";

export const runtime = "nodejs";
export const maxDuration = 30;

function reply(data: object, status: number) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > 24000) throw new Error("TOO_LARGE");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("EMPTY_BODY");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      length += chunk.value.byteLength;
      if (length > 24000) { await reader.cancel(); throw new Error("TOO_LARGE"); }
      chunks.push(chunk.value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as Record<string, unknown>;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host") || new URL(request.url).host;
  let sameOrigin = false;
  try {
    const url = new URL(origin || "");
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    // Next.js may normalize request.url to localhost behind its HTTP server.
    // The Host header retains the browser-facing host and port.
    sameOrigin = url.origin === origin && url.host === host && (url.protocol === "https:" || (local && url.protocol === "http:"));
  } catch { /* A missing or malformed Origin is not a website submission. */ }
  if (!sameOrigin) return reply({ error: "Please submit your request from the Centex website." }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return reply({ error: "Unsupported request format." }, 415);
  const config = getMailConfig();
  if (!config) return reply({ error: "Online requests are temporarily unavailable. Please call (512) 770-6400 or email info@centexis.com." }, 503);
  const address = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateKey = createHmac("sha256", config.clientSecret).update(address).digest("hex");
  if (!allowQuoteAttempt(rateKey)) return reply({ error: "Too many requests. Please wait 10 minutes or call (512) 770-6400." }, 429);
  let body: Record<string, unknown>;
  try { body = await readBody(request); } catch { return reply({ error: "We could not read your request. Check the form and try again." }, 400); }
  if (!body || typeof body !== "object" || Array.isArray(body) || (body.website !== undefined && body.website !== "")) return reply({ error: "Unable to submit this request." }, 400);
  const reference = verifyFormToken(body.formToken, config.clientSecret);
  if (!reference) return reply({ error: "This form has expired or was submitted too quickly. Please reload the page and try again." }, 400);
  const { data, errors } = validateQuote(body);
  if (Object.keys(errors).length) return reply({ error: "Please check the highlighted fields.", errors }, 400);
  const previous = getSubmissionState(reference);
  if (previous === "sent") return reply({ success: true, reference }, 200);
  if (previous) return reply({ error: "This request is already processing, or its delivery could not be confirmed. Please call (512) 770-6400 before resubmitting." }, 409);
  setSubmissionState(reference, "pending");
  try {
    await sendQuoteEmail(data, reference, config);
    setSubmissionState(reference, "sent");
    return reply({ success: true, reference }, 200);
  } catch {
    // No request content, credentials, or provider responses are written to logs.
    setSubmissionState(reference, "uncertain");
    console.error("Quote email could not be confirmed by Microsoft 365.");
    return reply({ error: "We could not confirm your request was sent. Your entries are still here. Please call (512) 770-6400 or email info@centexis.com for help." }, 502);
  }
}
