import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import { Icon } from "@/components/icon";
import { CoverageExplorer } from "@/components/coverage-explorer";
import { CarrierDirectory } from "@/components/carrier-directory";
import { agency, faqs } from "@/lib/content";
import { carriers } from "@/lib/carriers";

import { BlogCards } from "@/components/blog-cards";
import { getPosts } from "@/lib/blog";

const featuredCarriers = ["progressive", "travelers", "safeco", "liberty-mutual", "foremost", "geico"];

export default function Home() {
  return <>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="status-dot" /> INDEPENDENT. LOCAL. ON YOUR SIDE.</p>
          <h1>Big life.<br />Texas roots.<br /><em>You, covered.</em></h1>
          <p className="hero-description">For your first home, your next adventure, and everything you’re building. More insurance choices. A local team to make them simple.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/quote/">Find my coverage<ArrowUpRight size={19} aria-hidden="true" /></Link><a className="hero-call" href={agency.telephone}><span className="call-icon"><Icon name="phone" size={19} /></span><span>Let’s talk<strong>{agency.phone}</strong></span></a></div>
          <div className="hero-reassurance"><span><Icon name="check" size={16} /> Real people</span><span><Icon name="check" size={16} /> More choices</span><span><Icon name="check" size={16} /> All of Texas</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-frame"><Image src="/austin-skyline.jpg" alt="Austin skyline over Lady Bird Lake at sunset" fill preload sizes="(max-width: 760px) 100vw, 50vw" className="hero-photo" /><div className="hero-photo-overlay" /><span className="photo-location"><Icon name="pin" size={15} /> AT HOME IN CENTRAL TEXAS</span><div className="photo-caption"><span>Room to dream.</span><strong>Peace of mind<br />to go with it.</strong></div></div>
          <div className="hero-orbit" aria-hidden="true"><Compass size={30} /><span>ROOTED IN TEXAS</span></div>
          <div className="hero-assurance"><span className="assurance-icon"><Icon name="shield" size={29} /></span><div><strong>Your life. Your possibilities.</strong><span>We’ll help protect what comes next.</span></div><span className="assurance-check"><Icon name="check" size={18} /></span></div>
          <a className="hero-partner-tag" href="#partners"><strong>17</strong><span>carrier partners.<br />One team in your corner.</span><ArrowUpRight size={19} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="container hero-bottom"><span>ROUND ROCK, TX <span className="dot-separator">•</span> PROUDLY SERVING TEXAS</span><a href="#coverage">A little more confidence starts here<ArrowRight size={16} aria-hidden="true" /></a></div>
    </section>

    <section className="partner-strip" aria-label="A selection of our carrier partners"><div className="container"><div className="strip-heading"><p>One independent agency.<strong> More possibilities.</strong></p><a href="#partners">Meet all 17 partners<ArrowUpRight size={16} aria-hidden="true" /></a></div><div className="featured-logos">{featuredCarriers.map(slug => { const carrier = carriers.find(item => item.slug === slug)!; return <Image key={slug} src={`/carriers/${slug}.png`} alt={carrier.name} width={180} height={90} />; })}</div></div></section>

    <section className="section coverage-section" id="coverage"><div className="container"><div className="section-heading"><div><p className="eyebrow">COVERAGE THAT KEEPS UP</p><h2>Life doesn’t stand still.<br /><span className="muted-heading">Neither should your coverage.</span></h2></div><p>Choose what matters to you.<br /> We’ll help you take care of it.</p></div><CoverageExplorer /></div></section>

    <section className="section about-section" id="about"><div className="container about-grid"><div className="about-statement"><p className="eyebrow">A LOCAL TEAM. A LASTING CONNECTION.</p><h2>Insurance is personal.<br /><em>Let’s keep it that way.</em></h2><p>We’re Centex Insurance Solutions, your independent insurance agency in Round Rock. We believe good coverage starts with getting to know you.</p><a className="text-link" href={agency.telephone}>Meet your next insurance team<ArrowUpRight size={20} aria-hidden="true" /></a><div className="about-location"><Icon name="pin" size={20} /><span>Local roots in Round Rock.<br /><strong>Here for every corner of Texas.</strong></span></div></div><div className="benefits">{[{ number: "01", icon: "compare", title: "Choices, without the confusion.", body: "Access multiple insurance companies with one team to help you compare options and understand the details." }, { number: "02", icon: "heart", title: "An actual person in your corner.", body: "Talk to people who take the time to listen. Get advice shaped around your life, your business, and your priorities." }, { number: "03", icon: "support", title: "Here for what comes next.", body: "A new set of keys. A growing family. A bigger business. We’ll help you revisit your coverage as life changes." }].map(benefit => <article className="benefit" key={benefit.number}><span className="benefit-icon"><Icon name={benefit.icon} size={25} /></span><div><span className="benefit-number">/ {benefit.number}</span><h3>{benefit.title}</h3><p>{benefit.body}</p></div></article>)}</div></div></section>

    <section className="section partners-section" id="partners"><div className="container"><div className="section-heading"><div><p className="eyebrow">OUR CARRIER PARTNERS</p><h2>More choice.<br /><span className="muted-heading">All in your corner.</span></h2></div><p>Explore all 17 partners in our network.<br /> Select a carrier for contact information.</p></div><CarrierDirectory /><div className="partner-help"><Icon name="support" size={21} /><p>Not sure where to start? <a href={agency.telephone}>We’ll help you find your next step.<ArrowUpRight size={15} aria-hidden="true" /></a></p></div></div></section>

    <section className="section process-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">A SIMPLER WAY FORWARD</p><h2>From “what if”<br />to “what’s next.”</h2></div><Link className="button button-navy" href="/quote/">Let’s get started<ArrowUpRight size={18} aria-hidden="true" /></Link></div><div className="process-grid">{[{ n: "01", title: "Start with your story.", text: "Tell us about your home, your family, or your business. We’ll start with what matters to you." }, { n: "02", title: "Make sense of your options.", text: "Explore coverage from our carrier partners, with clear explanations and a helpful local agent." }, { n: "03", title: "Move forward confidently.", text: "Choose your coverage and keep a real team in your corner as your needs change." }].map(step => <article className="process-step" key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>

    <section className="client-banner"><div className="container client-banner-inner"><div><p className="eyebrow">ALREADY WITH CENTEX?</p><h2>A little help.<br />Right when you need it.</h2><p>Your policy documents, ID cards, and carrier support are a click away.</p></div><div className="client-banner-links"><Link href="/client-center/"><Icon name="document" size={24} /><span>Visit the client center</span><ArrowUpRight size={21} aria-hidden="true" /></Link><a href="#partners"><Icon name="shield" size={24} /><span>Find your carrier</span><ArrowUpRight size={21} aria-hidden="true" /></a></div></div></section>

    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">THE CENTEX JOURNAL</p><h2>In the know. A step ahead.</h2></div><Link className="text-link" href="/blog/">All news &amp; insights →</Link></div><BlogCards posts={getPosts().slice(0, 3)} /></div></section><section className="section faq-section" id="faq"><div className="container faq-grid"><div><p className="eyebrow">LET’S CLEAR THINGS UP</p><h2>Good questions.<br /><span className="muted-heading">Straight answers.</span></h2><p>Need to talk it through?<br />That’s what we’re here for.</p><a className="faq-phone" href={agency.telephone}><Icon name="phone" size={19} />{agency.phone}<ArrowUpRight size={18} aria-hidden="true" /></a></div><div className="faq-list">{faqs.map(faq => <details key={faq.question}><summary>{faq.question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

    <section className="section contact-section" id="contact"><div className="container contact-grid"><div><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Let’s protect<br /><em>your kind of life.</em></h2><p>A simple conversation. A little clarity.<br />A local team that’s ready when you are.</p><div className="contact-buttons"><Link className="button button-primary" href="/quote/">Get a free quote<ArrowUpRight size={18} aria-hidden="true" /></Link><a className="button button-outline" href={agency.contact} target="_blank" rel="noopener noreferrer">Send a message<ArrowUpRight size={18} aria-hidden="true" /></a></div></div><div className="contact-card"><div><span className="contact-icon"><Icon name="phone" size={22} /></span><div><span className="small-label">GIVE US A CALL</span><a className="contact-main" href={agency.telephone}>{agency.phone}</a><p>Option 1: New quotes · Option 2: General inquiries</p></div></div><div><span className="contact-icon"><Icon name="mail" size={22} /></span><div><span className="small-label">DROP US A LINE</span><a className="contact-main" href={`mailto:${agency.email}`}>{agency.email}</a></div></div><div><span className="contact-icon"><Icon name="pin" size={22} /></span><div><span className="small-label">COME SAY HELLO</span><a href={agency.map} target="_blank" rel="noopener noreferrer">{agency.address}<br />{agency.city}<ArrowUpRight size={16} aria-hidden="true" /></a></div></div></div></div></section>
  </>;
}
