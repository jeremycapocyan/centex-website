export type BlogPost = {
  slug: string; title: string; description: string; category: string;
  published: string; updated: string; sourceDate: string; sourceTitle: string; sourceUrl: string;
  coverage: string; sections: { heading: string; text: string }[];
};

export const posts: BlogPost[] = [
  {
    slug: "texas-home-auto-insurance-rate-update-october-2026",
    title: "Texas home and auto rate filings show signs of relief",
    description: "An October 2026 Texas insurance update: what lower rate filings mean, and what to compare before your next home or auto renewal.",
    category: "Market update", published: "2026-10-09", updated: "2026-10-09", sourceDate: "2026-10-08",
    sourceTitle: "Home and auto insurance rates trending down for many Texans",
    sourceUrl: "https://agate.tdi.texas.gov/news/2026/tdi10082026.html", coverage: "auto",
    sections: [
      { heading: "What the latest report says", text: "On October 8, the Texas Department of Insurance reported that homeowners rate changes filed over the previous 90 days averaged a 4.3% decrease. Most homeowners insurers filing changes since July 1 proposed reductions, affecting about 700,000 policyholders. Auto rate decreases filed since July 1 affected 4.4 million policyholders." },
      { heading: "A market trend is not your renewal price", text: "These figures describe rate filings, not a guaranteed discount on every policy. Your renewal still deserves an individual review. A lower premium is most useful when the coverage continues to fit your home, vehicles, and budget." },
      { heading: "A practical next step for Central Texas households", text: "Before comparing quotes, put your current declarations page and renewal offer side by side. Ask an agent to explain differences in limits, deductibles, and coverage. Centex can help Round Rock and Texas customers organize that conversation without assuming the lowest price is the best fit." },
    ],
  },
  {
    slug: "texas-roof-age-home-insurance-guidance-2026",
    title: "An older roof does not tell the whole insurance story",
    description: "TDI clarifies the distinction between roof age and physical condition in Texas home insurance decisions. Here is what homeowners should know.",
    category: "Home insurance", published: "2026-10-09", updated: "2026-10-09", sourceDate: "2026-09-29",
    sourceTitle: "Texas homeowners protected from being denied insurance based on roof age",
    sourceUrl: "https://www.tdi.texas.gov/news/2026/tdi09292026.html", coverage: "home",
    sections: [
      { heading: "Age and condition are different", text: "In its September 29 update, the Texas Department of Insurance clarified that insurers cannot decline or nonrenew a home policy solely because the house or roof is older. Physical condition can still factor into underwriting decisions, including the condition of roofing, wiring, plumbing, and other components." },
      { heading: "What this does—and does not—mean", text: "The distinction matters for homeowners with older properties. It does not mean every home must qualify for every policy, or that roof damage is automatically covered. Read the insurer’s explanation and ask how the property’s condition affected the decision." },
      { heading: "Prepare for your next conversation", text: "Gather any inspection reports, repair receipts, and correspondence from your insurer. Ask which specific concerns need attention and how to document completed repairs. A Centex agent can help you discuss available home insurance options. For questions about the state’s guidance, contact TDI at 800-252-3439." },
    ],
  },
  {
    slug: "texas-insurance-pricing-customer-loyalty-guidance",
    title: "Texas reminds insurers: price risk, not customer loyalty",
    description: "A September TDI bulletin addresses pricing unrelated to insurance risk. Learn what to ask when reviewing your Texas home or auto renewal.",
    category: "Consumer news", published: "2026-10-09", updated: "2026-10-09", sourceDate: "2026-09-02",
    sourceTitle: "TDI issues guidance to safeguard consumers from discriminatory pricing",
    sourceUrl: "https://tdi.texas.gov/news/2026/tdi09022026.html", coverage: "home",
    sections: [
      { heading: "What TDI announced", text: "On September 2, the Texas Department of Insurance reminded insurers that home and auto rates must be based on insurance risk. The agency identified charging loyal customers more because they are less likely to shop around as an example of prohibited price optimization." },
      { heading: "A higher renewal needs context", text: "The guidance does not establish that every premium increase is improper. TDI explains that insurers use multiple risk factors, such as location and claims history. Ask your insurer or agent to explain the changes affecting your renewal before drawing conclusions." },
      { heading: "Make your comparison useful", text: "Keep a record of your current premium, renewal price, coverage limits, and deductibles. Request comparable options and ask about any differences before switching. Centex can help you review your choices. If you have a concern about an insurer’s pricing practices, TDI’s consumer help line is 800-252-3439." },
    ],
  },
];

export const getPosts = () => [...posts].sort((a, b) => b.published.localeCompare(a.published));
export const getPost = (slug: string) => posts.find(post => post.slug === slug);
export const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
