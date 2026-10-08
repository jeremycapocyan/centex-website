import Link from "next/link";

export default function NotFound() {
  return <div className="not-found"><p className="eyebrow">LET’S GET YOU BACK ON TRACK</p><h1>This page took a detour.</h1><p>The page you’re looking for isn’t here. Your next step still is.</p><Link className="button button-orange" href="/">Back to Centex</Link></div>;
}
