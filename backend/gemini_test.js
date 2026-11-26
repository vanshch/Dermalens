import { readFile } from "node:fs/promises";
import { lookup } from "mime-types";

const GENERATE_CONTENT_URL = "https://generativelanguage.googleapis.com/v1beta/models/";
const COMPARISON_TIMEOUT_MS = 10_000;

export async function analyzeSkinImage(imagePath) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const model = process.env.GEMINI_MODEL?.trim();
  if (!apiKey || !model) return null;

  const mimeType = lookup(imagePath);
  if (!mimeType || !mimeType.startsWith("image/")) return null;

  try {
    const image = await readFile(imagePath);
    const response = await fetch(`${GENERATE_CONTENT_URL}${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      signal: AbortSignal.timeout(COMPARISON_TIMEOUT_MS),
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: "For an educational comparison, return only a possible skin-condition label, or 'none' if unsure. Do not give treatment advice." },
            { inlineData: { mimeType, data: image.toString("base64") } },
          ],
        }],
      }),
    });

    if (!response.ok) {
      console.warn(`Gemini comparison unavailable (HTTP ${response.status})`);
      return null;
    }

    const { candidates } = await response.json();
    return candidates?.[0]?.content?.parts?.find(({ text, thought }) => text && !thought)?.text.trim() || null;
  } catch {
    console.warn("Gemini comparison unavailable: request could not be completed");
    return null;
  }
}
