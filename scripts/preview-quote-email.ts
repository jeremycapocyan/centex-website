import { mkdir, writeFile } from "node:fs/promises";
import { buildQuoteEmail } from "../src/lib/quote-email";
import { centexLogoBase64 } from "../src/lib/email-logo";

// Entirely fictional sample. This script writes a preview; it never sends email.
const preview = buildQuoteEmail({
  firstName: "Taylor", lastName: "Sample", email: "taylor@example.com", phone: "512-555-0142",
  coverage: "commercial", zip: "78664", contactPermission: true,
  comments: "I own a small property-maintenance business in Round Rock and would like to discuss general liability coverage.\n\nPlease contact me by email to let me know what information you need for a quote.",
}, "PREVIEW-ONLY", `data:image/png;base64,${centexLogoBase64}`);
async function main() {
  await mkdir(".sites-runtime", { recursive: true });
  await writeFile(".sites-runtime/quote-email-preview.html", preview.html);
  await writeFile(".sites-runtime/quote-email-preview.txt", preview.text);
  console.log("Email preview created: .sites-runtime/quote-email-preview.html (no email sent).");
}
main().catch(() => { console.error("Could not write the email preview."); process.exitCode = 1; });
