import type { Metadata } from "next";
import { TeamSection } from "@/components/team-section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet our team",
  description: "Meet the Centex Insurance Solutions team in Round Rock, Texas. Get to know Booker Gilbert and Jeremy Angelo Alonzo.",
  alternates: { canonical: absoluteUrl("/team/") },
};

export default function TeamPage() {
  return <TeamSection standalone />;
}
