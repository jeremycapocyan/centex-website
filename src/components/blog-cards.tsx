import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BlogPost, formatDate, readingMinutes } from "@/lib/blog";

export function BlogCards({ posts }: { posts: BlogPost[] }) {
  return <div className="blog-grid">{posts.map(post => <article className="blog-card" key={post.slug}>
    <Link href={`/blog/${post.slug}/`} className="blog-card-image" tabIndex={-1} aria-hidden="true"><Image src={post.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" /><span className="image-arrow"><ArrowUpRight size={24} /></span><span className="image-category">{post.category}</span></Link>
    <div className="blog-card-body"><p className="blog-meta"><time dateTime={post.published}>{formatDate(post.published)}</time><span>{readingMinutes(post)} min read</span></p><h3><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h3><p>{post.description}</p><div className="blog-card-foot"><span>CENTEX JOURNAL</span><Link href={`/blog/${post.slug}/`} aria-label={`Read: ${post.title}`}>Read story <ArrowUpRight size={16} /></Link></div></div>
  </article>)}</div>;
}
