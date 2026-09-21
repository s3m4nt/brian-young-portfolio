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
      const file = join(publicDir, project.image.src.replace(/^\//, ""));
      expect(existsSync(file), `missing ${project.image.src}`).toBe(true);
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
