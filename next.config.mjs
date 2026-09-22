/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow the qualities we actually pass to next/image (thumbs 80, lightbox 90).
    // Next 16 defaults this allowlist to [75] and will error otherwise.
    qualities: [75, 80, 90],
  },
};

export default nextConfig;
