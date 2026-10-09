// Change this when the new website moves to its permanent custom domain.
export const siteUrl = (process.env.SITE_URL || "https://centex-website-omce.vercel.app").replace(/\/$/, "");
export const absoluteUrl = (path: string) => `${siteUrl}${path}`;
