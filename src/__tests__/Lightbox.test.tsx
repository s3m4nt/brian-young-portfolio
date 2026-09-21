import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Lightbox } from "@/components/Lightbox";

const image = {
  src: "/images/projects/sloan.jpg",
  width: 729,
  height: 407,
  alt: "Sloan website screenshot",
};

describe("Lightbox", () => {
  it("does not show the image until one is selected", () => {
    render(<Lightbox image={null} onClose={() => {}} />);
    expect(screen.queryByAltText(image.alt)).not.toBeInTheDocument();
  });

  it("opens the dialog and closes from the button", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<Lightbox image={image} onClose={onClose} />);

    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog).toHaveAttribute("open");
    expect(screen.getByAltText(image.alt)).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalled();
  });
});
