import { ArrowUpRight, CreditCard, Phone } from "lucide-react";
import { premiumFinance } from "@/lib/carriers";

export function PremiumFinanceCard() {
  return <aside className="premium-finance" id="ipfs" aria-labelledby="ipfs-heading">
    <div className="premium-finance-intro">
      <span className="premium-finance-icon"><CreditCard size={27} aria-hidden="true" /></span>
      <p className="eyebrow">PREMIUM FINANCING</p>
      <h3 id="ipfs-heading">Your IPFS payments.<br />One easy place.</h3>
      <p>For Centex Insurance Solutions customers with an Imperial PFS premium financing agreement. Sign in or choose Make a Payment in your dedicated portal.</p>
      <a className="button button-primary" href={premiumFinance.portal} target="_blank" rel="noopener noreferrer">Open Centex Insurance Solutions IPFS portal<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
    </div>
    <div className="premium-finance-support">
      <h4>Customer care &amp; payments</h4>
      <p>Match the first three letters of your IPFS account number to your branch.</p>
      <dl>{premiumFinance.contacts.map(contact => <div key={contact.label}><dt>{contact.label}</dt><dd><a href={`tel:+1${contact.phone.replaceAll("-", "")}`} aria-label={`IPFS ${contact.label} customer care and payments: ${contact.phone}`}><Phone size={15} aria-hidden="true" />{contact.phone}</a></dd></div>)}</dl>
      <a className="text-link" href={premiumFinance.locations} target="_blank" rel="noopener noreferrer">Find another IPFS branch<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
      <p className="premium-finance-note">IPFS handles premium financing. Contact your insurance carrier or Centex Insurance Solutions for policy and claims questions.</p>
    </div>
  </aside>;
}
