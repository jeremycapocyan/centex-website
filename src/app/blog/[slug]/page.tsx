import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleTools } from "@/components/article-tools";
import { notFound } from "next/navigation";
import { BlogCards } from "@/components/blog-cards";
import { getPost, getPosts, formatDate } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map(({ slug }) => ({ slug }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return { title: post.title, description: post.description, alternates: { canonical: absoluteUrl(`/blog/${post.slug}/`) }, openGraph: { type: "article", title: post.title, description: post.description, url: absoluteUrl(`/blog/${post.slug}/`), publishedTime: post.published, modifiedTime: post.updated, images: [{ url: absoluteUrl(post.image), width: 1440, height: 960, alt: post.imageAlt }], authors: ["Centex Insurance Solutions"] }, twitter: { card: "summary_large_image", title: post.title, description: post.description } };
}
export default async function Article({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const url = absoluteUrl(`/blog/${post.slug}/`);
  const structured = { "@context": "https://schema.org", "@graph": [{ "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.published, dateModified: post.updated, mainEntityOfPage: url, image: absoluteUrl(post.image), author: { "@type": "Organization", name: "Centex Insurance Solutions", url: absoluteUrl("/") }, publisher: { "@type": "Organization", name: "Centex Insurance Solutions", logo: { "@type": "ImageObject", url: absoluteUrl("/brand/centex-logo.png") } } }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Journal", item: absoluteUrl("/blog/") }, { "@type": "ListItem", position: 3, name: post.title, item: url }] }] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} /><article><header id="article-top" className="blog-hero blog-article-hero"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span> / </span><Link href="/blog/">Journal</Link></nav><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p>{post.description}</p><div className="blog-byline">By Centex Insurance Solutions · Published <time dateTime={post.published}>{formatDate(post.published)}</time>{post.updated !== post.published && <> · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></>}</div></div></header><figure className="container article-cover"><Image src={post.image} alt={post.imageAlt} width={1440} height={960} preload sizes="(max-width: 760px) 100vw, 90vw" /><figcaption>AI-generated editorial illustration. Not an actual client, property, or news event.</figcaption></figure><div className="container blog-article-layout"><div className="blog-prose">{post.sections.map((section, index) => <section id={`story-section-${index}`} key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}<div className="blog-source"><strong>Source & reporting date</strong><p>Texas Department of Insurance · {formatDate(post.sourceDate)}</p><a href={post.sourceUrl}>{post.sourceTitle} ↗</a><p>Our summary was checked against this source on {formatDate(post.updated)}. Subsequent developments may change the information.</p></div><p className="blog-editorial">General information, not a coverage determination or legal advice. Policy terms, exclusions, eligibility, and insurer decisions apply.</p></div><div className="article-sidebar"><ArticleTools sections={post.sections.map(({ heading }) => ({ heading }))} /><aside className="blog-aside"><p className="eyebrow">LET’S TALK IT THROUGH</p><h2>What does this mean for you?</h2><p>A local agent can help connect the news to your coverage questions.</p><Link className="button button-primary" href={`/quote/?coverage=${post.coverage}`}>Request a quote</Link><Link className="text-link" href={`/insurance/${post.coverage}/`}>Explore coverage →</Link><a href="tel:+15127706400">(512) 770-6400</a></aside></div></div></article><section className="section"><div className="container"><h2>Keep reading.</h2><BlogCards posts={getPosts().filter(item => item.slug !== post.slug).slice(0, 3)} /><Link className="text-link" href="/blog/">All news & insights →</Link></div></section></>;
}
