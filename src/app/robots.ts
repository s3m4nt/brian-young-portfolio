import type { MetadataRoute } from "next";

/** Unlisted: do not crawl. Search is not a goal for this portfolio. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
