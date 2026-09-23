function prodBuildStamp() {
  if (process.env.NODE_ENV !== "production") return "dev";
  return new Date().toLocaleString("en-CA", {
    timeZone: "America/Los_Angeles",
    hour12: false,
    timeZoneName: "short",
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Frozen when `next build` runs. `next dev` stays "dev".
    NEXT_PUBLIC_PROD_BUILD: prodBuildStamp(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow the qualities we actually pass to next/image (thumbs 80, lightbox 90).
    // Next 16 defaults this allowlist to [75] and will error otherwise.
    qualities: [75, 80, 90],
  },
};

export default nextConfig;
