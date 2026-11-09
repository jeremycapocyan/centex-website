"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronRight, MessageCircle, X } from "lucide-react";
import { agency, services } from "@/lib/content";

type Topic = "start" | "quote" | "payment" | "portal" | "coverage" | "contact";
const topics: { id: Exclude<Topic, "start">; label: string; detail: string }[] = [
  { id: "quote", label: "Get a quote", detail: "Auto, home, or business" },
  { id: "payment", label: "Make a payment", detail: "Carrier billing and IPFS" },
  { id: "portal", label: "Open Portal", detail: "Policies, ID cards, and documents" },
  { id: "coverage", label: "Explore coverage", detail: "Find an insurance option" },
  { id: "contact", label: "Contact our team", detail: "A person in your corner" },
];
const messages: Record<Topic, string> = {
  start: "Hi! What can we help you find today? Choose an option below.",
  quote: "How would you like to get started? Explore auto and home quotes online, or tell our team about your business.",
  payment: "Find your carrier’s payment portal, billing contacts, and the Centex Insurance Solutions IPFS premium financing portal in our client center.",
  portal: "Sign in to the Portal to access available policies, insurance ID cards, and documents. It opens in a new tab.",
  coverage: "Choose a coverage option to learn more. Our team can help you discuss your needs and available options.",
  contact: "Connect with our Round Rock team. Select option 1 for quotes or option 2 for general inquiries when you call.",
};

export function GuidedAssistant() {
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<Topic>("start");
  function close() { dialog.current?.close(); }
  function choose(next: Topic) {
    setTopic(next);
    content.current?.scrollTo({ top: 0 });
    requestAnimationFrame(() => {
      dialog.current?.querySelector<HTMLButtonElement>(next === "start" ? ".assistant-choice" : ".assistant-back")?.focus();
    });
  }
  function action(href: string, label: string, external = false) {
    return external || href.startsWith("/quote/") || href.startsWith("tel:") || href.startsWith("mailto:")
      ? <a className="assistant-action" href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onClick={close}>{label}<ArrowUpRight size={18} aria-hidden="true" />{external && <span className="assistant-sr"> (opens in a new tab)</span>}</a>
      : <Link className="assistant-action" href={href} onClick={close}>{label}<ChevronRight size={18} aria-hidden="true" /></Link>;
  }
  return <>
    <button ref={launcher} type="button" className="assistant-launcher" aria-haspopup="dialog" aria-expanded={open} aria-controls="guided-assistant" onClick={() => { dialog.current?.showModal(); setOpen(true); }}><MessageCircle size={22} aria-hidden="true" /><span>Need help?</span></button>
    <dialog ref={dialog} id="guided-assistant" className="assistant-panel" aria-labelledby="assistant-title" aria-describedby="assistant-kind" onKeyDown={event => {
      if (event.key !== "Tab") return;
      const items = Array.from(dialog.current?.querySelectorAll<HTMLElement>("button, a[href]") || []);
      const first = items[0]; const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }} onClose={() => { setOpen(false); launcher.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close(); } }}>
      <header className="assistant-header"><div><span id="assistant-kind">Guided assistant</span><h2 id="assistant-title">Centex Insurance Solutions Assistant</h2></div><button autoFocus type="button" className="assistant-close" onClick={close} aria-label="Close assistant"><X size={22} aria-hidden="true" /></button></header>
      <div className="assistant-content" ref={content}>
        {topic !== "start" && <button className="assistant-back" type="button" onClick={() => choose("start")}><ArrowLeft size={16} aria-hidden="true" />Back to options</button>}
        <div className="assistant-message" role="status" aria-live="polite" aria-atomic="true"><MessageCircle size={20} aria-hidden="true" /><p>{messages[topic]}</p></div>
        <div className="assistant-options" aria-label="Assistant options">
          {topic === "start" && topics.map(item => <button type="button" className="assistant-choice" key={item.id} onClick={() => choose(item.id)}><span><strong>{item.label}</strong><small>{item.detail}</small></span><ChevronRight size={19} aria-hidden="true" /></button>)}
          {topic === "quote" && <>{action("/quote/#instant-quote", "Auto & Home instant quotes")}{action("/quote/?coverage=commercial#agent-panel", "Commercial & Business quotes")}{action("/quote/?coverage=other#agent-panel", "Talk with an agent")}</>}
          {topic === "payment" && action("/client-center/#carrier-support", "Find payment & carrier support")}
          {topic === "portal" && action(agency.client, "Open Portal", true)}
          {topic === "coverage" && services.map(service => <Link className="assistant-action" key={service.slug} href={`/insurance/${service.slug}/`} onClick={close}>{service.name}<ChevronRight size={18} aria-hidden="true" /></Link>)}
          {topic === "contact" && <>{action(agency.telephone, `Call ${agency.phone}`)}{action(`mailto:${agency.email}`, `Email ${agency.email}`)}</>}
        </div>
        <p className="assistant-note">This guided assistant helps you find information. For coverage confirmations, policy changes, or claims assistance, contact our team or your insurer.</p>
      </div>
    </dialog>
  </>;
}
