import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Centex Insurance Solutions | Local People. Texas-Wide Protection.", template: "%s | Centex Insurance Solutions" },
  description: "Independent insurance advice from Round Rock, Texas. Explore auto, home, business, renters, life, commercial truck, and umbrella insurance with Centex Insurance Solutions.",
  applicationName: "Centex Insurance Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Header /><main id="main">{children}</main><Footer /></body></html>;
}
