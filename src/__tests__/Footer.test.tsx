import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/Footer";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Footer", () => {
  it("renders the weather icon and temperature after the copyright", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          current: { temperature_2m: 72.4, weather_code: 0 },
        }),
      }),
    );

    render(await Footer());

    expect(screen.getByText(/Brian Young/)).toBeInTheDocument();
    const weather = screen.getByTitle("Malibu, CA");
    expect(weather).toHaveTextContent("☀️");
    expect(weather).toHaveTextContent("72°F");
  });

  it("hides weather when the forecast request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    render(await Footer());

    expect(screen.getByText(/Brian Young/)).toBeInTheDocument();
    expect(screen.queryByTitle("Malibu, CA")).not.toBeInTheDocument();
  });
});
