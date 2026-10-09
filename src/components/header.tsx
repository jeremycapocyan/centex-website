"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";
import { agency } from "@/lib/content";

export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`brand ${light ? "brand-light" : ""}`} aria-label="Centex Insurance Solutions home"><Image src="/brand/centex-logo.png" alt="Centex Insurance Solutions" width={166} height={106} preload={!light} /></Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const home = path === "/";
  const links = [{ label: "Coverage", href: "/#coverage" }, { label: "Why Centex", href: "/#about" }, { label: "Our partners", href: "/#partners" }, { label: "Client center", href: "/client-center/" }, { label: "Journal", href: "/blog/" }, { label: "Contact", href: "/#contact" }];
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="topbar"><div className="container topbar-inner"><span><Icon name="pin" size={14} /> Proudly rooted in Round Rock. Serving all of Texas.</span><a href={agency.telephone}><Icon name="phone" size={13} /> Let’s talk: <strong>{agency.phone}</strong></a></div></div>
    <header className="site-header"><div className="container header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.label} href={home && link.href.startsWith("/#") ? link.href.slice(1) : link.href}>{link.label}{link.label === "Our coverage" && <Icon name="chevron" size={14} />}</Link>)}</nav><div className="header-actions"><Link className="button button-primary header-quote" href="/quote/">Get a free quote</Link><button className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button></div></div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link href="/quote/" onClick={() => setOpen(false)}>Get a free quote</Link></nav>}</header>
  </>;
}
