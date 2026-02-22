import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "AIzaSyAhRKRncFK-cakyYHjkLlEwHUdULTm0w_M" });

export const getStylingAdvice = async (query: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const response = await ai.models.generateContent({
      model,
      contents: `You are a high-end fashion stylist for a French marketplace called "Fashby". 
      The user is searching for: "${query}". 
      Provide a short, chic, and helpful styling tip (max 2 sentences) in French that encourages them to browse our catalog.
      Do not mention specific external links. Focus on "Neuf" (New) or "Seconde Main" (Second hand) mix.`,
    });

    return response.text || "Découvrez notre collection unique pour trouver votre style.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Explorez nos collections pour trouver la pièce parfaite.";
  }
};
