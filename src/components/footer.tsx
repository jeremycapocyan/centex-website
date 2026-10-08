import Link from "next/link";
import { Brand } from "./header";
import { agency, services } from "@/lib/content";
import { Icon } from "./icon";

export function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-grid"><div className="footer-brand"><Brand light /><p>Local people. More choices.<br />Insurance that fits your life.</p><span className="footer-location"><Icon name="pin" size={16} /> Round Rock, Texas</span></div><div><h3>Explore coverage</h3>{services.slice(0, 4).map(s => <Link key={s.slug} href={`/insurance/${s.slug}/`}>{s.name}</Link>)}</div><div><h3>Here to help</h3><Link href="/client-center/">Client center</Link><a href={agency.carriers} target="_blank" rel="noopener noreferrer">Contact your carrier</a><Link href="/#faq">Common questions</Link><Link href="/quote/">Get a quote</Link></div><div><h3>Let’s connect</h3><a href={agency.telephone}>{agency.phone}</a><a href={`mailto:${agency.email}`}>{agency.email}</a><a href={agency.map} target="_blank" rel="noopener noreferrer">{agency.address}<br />{agency.city}</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Centex Insurance Solutions.</span><span>Independent agency. Texas-wide service.</span><Link href="/privacy/">Privacy & website information</Link></div><p className="coverage-disclaimer">Coverage availability, limits, and eligibility vary by insurer and policy. An insurance quote is not a binder of coverage.</p></div></footer>;
}
