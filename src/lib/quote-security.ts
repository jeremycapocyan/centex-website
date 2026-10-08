import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export function createFormToken(secret: string, now = Date.now()) {
  const value = `${now}.${randomUUID()}`;
  return `${value}.${createHmac("sha256", secret).update(value).digest("hex")}`;
}

export function verifyFormToken(token: unknown, secret: string, now = Date.now()) {
  if (typeof token !== "string" || !/^\d{13}\.[a-f0-9-]{36}\.[a-f0-9]{64}$/.test(token)) return null;
  const [issued, id, signature] = token.split(".");
  const age = now - Number(issued);
  if (age < 2000 || age > 2 * 60 * 60 * 1000) return null;
  const expected = createHmac("sha256", secret).update(`${issued}.${id}`).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex")) ? id : null;
}

// An instance-local guard, not a substitute for deployment-level rate limiting.
const attempts = new Map<string, { count: number; expires: number }>();
export function allowQuoteAttempt(key: string, now = Date.now()) {
  for (const [id, entry] of attempts) if (entry.expires <= now) attempts.delete(id);
  const current = attempts.get(key);
  if (current) { current.count++; return current.count <= 5; }
  if (attempts.size >= 5000) return false;
  attempts.set(key, { count: 1, expires: now + 10 * 60 * 1000 });
  return true;
}

const submissions = new Map<string, { state: "pending" | "sent" | "uncertain"; expires: number }>();
export function getSubmissionState(id: string, now = Date.now()) {
  for (const [key, value] of submissions) if (value.expires <= now) submissions.delete(key);
  return submissions.get(id)?.state;
}
export function setSubmissionState(id: string, state: "pending" | "sent" | "uncertain") {
  if (submissions.size >= 5000) submissions.delete(submissions.keys().next().value!);
  submissions.set(id, { state, expires: Date.now() + 2 * 60 * 60 * 1000 });
}
