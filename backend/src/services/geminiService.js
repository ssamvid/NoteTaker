import { GoogleGenAI } from "@google/genai";

let ai;

function getClient() {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

export async function summarizeText(text) {
  const model = process.env.GEMINI_MODEL ?? "gemini-3.6-flash";
  const response = await getClient().models.generateContent({
    model,
    contents: `Summarize the following note in 2-3 concise sentences. Keep the key points only, no preamble.\n\n${text}`,
  });

  return response.text.trim();
}
