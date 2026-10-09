import { ArrowUpRight, ShieldCheck, Phone } from "lucide-react";
import { agency } from "@/lib/content";

export function ConsumerQuoting() {
  return <section className="consumer-quoting" aria-labelledby="instant-quote-title" id="instant-quote">
    <div className="consumer-heading"><div><p className="eyebrow">AUTO & HOME · POWERED BY EZLYNX</p><h2 id="instant-quote-title">Your next quote.<br /><em>Right here.</em></h2><p>Get started with instant auto and home quotes using Centex’s EZLynx Consumer Quoting tool.</p></div><a className="consumer-help" href={agency.telephone}><Phone size={20} aria-hidden="true" /><span>Want a hand?<strong>{agency.phone}</strong></span></a></div>
    <div className="consumer-frame-shell"><div className="consumer-frame-bar"><span><ShieldCheck size={18} aria-hidden="true" />EZLynx Consumer Quoting</span><a href={agency.quote} target="_blank" rel="noopener noreferrer">Open in a new tab<ArrowUpRight size={16} aria-hidden="true" /></a></div><div className="consumer-frame-wrap"><iframe width="800" height="1800" id="cpIframe" name="Secure Live Insurance Quoting" title="Centex instant auto and home insurance quotes — EZLynx" src={agency.quote} /></div></div>
    <div className="consumer-footnote"><p>Your information is entered directly into the EZLynx quoting tool. Quotes are subject to insurer eligibility and underwriting; completing the form does not bind coverage.</p><p>If the form does not load or is difficult to use on your device, <a href={agency.quote} target="_blank" rel="noopener noreferrer">open the quoting tool in a new tab</a>.</p></div>
  </section>;
}
