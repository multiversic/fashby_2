import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../App";
import * as geminiService from "../services/geminiService";

// Mock the getStylingAdvice service
vi.mock("../services/geminiService", () => ({
  getStylingAdvice: vi.fn(),
}));

describe("App AI Search Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle successful AI search correctly", async () => {
    // Setup the mock return value
    const mockAdvice = "Voici un excellent conseil mode pour vous.";
    vi.mocked(geminiService.getStylingAdvice).mockResolvedValue(mockAdvice);

    // Render the App
    render(<App />);

    // Find the input and button
    const input = screen.getByPlaceholderText("Ex: Tenue pour un mariage...");
    const button = screen.getByRole("button", { name: /découvrir/i });

    // Ensure the input exists
    expect(input).toBeInTheDocument();

    // Simulate user typing a query
    fireEvent.change(input, { target: { value: "robe de soirée" } });
    expect(input).toHaveValue("robe de soirée");

    // Simulate form submission
    fireEvent.click(button);

    // Verify loading state
    expect(screen.getByRole("button", { name: /\.\.\./i })).toBeInTheDocument();

    // Verify that the mocked service was called with the right argument
    expect(geminiService.getStylingAdvice).toHaveBeenCalledWith("robe de soirée");

    // Wait for the advice to be displayed
    await waitFor(() => {
      expect(screen.getByText(mockAdvice)).toBeInTheDocument();
    });

    // Verify loading state is gone
    expect(screen.getByRole("button", { name: /découvrir/i })).toBeInTheDocument();
  });

  it("should handle empty search correctly", async () => {
    // Render the App
    render(<App />);

    // Find the input and button
    const input = screen.getByPlaceholderText("Ex: Tenue pour un mariage...");
    const button = screen.getByRole("button", { name: /découvrir/i });

    // Simulate form submission without entering text
    fireEvent.click(button);

    // Verify that the mocked service was not called
    expect(geminiService.getStylingAdvice).not.toHaveBeenCalled();
  });

  it("should handle error in AI search correctly", async () => {
    // Setup the mock to reject
    vi.mocked(geminiService.getStylingAdvice).mockRejectedValue(new Error("API Error"));

    // Render the App
    render(<App />);

    // Find the input and button
    const input = screen.getByPlaceholderText("Ex: Tenue pour un mariage...");
    const button = screen.getByRole("button", { name: /découvrir/i });

    // Simulate user typing a query
    fireEvent.change(input, { target: { value: "chaussures de sport" } });

    // Simulate form submission
    fireEvent.click(button);

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText("Désolé, je n'ai pas pu générer de conseil pour le moment.")).toBeInTheDocument();
    });

    // Verify loading state is gone
    expect(screen.getByRole("button", { name: /découvrir/i })).toBeInTheDocument();
  });
});
