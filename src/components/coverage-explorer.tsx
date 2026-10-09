"use client";

import Link from "next/link";
import Image from "next/image";
import { coverageImages } from "@/lib/imagery";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import { Icon } from "./icon";

export function CoverageExplorer() {
  const [selected, setSelected] = useState("home");
  const service = services.find(item => item.slug === selected)!;

  return <div className="coverage-explorer">
    <div className="coverage-choices" aria-label="Choose coverage to explore">{services.map(item => <button key={item.slug} type="button" aria-pressed={selected === item.slug} aria-controls="coverage-panel" onClick={() => setSelected(item.slug)}><Icon name={item.icon} size={22} /><span>{item.name}</span><ArrowUpRight size={17} aria-hidden="true" /></button>)}</div>
    <div className="coverage-panel" id="coverage-panel" aria-live="polite" aria-atomic="true">
      <div className="coverage-panel-content" key={selected}><span className="coverage-panel-icon"><Icon name={service.icon} size={36} /></span><p className="eyebrow">{service.name}</p><h3>{service.short}</h3><p>{service.description}</p><ul>{service.items.slice(0, 3).map(item => <li key={item}><Icon name="check" size={17} />{item}</li>)}</ul><div className="coverage-panel-actions"><Link className="button button-navy" href={`/quote/?coverage=${service.slug}`}>Get a quote<ArrowRight size={17} aria-hidden="true" /></Link><Link className="text-link" href={`/insurance/${service.slug}/`}>Explore coverage<ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>
      <div className="coverage-photo" key={`photo-${selected}`}><Image src={coverageImages[selected].src} alt={coverageImages[selected].alt} fill sizes="(max-width: 760px) 100vw, 35vw" /></div><span className="coverage-panel-footnote">Coverage shaped around your life.</span>
    </div>
  </div>;
}
