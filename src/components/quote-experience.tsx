"use client";

import { useState } from "react";
import { Car, House, ArrowUpRight, ArrowRight, Check, Phone, ShieldCheck, MessageCircle, FileText } from "lucide-react";
import { agency } from "@/lib/content";
import { QuoteFlow } from "./quote-flow";

export function QuoteExperience({ formToken, agentFirst }: { formToken: string | null; agentFirst: boolean }) {
  const [mode, setMode] = useState(agentFirst ? "agent" : "instant");
  return <div className="quote-experience" id="instant-quote">
    <div className="quote-mode-picker" role="group" aria-label="Choose how to get a quote">
      <button type="button" aria-pressed={mode === "instant"} aria-controls="instant-panel" onClick={() => setMode("instant")}><span className="quote-mode-icon"><Car size={23} /><House size={19} /></span><span><strong>Auto &amp; home quotes</strong><small>Start online with EZLynx</small></span><ArrowUpRight size={20} /></button>
      <button type="button" aria-pressed={mode === "agent"} aria-controls="agent-panel" onClick={() => setMode("agent")}><span className="quote-mode-icon"><MessageCircle size={25} /></span><span><strong>Talk with an agent</strong><small>Other coverage or a little guidance</small></span><ArrowUpRight size={20} /></button>
    </div>
    <div id="instant-panel" hidden={mode !== "instant"}>
      <div className="consumer-workspace">
        <div className="consumer-main"><div className="consumer-heading"><p className="eyebrow">LET’S GET YOU STARTED</p><h2>A few details.<br /><em>More possibilities.</em></h2><p>Tell us a little about yourself to explore auto and home quotes.</p></div>
          <div className="consumer-frame-shell"><div className="consumer-frame-bar"><span><ShieldCheck size={19} aria-hidden="true" /><span>Online quoting<small>Powered by EZLynx</small></span></span><a href={agency.quote} target="_blank" rel="noopener noreferrer" aria-label="Open EZLynx quoting in a new tab">New tab<ArrowUpRight size={17} aria-hidden="true" /></a></div><div className="consumer-frame-wrap"><iframe width="800" height="1800" id="cpIframe" name="Secure Live Insurance Quoting" title="Centex instant auto and home insurance quotes — EZLynx" src={agency.quote} loading="lazy" /></div></div>
          <p className="consumer-footnote">Information entered here goes directly to EZLynx. Quotes depend on insurer eligibility and underwriting. Completing the form does not bind coverage.</p>
        </div>
        <aside className="consumer-guide" aria-label="Quote preparation and support"><div className="consumer-guide-top"><span className="guide-icon"><FileText size={24} /></span><p className="eyebrow">A LITTLE PREPARATION</p><h3>Make yourself<br />quote-ready.</h3><p>A few details can help you move through the form.</p><ul><li><Check size={16} />Your contact information</li><li><Check size={16} />Vehicle or property details</li><li><Check size={16} />Current policy, if you have one</li></ul></div><div className="consumer-support"><span className="support-label">REAL PEOPLE. RIGHT HERE.</span><h3>We’re in your corner.</h3><p>Have a question along the way? Your Centex team is a phone call away.</p><a href={agency.telephone}><Phone size={17} />{agency.phone}<ArrowUpRight size={17} /></a><span>Round Rock roots. Texas-wide service.</span></div><div className="consumer-direct"><p>Prefer a separate window?</p><a href={agency.quote} target="_blank" rel="noopener noreferrer">Open the quoting tool <ArrowRight size={16} /></a><small>Also helpful if the embedded form does not load on your device.</small></div></aside>
      </div>
    </div>
    <div id="agent-panel" hidden={mode !== "agent"}><div className="agent-intro"><p className="eyebrow">LET’S TALK IT THROUGH</p><h2>A person in your corner.</h2><p>For business, life, renters, and other coverage—or help with auto and home—connect with our local team.</p></div><QuoteFlow formToken={formToken} /></div>
  </div>;
}
