import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { QuoteFlow } from "@/components/quote-flow";

export const metadata: Metadata = { title: "Get a free insurance quote", description: "Choose your coverage and connect with Centex Insurance Solutions for an insurance quote in Texas." };

export default function QuotePage() {
  return <><section className="page-hero"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Get a quote</span></nav><p className="eyebrow">YOUR COVERAGE. YOUR CHOICE.</p><h1>A little more peace of mind<br />starts <em>right here.</em></h1><p className="lead">Let’s find the right place to start. Explore your coverage options with an independent agency in your corner.</p></div></section><section className="section"><div className="container"><Suspense fallback={<p>Loading your coverage options…</p>}><QuoteFlow /></Suspense></div></section></>;
}
