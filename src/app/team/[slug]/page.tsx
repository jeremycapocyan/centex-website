import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TeamPortrait } from "@/components/team-section";
import { team, getTeamMember } from "@/lib/team";
import { agency } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return team.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const member = getTeamMember((await params).slug);
  if (!member) notFound();
  const title = `${member.name} | ${member.position}`;
  const description = member.bio[0];
  return {
    title, description, alternates: { canonical: absoluteUrl(`/team/${member.slug}/`) },
    openGraph: { title, description, type: "profile", url: absoluteUrl(`/team/${member.slug}/`), images: [{ url: absoluteUrl(member.image || "/brand/centex-logo.png"), alt: member.image ? member.name : agency.name }] },
    twitter: { card: "summary", title, description, images: [absoluteUrl(member.image || "/brand/centex-logo.png")] },
  };
}

export default async function TeamBioPage({ params }: { params: Promise<{ slug: string }> }) {
  const member = getTeamMember((await params).slug);
  if (!member) notFound();
  const structured = { "@context": "https://schema.org", "@type": "ProfilePage", url: absoluteUrl(`/team/${member.slug}/`), mainEntity: { "@type": "Person", name: member.name, jobTitle: member.position, ...(member.image ? { image: absoluteUrl(member.image) } : {}), worksFor: { "@type": "Organization", name: agency.name, url: absoluteUrl("/") } } };
  return <article className="team-bio"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} /><div className="container">
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/team/">Our team</Link><span>/</span><span>{member.name}</span></nav>
    <div className="team-bio-layout"><TeamPortrait member={member} priority /><div className="team-bio-copy"><p className="eyebrow">CENTEX INSURANCE SOLUTIONS</p><h1>{member.name}</h1><p className="team-bio-role">{member.position}</p><p className="team-bio-intro">{member.introduction}</p><div className="team-bio-prose">{member.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><div className="team-bio-actions"><a className="button button-primary" href={agency.telephone}>Contact our team</a><Link className="text-link" href="/team/">Meet the whole team →</Link></div></div></div>
  </div></article>;
}
