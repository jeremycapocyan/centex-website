import type { Metadata } from "next";
import { TeamSection } from "@/components/team-section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet our team",
  description: "Meet the Centex Insurance Solutions team: our agents and producers, policy support team, and client experience and retention specialist.",
  alternates: { canonical: absoluteUrl("/team/") },
};

export default function TeamPage() {
  return <TeamSection standalone />;
}
