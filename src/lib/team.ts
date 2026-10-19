export const teamCategories = [
  { id: "agents-producers", name: "Agents & Producers", description: "Meet our principal agent and personal lines producer." },
  { id: "policy-support", name: "Policy Support Team", description: "Meet our commercial and personal lines assistants." },
  { id: "client-experience-retention", name: "Client Experience & Retention", description: "Meet our quality assurance and retention specialist." },
] as const;

export type TeamMember = {
  slug: string;
  name: string;
  position: string;
  category: typeof teamCategories[number]["id"];
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
    category: "agents-producers",
    initials: "BG",
    image: "/images/booker-gilbert.webp",
    introduction: "Your story comes first. Let's protect what's next.",
    bio: [
      "Booker Gilbert is the Principal Agent of Centex Insurance Solutions, an independent insurance agency in Round Rock serving customers across Texas.",
      "Your home, your business, and the people you love are a good place to begin an insurance conversation. Connect with Booker and the Centex Insurance Solutions team to discuss your priorities and explore the coverage options available to you.",
    ],
  },
  {
    slug: "reginald-ray",
    name: "Reginald Ray",
    position: "Personal Lines Producer",
    category: "agents-producers",
    initials: "RR",
    introduction: "Get to know our Personal Lines Producer.",
    bio: [
      "Reginald Ray is the Personal Lines Producer at Centex Insurance Solutions.",
      "Full biography coming soon.",
    ],
  },
  {
    slug: "giro-sollano",
    name: "Giro Sollano",
    position: "Commercial Lines Assistant",
    category: "policy-support",
    initials: "GS",
    introduction: "Get to know our Commercial Lines Assistant.",
    bio: [
      "Giro Sollano is the Commercial Lines Assistant at Centex Insurance Solutions.",
      "Full biography coming soon.",
    ],
  },
  {
    slug: "aaron-paul-manabat",
    name: "Aaron Paul Manabat",
    position: "Personal Lines Assistant",
    category: "policy-support",
    initials: "AM",
    introduction: "Get to know our Personal Lines Assistant.",
    bio: [
      "Aaron Paul Manabat is the Personal Lines Assistant at Centex Insurance Solutions.",
      "Full biography coming soon.",
    ],
  },
  {
    slug: "jeremy-angelo-alonzo",
    name: "Jeremy Angelo Alonzo",
    position: "Quality Assurance & Retention Specialist",
    category: "client-experience-retention",
    initials: "JA",
    introduction: "Meet the people behind your insurance experience.",
    bio: [
      "Jeremy Angelo Alonzo is the Quality Assurance & Retention Specialist at Centex Insurance Solutions.",
      "Full biography coming soon.",
    ],
  },
];

export const getTeamMember = (slug: string) => team.find(member => member.slug === slug);
