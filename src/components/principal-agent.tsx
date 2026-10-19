import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";
import { agency } from "@/lib/content";
import "./principal-agent.css";

export function PrincipalAgent() {
  return <section className="section principal-section" id="meet-booker" aria-labelledby="principal-heading">
    <div className="container principal-layout">
      <figure className="principal-portrait">
        <Image src="/images/booker-gilbert.webp" alt="Booker Gilbert, Principal Agent of Centex Insurance Solutions" width={435} height={636} sizes="(max-width: 760px) 90vw, 40vw" />
        <figcaption><span>MEET YOUR PRINCIPAL AGENT</span><strong>Booker Gilbert</strong><span>Centex Insurance Solutions</span></figcaption>
      </figure>
      <div className="principal-copy">
        <p className="eyebrow">A REAL PERSON. A PERSONAL CONNECTION.</p>
        <h2 id="principal-heading">Your story comes first.<br /><em>Let’s protect what’s next.</em></h2>
        <p className="principal-introduction">Meet <strong>Booker Gilbert</strong>, Principal Agent of Centex Insurance Solutions.</p>
        <p>Your home. Your business. The people you love. Every insurance conversation starts with something that matters to you. Connect with Booker and the Centex Insurance Solutions team for a personal conversation about your priorities and the coverage options available to you.</p>
        <p className="principal-caption">Big decisions feel better with a familiar face in your corner.</p>
        <div className="principal-actions"><a className="button principal-call" href={agency.telephone}>Let’s start a conversation<Phone size={17} aria-hidden="true" /></a><Link className="principal-quote" href="/quote/">Explore quote options<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        <div className="principal-local"><MapPin size={17} aria-hidden="true" /><span>Rooted in Round Rock. Here for Texas.</span></div>
      </div>
    </div>
  </section>;
}
