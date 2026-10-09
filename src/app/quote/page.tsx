import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import { Check } from "lucide-react";
import { getMailConfig } from "@/lib/microsoft-mail";
import { createFormToken } from "@/lib/quote-security";
import { QuoteExperience } from "@/components/quote-experience";
import "./quote-form.css";
import "./consumer-quoting.css";

export const metadata: Metadata = { title: "Get a free insurance quote", description: "Get instant auto and home quotes through the Centex EZLynx quoting tool, or contact our Texas team for other insurance options." };

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ coverage?: string }> }) {
  await connection();
  const { coverage } = await searchParams;
  const agentFirst = Boolean(coverage && !["auto", "home"].includes(coverage));
  const config = getMailConfig();
  const formToken = config ? createFormToken(config.clientSecret) : null;
  return <><section className="quote-welcome"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Get a quote</span></nav><div className="quote-welcome-grid"><div><p className="eyebrow">YOUR NEXT CHAPTER. COVERED.</p><h1>Good coverage starts<br />with <em>a conversation.</em></h1><p>Start your auto or home quote online.<br />Keep a local team in your corner.</p><div className="quote-welcome-points"><span><Check size={15} />Independent advice</span><span><Check size={15} />Texas-wide service</span></div></div><div className="quote-welcome-photo"><Image src="/images/texas-home-auto.webp" alt="Illustrative Texas home and vehicle" fill preload sizes="(max-width: 760px) 100vw, 40vw" /><div className="quote-photo-caption"><span>FOR THE LIFE YOU’RE BUILDING</span><strong>Home. Auto. What’s next.</strong></div></div></div></div></section><section className="section quote-service-section"><div className="container"><Suspense fallback={<p>Loading your quote options…</p>}><QuoteExperience formToken={formToken} agentFirst={agentFirst} /></Suspense></div></section></>;
}
