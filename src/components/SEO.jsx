import { Helmet } from "react-helmet-async";
import { getSeoData } from "../lib/seo";

export default function SEO({ routeKey = "home", jsonLd }) {
  const data = getSeoData(routeKey);

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="robots" content={data.robots} />
      <link rel="canonical" href={data.canonical} />

      <meta property="og:type" content={data.og.type} />
      <meta property="og:site_name" content={data.og.siteName} />
      <meta property="og:locale" content={data.og.locale} />
      <meta property="og:title" content={data.og.title} />
      <meta property="og:description" content={data.og.description} />
      <meta property="og:url" content={data.og.url} />
      <meta property="og:image" content={data.og.image} />
      <meta property="og:image:width" content={data.og.imageWidth} />
      <meta property="og:image:height" content={data.og.imageHeight} />
      <meta property="og:image:alt" content={data.og.imageAlt} />

      <meta name="twitter:card" content={data.twitter.card} />
      <meta name="twitter:site" content={data.twitter.site} />
      <meta name="twitter:title" content={data.twitter.title} />
      <meta name="twitter:description" content={data.twitter.description} />
      <meta name="twitter:image" content={data.twitter.image} />
      <meta name="twitter:image:alt" content={data.twitter.imageAlt} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
