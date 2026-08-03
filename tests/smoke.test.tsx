import { siteConfig } from "@/constants/site";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

function SmokeFixture() {
  return <h1>{siteConfig.name}</h1>;
}

describe("test harness", () => {
  it("resolves project aliases and renders React components", () => {
    render(<SmokeFixture />);

    expect(screen.getByRole("heading", { name: siteConfig.name })).toBeDefined();
  });

  it("cleans the DOM between tests", () => {
    expect(screen.queryByRole("heading")).toBeNull();
  });
});
