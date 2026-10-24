import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { team, teamCategories, type TeamMember } from "@/lib/team";
import "./team.css";

export function TeamPortrait({ member, priority = false }: { member: TeamMember; priority?: boolean }) {
  return <div className={`team-portrait${member.image ? "" : " team-portrait-pending"}`}>
    {member.image
      ? <Image src={member.image} alt={`${member.name}, ${member.position} at Centex Insurance Solutions`} width={member.imageDimensions?.width ?? 435} height={member.imageDimensions?.height ?? 636} preload={priority} sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 400px" />
      : <div className="team-initials"><span aria-hidden="true">{member.initials}</span><p>Headshot coming soon</p></div>}
  </div>;
}

export function TeamSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const CategoryHeading = standalone ? "h2" : "h3";
  const MemberHeading = standalone ? "h3" : "h4";
  return <section className="section team-section" id="team" aria-labelledby="team-heading">
    <div className="container">
      {standalone && <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Our team</span></nav>}
      <div className="team-heading"><div><p className="eyebrow">LOCAL PEOPLE. PERSONAL CONNECTIONS.</p><Heading id="team-heading">Meet the Centex Insurance Solutions <em>team.</em></Heading></div><p>Real people to connect with. A familiar team for the questions, decisions, and next chapters ahead.</p></div>
      <nav className="team-category-nav" aria-label="Team categories">{teamCategories.map(category => <a key={category.id} href={`#${category.id}`}>{category.name}</a>)}</nav>
      {teamCategories.map(category => <section className="team-category" key={category.id} id={category.id} aria-labelledby={`${category.id}-heading`}>
        <div className="team-category-heading"><CategoryHeading id={`${category.id}-heading`}>{category.name}</CategoryHeading><p>{category.description}</p></div>
        <div className="team-grid">{team.filter(member => member.category === category.id).map(member => <article className="team-card" key={member.slug} id={member.slug === "booker-gilbert" ? "meet-booker" : undefined}>
        <TeamPortrait member={member} />
        <div className="team-card-copy"><p className="team-position">{member.position}</p><MemberHeading className="team-member-name">{member.name}</MemberHeading><p>{member.introduction}</p><Link className="team-bio-link" href={`/team/${member.slug}/`}>About {member.name}<ArrowUpRight size={20} aria-hidden="true" /></Link></div>
      </article>)}</div>
      </section>)}
    </div>
  </section>;
}
