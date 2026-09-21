import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyEmail } from "@/components/CopyEmail";

describe("CopyEmail", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("copies the address and confirms it", async () => {
    const user = userEvent.setup();
    const writeText = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(undefined);

    render(<CopyEmail email="bdy-dev@proton.me" />);
    expect(screen.getByText("click to copy")).toBeInTheDocument();

    await user.click(screen.getByRole("button"));

    expect(writeText).toHaveBeenCalledWith("bdy-dev@proton.me");
    expect(screen.getByText("copied!")).toBeInTheDocument();
  });

  it("shows a failure hint when the clipboard is unavailable", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("denied"),
    );

    render(<CopyEmail email="bdy-dev@proton.me" />);
    await user.click(screen.getByRole("button"));

    expect(screen.getByText("copy failed")).toBeInTheDocument();
  });
});
