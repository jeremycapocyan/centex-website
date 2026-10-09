import type { Metadata } from "next";
import Link from "next/link";
import { BlogCards } from "@/components/blog-cards";
import { getPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

const title = "Texas Insurance News & Insights";
const description = "Source-linked insurance news and practical coverage insights for Round Rock and Texas homeowners, drivers, and businesses.";
export const metadata: Metadata = { title, description, alternates: { canonical: absoluteUrl("/blog/") }, openGraph: { title, description, url: absoluteUrl("/blog/"), type: "website" } };

export default function Blog() {
  return <><section className="blog-hero"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span> / </span><span>Journal</span></nav><p className="eyebrow">THE CENTEX JOURNAL</p><h1>A little knowledge.<br /><em>A lot more confidence.</em></h1><p>Texas insurance news, explained. Stay informed about the changes that could matter to your home, your family, and your next decision.</p><span className="blog-edition">LOCAL PERSPECTIVE · SOURCE-LINKED REPORTING</span></div></section><section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">NEWS & INSIGHTS</p><h2>The latest from our journal.</h2></div><p>Clear context. Practical next steps.</p></div><BlogCards posts={getPosts()} /><p className="blog-editorial">Published by Centex Insurance Solutions. Articles summarize the linked sources and offer general education; coverage and eligibility depend on your policy and insurer.</p></div></section></>;
}
