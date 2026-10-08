import type { MetadataRoute } from "next";

/**
 * Unlisted: search engines stay out (see the noindex in layout.tsx),
 * but link-preview bots may fetch the page so shared links get a card.
 */
const previewBots = [
  "LinkedInBot",
  "Slackbot",
  "Slackbot-LinkExpanding",
  "Twitterbot",
  "facebookexternalhit",
  "Discordbot",
  "WhatsApp",
  "TelegramBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: previewBots, allow: "/" },
      { userAgent: "*", disallow: "/" },
    ],
  };
}
