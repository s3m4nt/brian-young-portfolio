import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";

const publicDir = join(__dirname, "../../public");

describe("projects data", () => {
  it("has unique ids", () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes required copy and image metadata", () => {
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.role.length).toBeGreaterThan(0);
      expect(project.subtitle.length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.image.src).toMatch(/^\/images\/projects\//);
      expect(project.image.alt.length).toBeGreaterThan(0);
      expect(project.image.width).toBeGreaterThan(0);
      expect(project.image.height).toBeGreaterThan(0);
    }
  });

  it("points at image files that exist in public/", () => {
    for (const project of projects) {
      const files = [
        project.image,
        ...(project.lightboxImages ?? []),
      ];
      for (const image of files) {
        const file = join(publicDir, image.src.replace(/^\//, ""));
        expect(existsSync(file), `missing ${image.src}`).toBe(true);
      }
    }
  });

  it("opens the promo pair as two lightbox images", () => {
    const promo = projects.find((project) => project.id === "promo-system");
    expect(promo?.lightboxImages).toHaveLength(2);
  });

  it("uses larger screenshots in the lightbox for the band sites", () => {
    for (const id of ["sloan", "jamc", "ivy", "fow"]) {
      const project = projects.find((entry) => entry.id === id);
      const full = project?.lightboxImages?.[0];
      expect(full, `${id} is missing a lightbox image`).toBeDefined();
      expect(full?.src).toMatch(/-full\.jpg$/);
      expect(full?.width ?? 0).toBeGreaterThan(project?.image.width ?? 0);
      expect(full?.height ?? 0).toBeGreaterThan(project?.image.height ?? 0);
    }
  });

  it("uses absolute https links when a project has live URLs", () => {
    for (const project of projects) {
      for (const link of project.links ?? []) {
        expect(link.label.length).toBeGreaterThan(0);
        expect(link.href).toMatch(/^https:\/\//);
      }
    }
  });
});
