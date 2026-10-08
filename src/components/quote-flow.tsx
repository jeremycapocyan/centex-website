"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { services, agency } from "@/lib/content";
import { Icon } from "./icon";

export function QuoteFlow() {
  const search = useSearchParams();
  const fromUrl = search.get("coverage");
  const [choice, setChoice] = useState<string | null>(null);
  const selected = choice || (services.some(s => s.slug === fromUrl) ? fromUrl : "auto");
  const service = services.find(s => s.slug === selected)!;
  const online = ["auto", "home", "renters"].includes(service.slug);
  return <div className="quote-layout"><p>Choose the coverage you’d like to explore.</p><div className="quote-options" role="group" aria-label="Choose an insurance type">{services.map(s => <button key={s.slug} type="button" className={`quote-option ${s.slug === selected ? "selected" : ""}`} aria-pressed={s.slug === selected} onClick={() => setChoice(s.slug)}><Icon name={s.icon} size={27} />{s.name}</button>)}</div><div className="quote-next"><div><h2>Let’s talk {service.name.toLowerCase()}.</h2><p>{online ? "Continue to Centex’s existing online quote service." : "Connect with the Centex team to discuss your coverage needs."}</p></div><a className="button button-primary" href={online ? agency.quote : agency.contact} target="_blank" rel="noopener noreferrer">{online ? "Start my online quote" : "Contact an agent"}</a></div><p className="detail-note">{service.prompt} The next step opens Centex’s current website in a new tab. Selecting a coverage type here does not submit a request or bind coverage.</p><div className="quote-help"><Icon name="phone" size={20} /><span>Prefer a real conversation?</span><a href={agency.telephone}>{agency.phone}</a><span>Choose option 1 for a new quote.</span></div></div>;
}
