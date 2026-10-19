export type BlogPost = {
  slug: string; title: string; description: string; category: string;
  published: string; updated: string; sourceDate: string; sourceTitle: string; sourceUrl: string;
  image: string; imageAlt: string;
  coverage: string; sections: { heading: string; text: string }[];
};

export const posts: BlogPost[] = [
  {
    slug: "texas-auto-insurance-transparency-tool-october-2026",
    title: "New Texas auto insurance data: a starting point after a policy notice",
    description: "TDI expanded its transparency tool on October 15. Learn how Round Rock drivers can use the update to prepare questions after an insurance notice.",
    category: "Consumer news", published: "2026-10-19", updated: "2026-10-19", sourceDate: "2026-10-15",
    sourceTitle: "TDI adds auto data to transparency tool showing why policies are declined, canceled, or not renewed",
    sourceUrl: "https://tdi.texas.gov/news/2026/tdi10152026.html",
    image: "/images/coverage-auto.webp",
    imageAlt: "AI-generated illustration of a navy sedan parked at a Texas Hill Country overlook",
    coverage: "auto",
    sections: [
      { heading: "What changed on October 15", text: "The Texas Department of Insurance announced that its transparency webpage now includes personal auto insurance. Texans can explore reported reasons for declined applications, cancellations, and nonrenewals in their area, alongside counts of those actions and insured vehicles. October 15 is the announcement date for this data expansion, not a new coverage effective date." },
      { heading: "Use the update as context", text: "Area-wide reporting can help frame questions, but it does not explain every individual decision. Keep your own insurer's written notice: that is the document to discuss when asking why your application or policy was affected. The tool does not promise acceptance, a lower premium, or reinstatement." },
      { heading: "Prepare for a Round Rock coverage conversation", text: "Gather the notice, your current declarations page, and your vehicle and driver details. Note any dates in the notice. Ask what the stated reason means for your situation and what options may be available. Centex Insurance Solutions can help you organize a conversation about auto coverage; eligibility and terms depend on the insurer." },
      { heading: "Read the official announcement", text: "The TDI source linked below explains the expansion and links to the reporting tool. For insurance questions, TDI lists its Help Line at 800-252-3439. Treat the dashboard as background information alongside your own policy documents." },
    ],
  },
  {
    "slug": "life-insurance-planning-round-rock-families",
    "title": "Life insurance planning: a starting point for Round Rock families",
    "description": "An evergreen guide to term and permanent life insurance, family priorities, and questions to bring to a Centex Insurance Solutions coverage conversation.",
    "category": "Evergreen guide",
    "published": "2026-10-13",
    "updated": "2026-10-13",
    "sourceDate": "2026-09",
    "sourceTitle": "Consider life insurance to protect your loved ones",
    "sourceUrl": "https://www.tdi.texas.gov/column/consider-life-insurance-to-protect-your-loved-ones.html",
    "image": "/images/family-life-planning.webp",
    "imageAlt": "AI-generated illustration of two parents and their child sitting together on a limestone porch",
    "coverage": "life",
    "sections": [
      {
        "heading": "Start with the people who depend on you",
        "text": "This evergreen guide draws on the Texas Department of Insurance's September 2026 consumer column. Life insurance can help support the people you name as beneficiaries after your death. TDI highlights needs such as housing, child care, education, debts, and everyday expenses."
      },
      {
        "heading": "Match the policy conversation to your timeline",
        "text": "Term life insurance covers a set period and is generally the simpler, less expensive option. Permanent coverage is designed to last throughout your life when its requirements are met, usually costs more, and can be more complex. TDI recommends discussing permanent coverage with a financial planner to assess its fit."
      },
      {
        "heading": "Bring a short family checklist",
        "text": "Before a Round Rock coverage conversation, write down who relies on your income or care, the expenses you want help addressing, and how long those responsibilities may last. Bring details of any existing life coverage and a budget you can sustain. Ask the agent to explain premium requirements, policy limits, and what happens when a term ends."
      },
      {
        "heading": "Make the next step personal",
        "text": "A growing family, a home purchase, or support for an aging parent can prompt a fresh conversation. Centex Insurance Solutions can help you explore life insurance options and the questions that matter to your household. The appropriate amount and type of coverage depend on your circumstances; this guide does not establish eligibility or guarantee a benefit."
      }
    ]
  },
  {
    slug: "texas-home-auto-insurance-rate-update-october-2026",
    image: "/images/texas-home-auto.webp", imageAlt: "Illustration of a limestone Texas home with a blue crossover in the driveway",
    title: "Texas home and auto rate filings show signs of relief",
    description: "An October 2026 Texas insurance update: what lower rate filings mean, and what to compare before your next home or auto renewal.",
    category: "Market update", published: "2026-10-09", updated: "2026-10-09", sourceDate: "2026-10-08",
    sourceTitle: "Home and auto insurance rates trending down for many Texans",
    sourceUrl: "https://agate.tdi.texas.gov/news/2026/tdi10082026.html", coverage: "auto",
    sections: [
      { heading: "What the latest report says", text: "On October 8, the Texas Department of Insurance reported that homeowners rate changes filed over the previous 90 days averaged a 4.3% decrease. Most homeowners insurers filing changes since July 1 proposed reductions, affecting about 700,000 policyholders. Auto rate decreases filed since July 1 affected 4.4 million policyholders." },
      { heading: "A market trend is not your renewal price", text: "These figures describe rate filings, not a guaranteed discount on every policy. Your renewal still deserves an individual review. A lower premium is most useful when the coverage continues to fit your home, vehicles, and budget." },
      { heading: "A practical next step for Central Texas households", text: "Before comparing quotes, put your current declarations page and renewal offer side by side. Ask an agent to explain differences in limits, deductibles, and coverage. Centex Insurance Solutions can help Round Rock and Texas customers organize that conversation without assuming the lowest price is the best fit." },
    ],
  },
  {
    slug: "texas-roof-age-home-insurance-guidance-2026",
    image: "/images/texas-roof.webp", imageAlt: "Illustration of charcoal roof shingles on a limestone home in the Texas Hill Country",
    title: "An older roof does not tell the whole insurance story",
    description: "TDI clarifies the distinction between roof age and physical condition in Texas home insurance decisions. Here is what homeowners should know.",
    category: "Home insurance", published: "2026-10-09", updated: "2026-10-09", sourceDate: "2026-09-29",
    sourceTitle: "Texas homeowners protected from being denied insurance based on roof age",
    sourceUrl: "https://www.tdi.texas.gov/news/2026/tdi09292026.html", coverage: "home",
    sections: [
      { heading: "Age and condition are different", text: "In its September 29 update, the Texas Department of Insurance clarified that insurers cannot decline or nonrenew a home policy solely because the house or roof is older. Physical condition can still factor into underwriting decisions, including the condition of roofing, wiring, plumbing, and other components." },
      { heading: "What this does—and does not—mean", text: "The distinction matters for homeowners with older properties. It does not mean every home must qualify for every policy, or that roof damage is automatically covered. Read the insurer’s explanation and ask how the property’s condition affected the decision." },
      { heading: "Prepare for your next conversation", text: "Gather any inspection reports, repair receipts, and correspondence from your insurer. Ask which specific concerns need attention and how to document completed repairs. A Centex Insurance Solutions agent can help you discuss available home insurance options. For questions about the state’s guidance, contact TDI at 800-252-3439." },
    ],
  },
  {
    slug: "texas-insurance-pricing-customer-loyalty-guidance",
    image: "/images/coverage-conversation.webp", imageAlt: "Illustration of customers discussing coverage with an adviser in a bright office",
    title: "Texas reminds insurers: price risk, not customer loyalty",
    description: "A September TDI bulletin addresses pricing unrelated to insurance risk. Learn what to ask when reviewing your Texas home or auto renewal.",
    category: "Consumer news", published: "2026-10-09", updated: "2026-10-09", sourceDate: "2026-09-02",
    sourceTitle: "TDI issues guidance to safeguard consumers from discriminatory pricing",
    sourceUrl: "https://tdi.texas.gov/news/2026/tdi09022026.html", coverage: "home",
    sections: [
      { heading: "What TDI announced", text: "On September 2, the Texas Department of Insurance reminded insurers that home and auto rates must be based on insurance risk. The agency identified charging loyal customers more because they are less likely to shop around as an example of prohibited price optimization." },
      { heading: "A higher renewal needs context", text: "The guidance does not establish that every premium increase is improper. TDI explains that insurers use multiple risk factors, such as location and claims history. Ask your insurer or agent to explain the changes affecting your renewal before drawing conclusions." },
      { heading: "Make your comparison useful", text: "Keep a record of your current premium, renewal price, coverage limits, and deductibles. Request comparable options and ask about any differences before switching. Centex Insurance Solutions can help you review your choices. If you have a concern about an insurer’s pricing practices, TDI’s consumer help line is 800-252-3439." },
    ],
  },
];

export const getPosts = () => [...posts].sort((a, b) => b.published.localeCompare(a.published));
export const getPost = (slug: string) => posts.find(post => post.slug === slug);
export const readingMinutes = (post: BlogPost) => Math.max(1, Math.ceil(post.sections.reduce((n, section) => n + section.text.split(/\s+/).length, 0) / 200));
// Preserve month-only source dates instead of inventing a publication day.
export const formatDate = (date: string) => {
  const monthOnly = /^\d{4}-\d{2}$/.test(date);
  return new Intl.DateTimeFormat("en-US", { month: "long", ...(monthOnly ? {} : { day: "numeric" as const }), year: "numeric", timeZone: "UTC" }).format(new Date(`${date}${monthOnly ? "-01" : ""}T12:00:00Z`));
};
