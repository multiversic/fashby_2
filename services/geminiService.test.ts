import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getStylingAdvice } from './geminiService';
import { GoogleGenAI } from '@google/genai';

// Setup hoisted variables to use inside mock
const mocks = vi.hoisted(() => {
  return {
    generateContentMock: vi.fn(),
  };
});

// Mock the GoogleGenAI class and its methods
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class {
      models = {
        generateContent: mocks.generateContentMock,
      };
    },
  };
});

describe('getStylingAdvice', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should return styling advice successfully', async () => {
    const mockResponse = { text: 'Test styling advice' };
    mocks.generateContentMock.mockResolvedValueOnce(mockResponse);

    const result = await getStylingAdvice('jeans');

    expect(result).toBe('Test styling advice');
    expect(mocks.generateContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gemini-3-flash-preview',
        contents: expect.stringContaining('jeans'),
      })
    );
  });

  it('should return fallback text when API returns empty text', async () => {
    const mockResponse = { text: '' };
    mocks.generateContentMock.mockResolvedValueOnce(mockResponse);

    const result = await getStylingAdvice('jeans');

    expect(result).toBe('Découvrez notre collection unique pour trouver votre style.');
  });

  it('should handle errors and return a fallback error message', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('API Error');
    mocks.generateContentMock.mockRejectedValueOnce(error);

    const result = await getStylingAdvice('jeans');

    expect(result).toBe('Explorez nos collections pour trouver la pièce parfaite.');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Gemini API Error:', error);

    consoleErrorSpy.mockRestore();
  });
});
