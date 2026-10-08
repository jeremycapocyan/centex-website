import { services } from "./content";

export type QuoteRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverage: string;
  zip: string;
  comments: string;
  contactPermission: boolean;
};

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>;
export const QUOTE_RECIPIENT = "info@centexis.com";
export const QUOTE_SENDER = "service@centexis.com";
export const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i;

export function validateQuote(input: unknown): { data: QuoteRequest; errors: QuoteErrors } {
  const raw = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const field = (key: string) => typeof raw[key] === "string" ? raw[key].trim() : "";
  const data: QuoteRequest = {
    firstName: field("firstName"), lastName: field("lastName"),
    email: field("email"), phone: field("phone"), coverage: field("coverage"),
    zip: field("zip"), comments: field("comments").replace(/\r\n?/g, "\n"),
    contactPermission: raw.contactPermission === true,
  };
  const errors: QuoteErrors = {};
  for (const name of ["firstName", "lastName"] as const) {
    if (!data[name] || data[name].length > 80 || /[\x00-\x1f\x7f]/.test(data[name])) {
      errors[name] = `Enter your ${name === "firstName" ? "first" : "last"} name (up to 80 characters).`;
    }
  }
  if (data.email.length > 254 || !EMAIL_PATTERN.test(data.email)) errors.email = "Enter a valid email address.";
  const digits = data.phone.replace(/\D/g, "");
  if (!/^[+()\d .-]{7,40}$/.test(data.phone) || digits.length < 10 || digits.length > 15) errors.phone = "Enter a phone number with 10 to 15 digits.";
  if (!services.some(service => service.slug === data.coverage)) errors.coverage = "Choose the insurance you need.";
  if (!/^\d{5}(?:-\d{4})?$/.test(data.zip)) errors.zip = "Enter a valid ZIP code.";
  if (data.comments.length > 4000 || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(data.comments)) errors.comments = "Keep comments under 4,000 characters and use plain text.";
  if (!data.contactPermission) errors.contactPermission = "Please allow our team to contact you about this request.";
  return { data, errors };
}
