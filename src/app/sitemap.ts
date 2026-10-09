import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { getPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [...["/", "/blog/", "/quote/", "/client-center/", "/privacy/", ...services.map(s => `/insurance/${s.slug}/`)].map(path => ({ url: absoluteUrl(path) })), ...getPosts().map(post => ({ url: absoluteUrl(`/blog/${post.slug}/`), lastModified: post.updated }))];
}
