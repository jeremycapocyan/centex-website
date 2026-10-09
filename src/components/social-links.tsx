import { Facebook, Linkedin } from "lucide-react";

const socials = [
  { name: "Facebook", href: "https://www.facebook.com/CentexInsurance", icon: <Facebook size={17} aria-hidden="true" /> },
  { name: "X / Twitter", href: "https://www.twitter.com/CentexInsurance", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.4l7.9-9L2 2h6.5l4.4 6.7L18.9 2Zm-1.1 18h1.7L7.6 3.9H5.8L17.8 20Z" /></svg> },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/centex-insurance-solutions", icon: <Linkedin size={17} aria-hidden="true" /> },
];

export function SocialLinks() {
  return <nav className="footer-socials" aria-label="Centex on social media">{socials.map(social => <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.name} — opens in a new tab`}>{social.icon}<span>{social.name}</span></a>)}</nav>;
}
