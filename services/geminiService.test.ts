import { expect, test, describe, mock, beforeEach } from "bun:test";

const mockGenerateContent = mock();

mock.module("@google/genai", () => {
  return {
    GoogleGenAI: class {
      models = {
        generateContent: mockGenerateContent,
      };
    },
  };
});

const { getStylingAdvice } = await import("./geminiService.js");

describe("getStylingAdvice", () => {
  beforeEach(() => {
    mockGenerateContent.mockClear();
  });

  test("returns styling advice on successful API call", async () => {
    mockGenerateContent.mockResolvedValueOnce({ text: "Ceci est un conseil de style chic." });

    const advice = await getStylingAdvice("robe rouge");

    expect(mockGenerateContent).toHaveBeenCalled();
    expect(advice).toBe("Ceci est un conseil de style chic.");
  });

  test("returns default message when API response lacks text", async () => {
    mockGenerateContent.mockResolvedValueOnce({ text: null });

    const advice = await getStylingAdvice("jeans");

    expect(advice).toBe("Découvrez notre collection unique pour trouver votre style.");
  });

  test("returns fallback message on API error", async () => {
    mockGenerateContent.mockRejectedValueOnce(new Error("API Error"));

    // Silence console.error for this test
    const consoleSpy = mock(() => {});
    const originalConsoleError = console.error;
    console.error = consoleSpy;

    try {
      const advice = await getStylingAdvice("veste");

      expect(advice).toBe("Explorez nos collections pour trouver la pièce parfaite.");
      expect(consoleSpy).toHaveBeenCalled();
    } finally {
      console.error = originalConsoleError;
    }
  });
});
