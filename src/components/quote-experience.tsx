"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Car, House, ArrowUpRight, ArrowRight, Check, Phone, ShieldCheck, MessageCircle, FileText, Store, BriefcaseBusiness } from "lucide-react";
import { agency } from "@/lib/content";
import { QuoteFlow } from "./quote-flow";

export function QuoteExperience({ formToken, agentFirst }: { formToken: string | null; agentFirst: boolean }) {
  const search = useSearchParams();
  const [mode, setMode] = useState(search.get("coverage") === "commercial" ? "business" : agentFirst ? "agent" : "instant");
  const [coverage, setCoverage] = useState<string | undefined>(undefined);
  return <div className="quote-experience" id="instant-quote">
    <div className="quote-mode-picker" role="group" aria-label="Choose how to get a quote">
      <button type="button" aria-pressed={mode === "instant"} aria-controls="instant-panel" onClick={() => setMode("instant")}><span className="quote-mode-icon"><Car size={23} /><House size={19} /></span><span><strong>Auto &amp; home quotes</strong><small>Start online in the Portal</small></span><ArrowUpRight size={20} /></button>
      <button type="button" aria-pressed={mode === "business"} aria-controls="agent-panel" onClick={() => { setCoverage("commercial"); setMode("business"); }}><span className="quote-mode-icon"><BriefcaseBusiness size={25} /></span><span><strong>Commercial &amp; Business Quotes</strong><small>Tell us about your business</small></span><ArrowUpRight size={20} /></button>
      <button type="button" aria-pressed={mode === "agent"} aria-controls="agent-panel" onClick={() => setMode("agent")}><span className="quote-mode-icon"><MessageCircle size={25} /></span><span><strong>Talk with an agent</strong><small>Other coverage or a little guidance</small></span><ArrowUpRight size={20} /></button>
    </div>
    <div id="instant-panel" hidden={mode !== "instant"}>
      <div className="consumer-workspace">
        <div className="consumer-main"><div className="consumer-heading"><p className="eyebrow">LET’S GET YOU STARTED</p><h2>A few details.<br /><em>More possibilities.</em></h2><p>Tell us a little about yourself to explore auto and home quotes.</p></div>
          <div className="consumer-frame-shell"><div className="consumer-frame-bar"><span><ShieldCheck size={19} aria-hidden="true" /><span>Online quoting<small>Portal</small></span></span><a href={agency.quote} target="_blank" rel="noopener noreferrer" aria-label="Open Portal in a new tab">New tab<ArrowUpRight size={17} aria-hidden="true" /></a></div><div className="consumer-frame-wrap"><iframe width="800" height="1800" id="cpIframe" name="Secure Live Insurance Quoting" title="Centex Insurance Solutions instant auto and home insurance quotes — Portal" src={agency.quote} loading="lazy" /></div></div>
          <p className="consumer-footnote">Information entered here goes directly to our external quoting provider. Quotes depend on insurer eligibility and underwriting. Completing the form does not bind coverage.</p>
        </div>
        <aside className="consumer-guide" aria-label="Quote preparation and support"><div className="consumer-guide-top"><span className="guide-icon"><FileText size={24} /></span><p className="eyebrow">A LITTLE PREPARATION</p><h3>Make yourself<br />quote-ready.</h3><p>A few details can help you move through the form.</p><ul><li><Check size={16} />Your contact information</li><li><Check size={16} />Vehicle or property details</li><li><Check size={16} />Current policy, if you have one</li></ul></div><div className="consumer-support"><span className="support-label">REAL PEOPLE. RIGHT HERE.</span><h3>We’re in your corner.</h3><p>Have a question along the way? Your Centex Insurance Solutions team is a phone call away.</p><a href={agency.telephone}><Phone size={17} />{agency.phone}<ArrowUpRight size={17} /></a><span>Round Rock roots. Texas-wide service.</span></div><div className="consumer-direct"><p>Prefer a separate window?</p><a href={agency.quote} target="_blank" rel="noopener noreferrer">Open the quoting tool <ArrowRight size={16} /></a><small>Also helpful if the embedded form does not load on your device.</small></div></aside>
      </div>
    </div>
    <div id="agent-panel" hidden={mode === "instant"}>
      <div className="agent-intro quote-illustrated-intro">
        <div><p className="eyebrow">{mode === "business" ? "FOR EVERYTHING YOU’RE BUILDING" : "LET’S TALK IT THROUGH"}</p><h2>{mode === "business" ? "Your business. Our local support." : "A person in your corner."}</h2><p>{mode === "business" ? "From your first customer to your next chapter, tell us what you do. Our team will help you explore coverage for your business." : "For business, life, renters, and other coverage—or help with auto and home—connect with our local team."}</p><div className="quote-intro-tags"><span><Store size={16} aria-hidden="true" />Local businesses</span><span><MessageCircle size={16} aria-hidden="true" />Personal guidance</span></div></div>
        <div className="quote-business-art" aria-hidden="true"><svg viewBox="0 0 360 220" fill="none"><ellipse cx="177" cy="196" rx="146" ry="12" fill="#dcecf2"/><circle cx="187" cy="101" r="91" fill="#e7f3fa"/><g className="quote-art-building"><rect x="83" y="79" width="188" height="113" rx="8" fill="white" stroke="#8cbad0" strokeWidth="2"/><path d="M75 79h204l-21-33H96L75 79Z" fill="#0869aa"/><path d="M75 79h34v14a17 17 0 0 1-34 0V79Zm68 0h34v14a17 17 0 0 1-34 0V79Zm68 0h34v14a17 17 0 0 1-34 0V79Z" fill="#78bfeb"/><path d="M109 79h34v14a17 17 0 0 1-34 0V79Zm68 0h34v14a17 17 0 0 1-34 0V79Zm68 0h34v14a17 17 0 0 1-34 0V79Z" fill="#0a4261"/><rect x="103" y="121" width="85" height="49" rx="5" fill="#edf7fc" stroke="#8cbad0" strokeWidth="2"/><path d="M145 122v47M113 157l25-25m6 21 24-24" stroke="#b2d8ec" strokeWidth="3"/><path d="M207 192v-70h42v70" fill="#bce0f2" stroke="#8cbad0" strokeWidth="2"/><circle cx="239" cy="157" r="3" fill="#0a4261"/></g><g className="quote-art-shield"><path d="m278 112 31 12v23c0 22-31 38-31 38s-31-16-31-38v-23l31-12Z" fill="#0a4261" stroke="white" strokeWidth="4"/><path d="m264 148 10 10 19-22" stroke="#9cddff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></g><path d="M54 192v-32m0 16c-23-1-22-23-22-23 24 0 22 23 22 23Zm0-8s-1-23 22-25c2 22-22 25-22 25Z" stroke="#63a69d" strokeWidth="4" strokeLinejoin="round"/></svg></div>
      </div>
      <QuoteFlow formToken={formToken} coverage={coverage} onCoverageChange={setCoverage} />
    </div>
  </div>;
}
