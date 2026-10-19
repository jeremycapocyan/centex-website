export type TeamMember = {
  slug: string;
  name: string;
  position: string;
  initials: string;
  image?: string;
  introduction: string;
  bio: string[];
};

export const team: TeamMember[] = [
  {
    slug: "booker-gilbert",
    name: "Booker Gilbert",
    position: "Principal Agent",
    initials: "BG",
    image: "/images/booker-gilbert.webp",
    introduction: "Your story comes first. Let's protect what's next.",
    bio: [
      "Booker Gilbert is the Principal Agent of Centex Insurance Solutions, an independent insurance agency in Round Rock serving customers across Texas.",
      "Your home, your business, and the people you love are a good place to begin an insurance conversation. Connect with Booker and the Centex Insurance Solutions team to discuss your priorities and explore the coverage options available to you.",
    ],
  },
  {
    slug: "jeremy-angelo-alonzo",
    name: "Jeremy Angelo Alonzo",
    position: "Quality Assurance & Retention Specialist",
    initials: "JA",
    introduction: "Meet the people behind your insurance experience.",
    bio: [
      "Jeremy Angelo Alonzo is the Quality Assurance & Retention Specialist at Centex Insurance Solutions.",
      "Full biography coming soon.",
    ],
  },
];

export const getTeamMember = (slug: string) => team.find(member => member.slug === slug);
