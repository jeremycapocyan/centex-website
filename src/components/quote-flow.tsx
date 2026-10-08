"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { services, agency } from "@/lib/content";
import { validateQuote, type QuoteErrors } from "@/lib/quote-request";
import { Icon } from "./icon";

export function QuoteFlow({ formToken }: { formToken: string | null }) {
  const search = useSearchParams();
  const fromUrl = search.get("coverage");
  const [choice, setChoice] = useState<string | null>(null);
  const selected = choice || (services.some(service => service.slug === fromUrl) ? fromUrl : "auto")!;
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const busy = useRef(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !formToken) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const { data, errors: fieldErrors } = validateQuote({ ...Object.fromEntries(fields), coverage: selected, contactPermission: fields.get("contactPermission") === "on" });
    setErrors(fieldErrors);
    setMessage("");
    if (Object.keys(fieldErrors).length) {
      const firstField = form.elements.namedItem(Object.keys(fieldErrors)[0]);
      if (firstField instanceof HTMLElement) firstField.focus();
      return;
    }
    busy.current = true;
    setPending(true);
    try {
      const response = await fetch("/api/quote-request/", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: fields.get("website"), formToken }),
        signal: AbortSignal.timeout(35000),
      });
      const result = await response.json() as { success?: boolean; reference?: string; error?: string; errors?: QuoteErrors };
      if (!response.ok || result.success !== true || !result.reference) {
        setErrors(result.errors || {});
        setMessage(result.error || "We could not confirm your request. Please call our team for help.");
        requestAnimationFrame(() => alertRef.current?.focus());
        return;
      }
      setReference(result.reference);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setMessage("We could not confirm your request was sent. Your entries are still here. Please call (512) 770-6400 before trying again.");
      requestAnimationFrame(() => alertRef.current?.focus());
    } finally { busy.current = false; setPending(false); }
  }

  function fieldError(name: keyof QuoteErrors) {
    return errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  }

  if (reference) return <div className="quote-success" ref={successRef} tabIndex={-1} role="status"><CheckCircle2 size={48} aria-hidden="true" /><p className="eyebrow">YOUR NEXT STEP IS UNDERWAY</p><h2>Thanks for reaching out.</h2><p>Your quote request has been submitted. Our Centex team will review your details and contact you using the information you provided.</p><p className="detail-note">Reference: {reference}<br />Submitting this form does not bind insurance coverage.</p><Link className="button button-navy" href="/">Back to home<ArrowRight size={17} aria-hidden="true" /></Link></div>;

  return <div className="quote-request-layout">
    <div className="quote-form-card">
      <div className="quote-form-heading"><span className="quote-step">01</span><div><h2>What would you like to protect?</h2><p>Select a coverage type to get started.</p></div></div>
      <div className="quote-options" role="group" aria-label="Choose an insurance type">{services.map(service => <button key={service.slug} type="button" disabled={pending} className={`quote-option ${service.slug === selected ? "selected" : ""}`} aria-pressed={service.slug === selected} onClick={() => setChoice(service.slug)}><Icon name={service.icon} size={25} />{service.name}</button>)}</div>
      <div className="quote-form-heading quote-details-heading"><span className="quote-step">02</span><div><h2>A little about you.</h2><p>Our team will use these details to follow up on your request.</p></div></div>
      {!formToken && <div className="quote-setup-notice" role="status"><strong>Online requests are being set up.</strong><span>You can preview the form below. To request a quote now, call <a href={agency.telephone}>{agency.phone}</a> or email <a href={`mailto:${agency.email}`}>{agency.email}</a>.</span></div>}
      <form onSubmit={submit} noValidate aria-label="Insurance quote request" aria-busy={pending}>
        <fieldset className="quote-fields" disabled={pending}>
          <legend className="sr-only">Your contact information</legend>
          <div className="quote-input-grid">
            <label htmlFor="firstName">First name <span aria-hidden="true">*</span><input id="firstName" name="firstName" autoComplete="given-name" maxLength={80} required aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "firstName-error" : undefined} />{fieldError("firstName")}</label>
            <label htmlFor="lastName">Last name <span aria-hidden="true">*</span><input id="lastName" name="lastName" autoComplete="family-name" maxLength={80} required aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "lastName-error" : undefined} />{fieldError("lastName")}</label>
            <label htmlFor="email">Email address <span aria-hidden="true">*</span><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{fieldError("email")}</label>
            <label htmlFor="phone">Phone number <span aria-hidden="true">*</span><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />{fieldError("phone")}</label>
            <label htmlFor="zip">ZIP code <span aria-hidden="true">*</span><input id="zip" name="zip" autoComplete="postal-code" inputMode="numeric" maxLength={10} required aria-invalid={!!errors.zip} aria-describedby={errors.zip ? "zip-error" : undefined} />{fieldError("zip")}</label>
          </div>
          <label className="quote-comments" htmlFor="comments">What would you like us to know? <span className="optional-label">Optional</span><textarea id="comments" name="comments" rows={5} maxLength={4000} placeholder="Tell us a little about what you need to protect or any questions you have." aria-invalid={!!errors.comments} aria-describedby={`comments-help${errors.comments ? " comments-error" : ""}`} />{fieldError("comments")}</label>
          <p className="quote-field-help" id="comments-help">Please leave out Social Security numbers, payment details, and other sensitive documents. Up to 4,000 characters.</p>
          <div className="quote-honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty<input id="website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <label className="quote-consent"><input type="checkbox" name="contactPermission" required aria-invalid={!!errors.contactPermission} aria-describedby={errors.contactPermission ? "contactPermission-error" : undefined} /><span>I agree that Centex Insurance Solutions may contact me by email or phone about this quote request. <Link href="/privacy/">Privacy information</Link>.</span></label>
          {fieldError("contactPermission")}
        </fieldset>
        {message && <div className="quote-submit-error" role="alert" tabIndex={-1} ref={alertRef}>{message}</div>}
        <div className="quote-submit-row"><button className="button button-primary" type="submit" disabled={pending || !formToken}>{pending ? <><LoaderCircle size={18} className="spin" aria-hidden="true" />Sending request…</> : <>Request my quote<Send size={17} aria-hidden="true" /></>}</button><span>Fields marked * are required.</span></div>
        <p className="quote-field-help">This is a request for a quote. Coverage begins only after confirmation from your agent or insurer.</p>
      </form>
    </div>
    <aside className="quote-request-aside"><span className="coverage-icon"><Icon name="support" size={29} /></span><p className="eyebrow">A REAL TEAM IN YOUR CORNER</p><h2>A little clarity.<br />A lot of care.</h2><p>Tell us what matters to you. We’ll help you explore coverage and find your next step.</p><ol><li><strong>Share your details.</strong><span>Start with your coverage needs and how to reach you.</span></li><li><strong>We’ll review your request.</strong><span>Your information goes to the Centex team.</span></li><li><strong>Let’s talk through your options.</strong><span>A local agent will help with the details.</span></li></ol><div className="quote-aside-contact"><span>Prefer to speak with us?</span><a href={agency.telephone}><Icon name="phone" size={18} />{agency.phone}</a><small>Choose option 1 for a new quote.</small><a href={`mailto:${agency.email}`} className="quote-aside-email">{agency.email}</a></div></aside>
  </div>;
}
