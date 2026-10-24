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
  imageDimensions?: { width: number; height: number };
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
    image: "/images/reginald-ray.webp",
    imageDimensions: { width: 896, height: 1120 },
    introduction: "Meet Reggie – Your Trusted Insurance Agent",
    bio: [
      "With over 20 years of experience in the insurance industry, Reggie specializes in both personal and commercial insurance, helping individuals, families, and businesses find coverage that fits their needs. In addition to his insurance expertise, Reggie brings 18 years of experience in the automobile sales industry, where he worked as both a salesman and a finance manager. This unique background gives him valuable insight into customer service, financial decisions, and protecting the things that matter most.",
      "For Reggie, clients aren’t just clients—they’re friends. He believes in building lasting relationships by providing personalized service, honest guidance, and the kind of attention you would expect from a trusted friend. Whether you have a question about your policy, need help with a claim, or are looking for better coverage, Reggie strives to be accessible and responsive to his clients seven days a week.",
      "When he’s not answering calls, responding to texts, or checking emails, Reggie enjoys fishing, listening to live music, and traveling to new destinations.",
      "His philosophy is simple: Insurance is about more than policies and premiums. It’s about people, relationships, and having someone you can count on when it matters most.",
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
