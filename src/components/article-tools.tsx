"use client";
import { useEffect, useState } from "react";
import { Check, Copy, ArrowUp } from "lucide-react";

export function ArticleTools({ sections }: { sections: { heading: string }[] }) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const article = document.querySelector(".blog-prose");
    if (!article) return;
    const update = () => { const rect = article.getBoundingClientRect(); setProgress(Math.max(0, Math.min(100, (window.innerHeight - rect.top) / rect.height * 100))); };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  async function copy() {
    try { await navigator.clipboard.writeText(window.location.href.split("#")[0]); setMessage("Link copied"); }
    catch { setMessage("Copy the link from your browser address bar."); }
  }
  return <div className="article-tools"><div className="article-progress" role="progressbar" aria-label="Reading progress" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div><p className="eyebrow">IN THIS STORY</p><nav aria-label="Article sections">{sections.map((section, index) => <a href={`#story-section-${index}`} key={section.heading}><span>0{index + 1}</span>{section.heading}</a>)}</nav><div className="article-tool-buttons"><button onClick={copy}>{message === "Link copied" ? <Check size={16} /> : <Copy size={16} />}Copy link</button><a href="#article-top"><ArrowUp size={16} />Top</a></div><span className="article-copy-status" role="status">{message}</span></div>;
}
