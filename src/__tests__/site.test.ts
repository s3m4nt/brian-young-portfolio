import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { site } from "@/data/site";

describe("site data", () => {
  it("has the contact fields the page renders", () => {
    expect(site.name).toBe("Brian Young");
    expect(site.email).toMatch(/@/);
    expect(site.phone.href).toMatch(/^tel:/);
    expect(site.links.github).toMatch(/^https:\/\/github\.com\//);
    expect(site.links.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
    expect(site.links.resume).toBe("/resume/Brian_Young-FEWD-Resume.pdf");
  });

  it("asks search engines not to index the site", () => {
    const layout = readFileSync(join(__dirname, "../app/layout.tsx"), "utf8");
    expect(layout).toMatch(/index:\s*false/);
    expect(layout).toMatch(/follow:\s*false/);
    expect(robots()).toMatchObject({
      rules: { userAgent: "*", disallow: "/" },
    });
  });

  it("points at a résumé file that exists", () => {
    const file = join(
      __dirname,
      "../../public",
      site.links.resume.replace(/^\//, ""),
    );
    expect(existsSync(file)).toBe(true);
  });
});
