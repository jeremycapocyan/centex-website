import type { Metadata } from "next";
import { agency } from "./content";
import { absoluteUrl } from "./site";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt: string };
};

export function pageMetadata({ title, description, path, image }: PageMetadata): Metadata {
  const socialImage = image ?? { src: "/austin-skyline.jpg", alt: "Austin skyline over Lady Bird Lake at sunset" };
  const fullTitle = `${title} | ${agency.name}`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website", locale: "en_US", siteName: agency.name,
      title: fullTitle, description, url: absoluteUrl(path),
      images: [{ url: absoluteUrl(socialImage.src), alt: socialImage.alt }],
    },
    twitter: {
      card: "summary_large_image", title: fullTitle, description,
      images: [{ url: absoluteUrl(socialImage.src), alt: socialImage.alt }],
    },
  };
}

export const agencyStructuredData = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": absoluteUrl("/#agency"),
  name: agency.name,
  url: absoluteUrl("/"),
  telephone: agency.telephone.replace("tel:", ""),
  email: agency.email,
  logo: absoluteUrl("/brand/centex-logo.png"),
  image: absoluteUrl("/brand/centex-logo.png"),
  address: {
    "@type": "PostalAddress",
    streetAddress: agency.address,
    addressLocality: "Round Rock",
    addressRegion: "TX",
    postalCode: "78664",
    addressCountry: "US",
  },
  areaServed: { "@type": "State", name: "Texas" },
  hasMap: agency.map,
  sameAs: [
    "https://www.facebook.com/CentexInsurance",
    "https://www.twitter.com/CentexInsurance",
    "https://www.linkedin.com/company/centex-insurance-solutions",
  ],
};

export function coverageStructuredData(service: { slug: string; name: string; description: string }) {
  const url = absoluteUrl(`/insurance/${service.slug}/`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", "@id": `${url}#service`, url,
        name: service.name, serviceType: service.name, description: service.description,
        provider: { "@type": "InsuranceAgency", "@id": absoluteUrl("/#agency"), name: agency.name, url: absoluteUrl("/") },
        areaServed: { "@type": "State", name: "Texas" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: service.name, item: url },
        ],
      },
    ],
  };
}

export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
