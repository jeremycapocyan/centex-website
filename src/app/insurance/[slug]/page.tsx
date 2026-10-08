import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, agency } from "@/lib/content";
import { Icon } from "@/components/icon";

export function generateStaticParams() {
  return services.map(service => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  return { title: service ? `${service.name} in Texas` : "Coverage not found", description: service?.description };
}

export default async function InsurancePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) notFound();
  return <>
    <section className="page-hero"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#coverage">Our coverage</Link><span>/</span><span>{service.name}</span></nav><span className="coverage-icon"><Icon name={service.icon} size={30} /></span><p className="eyebrow">{service.name.toUpperCase()} IN TEXAS</p><h1>{service.short}</h1><p className="lead">{service.intro}</p><Link className="button button-orange" href={`/quote/?coverage=${service.slug}`}>Explore my quote options</Link></div></section>
    <section className="section"><div className="container detail-grid"><div className="detail-main"><p className="eyebrow">LET’S MAKE SENSE OF YOUR OPTIONS</p><h2>A conversation about<br />the right coverage for you.</h2><p>Your needs come first. A Centex agent can walk you through the options available from our carrier partners, explain the differences, and help you consider what fits your life.</p><ul className="detail-list">{service.items.map(item => <li key={item}><Icon name="check" size={19} />{item}</li>)}</ul><p className="detail-note">These are topics to discuss with an agent, rather than a description of a specific policy. Coverage, exclusions, eligibility, and limits depend on the insurer and policy you select.</p></div><aside className="detail-aside"><Icon name="document" size={30} /><h3 style={{ marginTop: 20 }}>A little preparation helps.</h3><p>{service.prompt}</p><p>No current policy? We can still help you get started.</p><Link className="button button-navy" href={`/quote/?coverage=${service.slug}`}>Get a free quote</Link><a className="text-phone" href={agency.telephone}><Icon name="phone" size={18} />{agency.phone}</a></aside></div></section>
    <section className="section" style={{ paddingTop: 0 }}><div className="container"><h2 style={{ fontSize: 28 }}>More of life to protect?</h2><div className="other-services">{services.filter(s => s.slug !== slug).map(s => <Link key={s.slug} href={`/insurance/${s.slug}/`}>{s.name}</Link>)}</div></div></section>
  </>;
}
