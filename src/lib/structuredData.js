import { SITE_URL, SITE_NAME } from "./seo.js";
import { projects } from "../data/projects.js";

const LANG = "en-US";
const LAST_MODIFIED = "2026-07-13";
const DESCRIPTION =
  "UI/UX Designer & Systems Architect specializing in editorial aesthetics, precision systems, and high-impact digital experiences for forward-thinking brands.";
const OG_IMAGE = `${SITE_URL}/og-image.svg`;
const LOGO = `${SITE_URL}/favicon.svg`;
const PERSON_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBxBRQzHYlnxt10ZHIlpblZijaSZFkmur-2F0yXzkOCdGjQHK5dVfLpAuXt2xKIJYoHjp0PzT-SV4Tfy4wG-4FqCBAbseN20I4kStJ7Jahf8RmJqJLqJly1ySibnD8l3rjHyFDRYR264xUTHYffXdTSqYpIEN_oYczCqH2dfwBzhGGgBL8tB_8hkf1gZikM6oqxeOj3IG2562n8SrqGF91uM9zbbDjBF50wj6VSMWayJrDKRD_mVNi1iC0723wT3Wji7iIuUY0IC-s";
const CONTACT_URL = `${SITE_URL}/#contact`;
const WORK_URL = `${SITE_URL}/#work`;

const ID = {
  website: `${SITE_URL}/#website`,
  organization: `${SITE_URL}/#organization`,
  person: `${SITE_URL}/#person`,
  webpage: `${SITE_URL}/#webpage`,
  breadcrumb: `${SITE_URL}/#breadcrumb`,
  portfolio: `${SITE_URL}/#portfolio`,
  contactPoint: `${SITE_URL}/#contactpoint`,
};

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function website() {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: DESCRIPTION,
    inLanguage: LANG,
    publisher: { "@id": ID.organization },
    author: { "@id": ID.person },
  };
}

function organization() {
  return {
    "@type": "Organization",
    "@id": ID.organization,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: LOGO,
      width: 48,
      height: 46,
    },
    description: DESCRIPTION,
    founder: { "@id": ID.person },
    contactPoint: { "@id": ID.contactPoint },
  };
}

function person() {
  return {
    "@type": "Person",
    "@id": ID.person,
    name: "Neshan Niroula",
    givenName: "Neshan",
    familyName: "Niroula",
    jobTitle: "UI/UX Designer & Systems Architect",
    url: `${SITE_URL}/`,
    image: PERSON_IMAGE,
    description: DESCRIPTION,
    knowsAbout: [
      "UI/UX Design",
      "Frontend Engineering",
      "Design Systems",
      "Web Security",
      "Systems Architecture",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Master of Digital Design",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Remote / Worldwide",
    },
    worksFor: { "@id": ID.organization },
  };
}

function contactPoint() {
  return {
    "@type": "ContactPoint",
    "@id": ID.contactPoint,
    contactType: "sales",
    url: CONTACT_URL,
    areaServed: "Worldwide",
    availableLanguage: "English",
  };
}

function webPage() {
  return {
    "@type": "WebPage",
    "@id": ID.webpage,
    url: `${SITE_URL}/`,
    name: `${SITE_NAME} — Portfolio`,
    description: DESCRIPTION,
    inLanguage: LANG,
    isPartOf: { "@id": ID.website },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: OG_IMAGE,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": ID.breadcrumb },
    dateModified: LAST_MODIFIED,
    lastReviewed: LAST_MODIFIED,
  };
}

function breadcrumb() {
  return {
    "@type": "BreadcrumbList",
    "@id": ID.breadcrumb,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
    ],
  };
}

function projectSchema(project, index) {
  const id = `${SITE_URL}/#project-${slug(project.title)}`;
  return {
    "@type": ["SoftwareSourceCode", "CreativeWork"],
    "@id": id,
    position: index + 1,
    name: project.title,
    description: `${project.tag} interface design by ${SITE_NAME}.`,
    applicationCategory: project.tag,
    genre: project.tag,
    image: project.src,
    url: WORK_URL,
    creator: { "@id": ID.person },
    isPartOf: { "@id": ID.portfolio },
  };
}

function portfolioCollection() {
  const items = projects.map((project, index) => projectSchema(project, index));
  const collection = {
    "@type": "Collection",
    "@id": ID.portfolio,
    name: "Portfolio",
    description: `Selected UI/UX and systems design work by ${SITE_NAME}.`,
    url: WORK_URL,
    creator: { "@id": ID.person },
    hasPart: items.map((item) => ({
      "@id": item["@id"],
      "@type": item["@type"],
      position: item.position,
    })),
  };
  return [collection, ...items];
}

export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(),
      organization(),
      person(),
      contactPoint(),
      webPage(),
      breadcrumb(),
      ...portfolioCollection(),
    ],
  };
}

export default getStructuredData;
