import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPost, formatDate } from "@/lib/blog";

export function BlogCards({ posts }: { posts: BlogPost[] }) {
  return <div className="blog-grid">{posts.map((post, index) => <article className="blog-card" key={post.slug}>
    <div className="blog-card-art" aria-hidden="true"><span>CENTEX JOURNAL</span><strong>{String(index + 1).padStart(2, "0")}</strong><ArrowUpRight size={40} /></div>
    <div className="blog-card-body"><p className="eyebrow">{post.category}</p><h3><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h3><p>{post.description}</p><div className="blog-card-foot"><time dateTime={post.published}>{formatDate(post.published)}</time><Link href={`/blog/${post.slug}/`} aria-label={`Read: ${post.title}`}>Read story <ArrowUpRight size={16} /></Link></div></div>
  </article>)}</div>;
}
