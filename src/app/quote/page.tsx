import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { getMailConfig } from "@/lib/microsoft-mail";
import { createFormToken } from "@/lib/quote-security";
import "./quote-form.css";
import "./consumer-quoting.css";
import { QuoteFlow } from "@/components/quote-flow";
import { ConsumerQuoting } from "@/components/consumer-quoting";

export const metadata: Metadata = { title: "Get a free insurance quote", description: "Get instant auto and home quotes through the Centex EZLynx quoting tool, or contact our Texas team for other insurance options." };

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ coverage?: string }> }) {
  await connection();
  const { coverage } = await searchParams;
  const agentFirst = Boolean(coverage && !["auto", "home"].includes(coverage));
  const config = getMailConfig();
  const formToken = config ? createFormToken(config.clientSecret) : null;
  return <><section className="page-hero"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Get a quote</span></nav><p className="eyebrow">YOUR COVERAGE. YOUR CHOICE.</p><h1>A little more peace of mind<br />starts <em>right here.</em></h1><p className="lead">Compare auto and home quotes online, or talk with our local team about coverage for the rest of your life.</p></div></section><section className="section quote-service-section"><div className="container"><div className="quote-route-links"><a className="button button-primary" href="#instant-quote">Instant auto &amp; home quotes</a><a className="text-link" href="#agent-request">Other coverage &amp; agent help ↓</a></div><details className="agent-request-disclosure" id="agent-request" open={agentFirst}><summary>Business, life, renters, or another coverage? Connect with an agent.</summary><div className="agent-request-content"><Suspense fallback={<p>Loading your coverage options…</p>}><QuoteFlow formToken={formToken} /></Suspense></div></details><ConsumerQuoting /></div></section></>;
}
