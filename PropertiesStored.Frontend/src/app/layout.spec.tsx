import { render } from "@testing-library/react";

import RootLayout from "./layout";

jest.mock("next/font/google", () => ({
  Geist: jest.fn(() => ({ variable: "--font-geist-sans", subsets: ["latin"] })),
  Geist_Mono: jest.fn(() => ({ variable: "--font-geist-mono", subsets: ["latin"] })),
}));

describe("RootLayout", () => {
  it("renders Footer component", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
    const footerText = getByText('All reserved rights ©');
    expect(footerText).toBeInTheDocument();
  });

  it("applies correct classes to body", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    const body = document.querySelector("body");
    expect(body).toHaveClass("antialiased");
    expect(body).toHaveClass("--font-geist-sans");
    expect(body).toHaveClass("--font-geist-mono");
  });
});