import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";

describe("App Secap", () => {
  it("renderiza a tela inicial com dashboard", () => {
    render(<App />);

    expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Membros ativos/i)).toBeInTheDocument();
  });

  it("navega para membros pelo menu lateral", () => {
    render(<App />);

    fireEvent.click(screen.getAllByText(/Membros/i)[0]);

    expect(screen.getAllByText(/^Membros$/i).length).toBeGreaterThan(0);
  });
});
