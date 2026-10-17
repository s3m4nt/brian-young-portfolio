// Reports which build is live. Used by the drum atlas footer (public/drums).
// Values are frozen at build time, so this route is static.
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    commit: process.env.NEXT_PUBLIC_COMMIT ?? "dev",
    build: process.env.NEXT_PUBLIC_PROD_BUILD ?? "dev",
  });
}
