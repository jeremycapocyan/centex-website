import type { Metadata } from "next";
import { TeamSection } from "@/components/team-section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Meet our team",
  description: "Meet the Centex Insurance Solutions team: our agents and producers, policy support team, and client experience and retention specialist.",
  path: "/team/",
});

export default function TeamPage() {
  return <TeamSection standalone />;
}
