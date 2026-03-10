import { vi, describe, it, expect, beforeEach } from 'vitest';

const mockGenerateContent = vi.fn();

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class MockGoogleGenAI {
      models = {
        generateContent: (...args: any[]) => mockGenerateContent(...args),
      };
    }
  };
});

import { getStylingAdvice } from './geminiService';

describe('getStylingAdvice', () => {
  beforeEach(() => {
    mockGenerateContent.mockClear();
  });

  it('should return styling advice on success', async () => {
    mockGenerateContent.mockResolvedValue({ text: "Voici un conseil de style très chic." });

    const advice = await getStylingAdvice('robe rouge');

    expect(advice).toBe("Voici un conseil de style très chic.");
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
    expect(mockGenerateContent).toHaveBeenCalledWith({
      model: 'gemini-3-flash-preview',
      contents: expect.stringContaining('robe rouge')
    });
  });

  it('should return default message if response.text is empty', async () => {
    mockGenerateContent.mockResolvedValue({ text: "" });

    const advice = await getStylingAdvice('robe rouge');

    expect(advice).toBe("Découvrez notre collection unique pour trouver votre style.");
  });

  it('should return fallback message on error', async () => {
    mockGenerateContent.mockRejectedValue(new Error("API Error"));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const advice = await getStylingAdvice('robe rouge');

    expect(advice).toBe("Explorez nos collections pour trouver la pièce parfaite.");
    expect(consoleSpy).toHaveBeenCalledWith("Gemini API Error:", expect.any(Error));
    consoleSpy.mockRestore();
  });
});
