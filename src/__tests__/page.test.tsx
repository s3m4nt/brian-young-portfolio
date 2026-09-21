import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the main sections and contact paths", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /BrianYoung/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Before frontend/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Selected work" })).toBeInTheDocument();
    expect(screen.getByText("Get in touch")).toBeInTheDocument();

    expect(
      screen.getAllByRole("link", { name: "GitHub" })[0],
    ).toHaveAttribute("href", "https://github.com/s3m4nt");
    expect(
      screen.getAllByRole("link", { name: "LinkedIn" })[0],
    ).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/brian-d-young/",
    );
    expect(screen.getByRole("link", { name: "Résumé" })).toHaveAttribute(
      "href",
      "/resume/Brian_Young-FEWD-Resume.pdf",
    );
  });
});
