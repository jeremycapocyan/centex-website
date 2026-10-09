import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { JournalExplorer } from "@/components/journal-explorer";
import { getPosts, readingMinutes } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

const title = "Texas Insurance News & Insights";
const description = "Source-linked insurance news and practical coverage insights for Round Rock and Texas homeowners, drivers, and businesses.";
export const metadata: Metadata = { title, description, alternates: { canonical: absoluteUrl("/blog/") }, openGraph: { title, description, url: absoluteUrl("/blog/"), type: "website", images: [{ url: absoluteUrl(getPosts()[0].image), width: 1440, height: 960 }] } };

export default function Blog() {
  const posts = getPosts();
  const featured = posts[0];
  return <><section className="journal-intro"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span> / </span><span>Journal</span></nav><div className="journal-title-row"><div><p className="eyebrow">THE CENTEX JOURNAL</p><h1>A little insight.<br /><em>A clearer tomorrow.</em></h1></div><p>Fresh perspectives on insurance.<br />Rooted in Texas. Written for real life.</p></div><Link className="journal-feature" href={`/blog/${featured.slug}/`}><Image src={featured.image} alt={featured.imageAlt} fill preload sizes="(max-width: 760px) 100vw, 90vw" /><div className="journal-feature-shade" /><div className="journal-feature-copy"><span className="feature-label">THE LATEST PERSPECTIVE</span><h2>{featured.title}</h2><p>{featured.description}</p><span className="feature-link">Read the story <ArrowUpRight size={20} /><span>{readingMinutes(featured)} min read</span></span></div></Link></div></section><section className="section journal-stories"><div className="container"><div className="section-heading"><div><p className="eyebrow">EXPLORE THE JOURNAL</p><h2>News for the life you’re living.</h2></div></div><JournalExplorer posts={posts} /><p className="blog-editorial">Published by Centex Insurance Solutions. Original summaries with linked sources. AI-generated editorial imagery is illustrative; it does not depict actual clients, staff, or news events. Coverage and eligibility depend on your policy and insurer.</p></div></section></>;
}
