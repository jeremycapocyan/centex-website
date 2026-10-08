"use client";

import { useState } from "react";
import Link from "next/link";
import { services } from "@/lib/content";
import { Icon } from "./icon";

export function QuotePicker() {
  const [coverage, setCoverage] = useState("auto");
  return <div className="quote-picker"><div className="picker-field"><Icon name={services.find(s => s.slug === coverage)?.icon || "car"} size={22} /><div><label htmlFor="coverage-choice">What can we help protect?</label><select id="coverage-choice" value={coverage} onChange={e => setCoverage(e.target.value)}>{services.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}</select></div></div><Link className="button button-orange" href={`/quote/?coverage=${coverage}`}>Find my coverage</Link></div>;
}
