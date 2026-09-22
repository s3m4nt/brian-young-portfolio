import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { Project } from "@/data/projects";
import { ProjectList } from "@/components/ProjectList";

const projects: Project[] = [
  {
    id: "sloan",
    title: "Sloan — official site",
    role: "Design, development & site management",
    subtitle: "Custom typography & e-commerce",
    tags: "Next.js, Tailwind CSS",
    image: {
      src: "/images/projects/sloan.jpg",
      width: 729,
      height: 407,
      alt: "Sloan website screenshot",
    },
  },
  {
    id: "promo",
    title: "Promo & marketing",
    role: "Frontend development",
    subtitle: "Dynamic homepage campaigns",
    tags: "React, Next.js",
    note: "The live sites have since changed.",
    links: [
      { label: "menswearhouse.com", href: "https://www.menswearhouse.com" },
    ],
    image: {
      src: "/images/projects/promo-system.jpg",
      width: 2400,
      height: 1350,
      alt: "Promo system screenshot",
    },
    lightboxImages: [
      {
        src: "/images/projects/promo-mw.jpg",
        width: 1497,
        height: 718,
        alt: "Men's Wearhouse homepage",
        caption: "Men's Wearhouse",
      },
      {
        src: "/images/projects/promo-jos.jpg",
        width: 1474,
        height: 718,
        alt: "Jos. A. Bank homepage",
        caption: "Jos. A. Bank",
      },
    ],
  },
];

describe("ProjectList", () => {
  it("renders selected work with roles, tags, and optional links", () => {
    render(<ProjectList projects={projects} />);

    expect(screen.getByText("Sloan — official site")).toBeInTheDocument();
    expect(screen.getByText("Promo & marketing")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /menswearhouse\.com/ })).toHaveAttribute(
      "href",
      "https://www.menswearhouse.com",
    );
    expect(
      screen.getByText("The live sites have since changed."),
    ).toBeInTheDocument();
  });

  it("opens the lightbox from a thumbnail", async () => {
    const user = userEvent.setup();
    render(<ProjectList projects={projects} />);

    await user.click(
      screen.getByRole("button", {
        name: "View larger image: Sloan — official site",
      }),
    );

    expect(screen.getByAltText("Sloan website screenshot")).toBeInTheDocument();
    expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute("open");
  });

  it("opens the promo work as two side-by-side screenshots", async () => {
    const user = userEvent.setup();
    render(<ProjectList projects={projects} />);

    await user.click(
      screen.getByRole("button", {
        name: "View larger image: Promo & marketing",
      }),
    );

    expect(screen.getByAltText("Men's Wearhouse homepage")).toBeInTheDocument();
    expect(screen.getByAltText("Jos. A. Bank homepage")).toBeInTheDocument();
    expect(screen.getByText("Men's Wearhouse")).toBeInTheDocument();
    expect(screen.getByText("Jos. A. Bank")).toBeInTheDocument();
  });
});
