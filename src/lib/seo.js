const SITE_URL = "https://neshanniroula.com.np";
const SITE_NAME = "Neshan Niroula";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";
const LOCALE = "en_US";
const TWITTER_HANDLE = "@neshanniroula";

const ROUTES = {
  home: {
    path: "/",
    title: "Neshan Niroula | UI/UX Designer & Systems Architect",
    description:
      "Neshan Niroula — UI/UX Designer & Systems Architect. Editorial aesthetics, precision systems, and high-impact digital experiences spanning design, frontend, and security.",
    canonical: `${SITE_URL}/`,
    robots: "index, follow",
  },
  admin: {
    path: "/admin",
    title: "Admin Dashboard | Neshan Niroula",
    description: "Admin dashboard for managing portfolio content.",
    canonical: `${SITE_URL}/admin`,
    robots: "noindex, nofollow",
  },
  adminUsers: {
    path: "/admin/users",
    title: "Manage Users | Neshan Niroula",
    description: "User management dashboard.",
    canonical: `${SITE_URL}/admin/users`,
    robots: "noindex, nofollow",
  },
  adminMessages: {
    path: "/admin/messages",
    title: "Messages | Neshan Niroula",
    description: "Admin message inbox.",
    canonical: `${SITE_URL}/admin/messages`,
    robots: "noindex, nofollow",
  },
  adminSettings: {
    path: "/admin/settings",
    title: "Settings | Neshan Niroula",
    description: "Admin settings.",
    canonical: `${SITE_URL}/admin/settings`,
    robots: "noindex, nofollow",
  },
  notFound: {
    path: "/",
    title: "Page Not Found | Neshan Niroula",
    description: "The page you are looking for does not exist.",
    canonical: `${SITE_URL}/`,
    robots: "noindex, nofollow",
  },
};

export function getSeoData(routeKey = "home") {
  const route = ROUTES[routeKey] || ROUTES.notFound;

  return {
    title: route.title,
    description: route.description,
    canonical: route.canonical,
    robots: route.robots,
    og: {
      title: route.title,
      description: route.description,
      url: route.canonical,
      image: OG_IMAGE,
      imageWidth: OG_IMAGE_WIDTH,
      imageHeight: OG_IMAGE_HEIGHT,
      imageAlt: SITE_NAME,
      type: "website",
      siteName: SITE_NAME,
      locale: LOCALE,
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: route.title,
      description: route.description,
      image: OG_IMAGE,
      imageAlt: SITE_NAME,
    },
  };
}

export { ROUTES, SITE_URL, SITE_NAME, OG_IMAGE, LOCALE };
