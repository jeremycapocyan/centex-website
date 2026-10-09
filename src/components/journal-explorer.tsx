"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { BlogPost } from "@/lib/blog";
import { BlogCards } from "./blog-cards";

export function JournalExplorer({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState("All stories");
  const [query, setQuery] = useState("");
  const categories = ["All stories", ...new Set(posts.map(post => post.category))];
  const filtered = posts.filter(post => (category === "All stories" || post.category === category) && `${post.title} ${post.description} ${post.sections.map(s => s.text).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <><div className="journal-toolbar"><div className="journal-filters" role="group" aria-label="Filter journal by topic">{categories.map(item => <button key={item} aria-pressed={item === category} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="journal-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search journal</span><input type="search" placeholder="Find a story…" value={query} onChange={event => setQuery(event.target.value)} /></label></div><p className="journal-count" role="status">{filtered.length} {filtered.length === 1 ? "story" : "stories"}{category !== "All stories" ? ` in ${category}` : " to explore"}</p>{filtered.length ? <BlogCards posts={filtered} /> : <div className="journal-empty"><h3>No matching stories yet.</h3><p>Try a different search or explore all topics.</p><button className="button button-outline" onClick={() => {setQuery(""); setCategory("All stories");}}>Clear filters <X size={16} /></button></div>}</>;
}
