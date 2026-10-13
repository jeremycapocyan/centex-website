"use client";

import Image from "next/image";
import { useState } from "react";
import { Search, ArrowUpRight, Plus, Phone, CreditCard, X } from "lucide-react";
import { carriers } from "@/lib/carriers";
import { PremiumFinanceCard } from "@/components/premium-finance-card";

export function CarrierDirectory() {
  const [query, setQuery] = useState("");
  const matches = carriers.filter(carrier => carrier.name.toLowerCase().includes(query.trim().toLowerCase()));

  return <div className="carrier-directory">
    <div className="carrier-toolbar">
      <label className="carrier-search"><Search size={19} aria-hidden="true" /><span className="sr-only">Search partner carriers</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find your insurance carrier" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear carrier search"><X size={18} aria-hidden="true" /></button>}</label>
      <p role="status">Showing <strong>{matches.length}</strong> of {carriers.length} partners</p>
    </div>
    <div className="carrier-grid">
      {matches.map(carrier => <details className="carrier-card" key={carrier.slug}>
        <summary><span className="carrier-logo"><Image src={`/carriers/${carrier.slug}.png`} alt={`${carrier.name} logo`} width={200} height={100} /></span><span className="carrier-name">{carrier.name}<Plus size={16} aria-hidden="true" /></span></summary>
        <div className="carrier-contact">
          <a className="carrier-payment" href={carrier.payment.url} target="_blank" rel="noopener noreferrer" aria-label={`${carrier.name}: ${carrier.payment.label} (opens in a new tab)`}><CreditCard size={17} aria-hidden="true" /><span>{carrier.payment.label}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
          <dl className="carrier-phones">{carrier.contacts.map(contact => <div key={contact.label}><dt>{contact.label}</dt><dd><a href={`tel:+1${contact.phone.replaceAll("-", "")}`} aria-label={`${carrier.name} ${contact.label}: ${contact.phone}`}><Phone size={14} aria-hidden="true" />{contact.phone}</a></dd></div>)}</dl>
          <p className="carrier-payment-note">{carrier.payment.note}</p>
          <a className="carrier-website" href={carrier.website} target="_blank" rel="noopener noreferrer">Visit carrier website<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
        </div>
      </details>)}
    </div>
    {matches.length === 0 && <div className="carrier-empty"><Search size={28} aria-hidden="true" /><h3>No carrier found for “{query}”</h3><p>Try another name or view all our partners. Looking for IPFS? Use the premium financing section below.</p><button className="button button-navy" onClick={() => setQuery("")}>View all {carriers.length} partners</button></div>}
    <p className="carrier-directory-note">Have your policy or billing account number ready. Payment links open the provider’s website in a new tab. If your bill comes from a finance company or your mortgage escrow, follow that bill’s instructions. Support and payment information reviewed October 14, 2026.</p>
    <PremiumFinanceCard />
  </div>;
}
