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
    image: "/images/giro-sollano.webp",
    imageDimensions: { width: 896, height: 1120 },
    introduction: "Meet Giro – Thoughtful Support for Your Business Insurance.",
    bio: [
      "Giro brings a distinctive combination of technical expertise, operational experience, and client-focused service to Centex Insurance Solutions. With a degree in Civil Engineering and six years of experience in the Business Process Outsourcing (BPO) industry, he applies his analytical thinking, problem-solving abilities, and attention to detail to help business owners navigate the complexities of commercial insurance. Giro focuses on simplifying insurance processes, maintaining accurate and up-to-date coverage information, and proactively coordinating policy changes, endorsements, certificates, and renewals. His commitment to responsiveness, efficiency, and clear communication helps clients make informed insurance decisions while minimizing administrative burdens, allowing them to focus on running and growing their businesses.",
      "Outside the office, Giro has been an esports enthusiast since 2009 and an active badminton player since 2013. He also enjoys nature exploration, freediving, motorcycle riding, and playing fingerstyle guitar. These interests reflect his discipline, strategic mindset, adaptability, and commitment to continuous personal and professional growth.",
    ],
  },
  {
    slug: "aaron-paul-manabat",
    name: "Aaron Paul Manabat",
    position: "Personal Lines Assistant",
    category: "policy-support",
    initials: "AM",
    image: "/images/aaron-paul-manabat.webp",
    imageDimensions: { width: 896, height: 1344 },
    introduction: "Get to know our Personal Lines Assistant.",
    bio: [
      "Aaron brings a diverse background in customer service, administration, and account management to Centex Insurance Solutions. A graduate of AMA Computer College with a Bachelor of Science in Information Technology, he combines his educational background with years of professional experience across customer service and operational roles. Throughout his career, Aaron has developed strong communication skills, attention to detail, and a practical approach to problem-solving.",
      "As a Personal Lines Assistant, Aaron supports the team by preparing insurance quotations, maintaining accurate client information, responding to inquiries, and assisting with remarketing efforts to identify competitive insurance options. He believes that excellent service begins with understanding each client's needs, communicating clearly, and handling every detail with care. His commitment to responsiveness, accuracy, and dependable support helps simplify the insurance process, allowing clients to make informed decisions about protecting what matters most to them.",
      "Outside the office, Aaron has a passion for music and has participated in singing competitions, reflecting his love for singing and performing. He also enjoys traveling when the opportunity arises and most of all, spending quality time with his family. Whether performing, exploring new places, or simply enjoying time with loved ones, Aaron values experiences that create meaningful memories and bring balance to everyday life.",
    ],
  },
  {
    slug: "jeremy-angelo-alonzo",
    name: "Jeremy Angelo Alonzo",
    position: "Quality Assurance & Retention Specialist",
    category: "client-experience-retention",
    initials: "JA",
    image: "/images/jeremy-angelo-alonzo.webp",
    imageDimensions: { width: 887, height: 887 },
    introduction: "Connecting clients, strengthening relationships, and ensuring every detail behind the scenes contributes to a better insurance experience.",
    bio: [
      "Jeremy serves as the Quality Assurance and Retention Specialist at Centex Insurance Solutions. He holds a Bachelor's Degree in Business Administration, majoring in Marketing Management, and is a Certified Digital Marketing Professional.",
      "Jeremy focuses on building strong client relationships through proactive communication, ensuring clients stay informed about policy updates, renewals, and important insurance matters. Behind the scenes, he oversees administrative operations, maintains accurate records, and helps improve internal processes to ensure efficient and reliable service.",
      "Outside of work, Jeremy has a strong passion for sports and is also a Pickleball Coach. He enjoys sharing his knowledge, helping players develop their skills, and promoting teamwork and sportsmanship. His involvement in sports reflects his dedication to discipline, continuous learning, and personal growth—values he also brings to his professional career.",
    ],
  },
];

export const getTeamMember = (slug: string) => team.find(member => member.slug === slug);
