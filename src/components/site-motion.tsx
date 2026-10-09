"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SiteMotion() {
  const path = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = Array.from(document.querySelectorAll(".section-heading, .about-statement, .benefit, .process-step, .client-option, .detail-main, .story-moment"));
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("reveal-visible"); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    nodes.forEach(node => { node.classList.add("reveal-ready"); observer.observe(node); });
    const revealAll = () => nodes.forEach(node => node.classList.add("reveal-visible"));
    preference.addEventListener("change", revealAll);
    return () => { observer.disconnect(); preference.removeEventListener("change", revealAll); nodes.forEach(node => node.classList.remove("reveal-ready", "reveal-visible")); };
  }, [path]);
  return null;
}
