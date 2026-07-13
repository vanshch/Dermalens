import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "fs";
import { lookup } from "mime-types";
import dotenv from "dotenv";

// Configure dotenv at the start
dotenv.config();

async function analyzeSkinImage(imagePath) {
  // Get API key from environment variables with proper error handling
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("Please set the GEMINI_API_KEY environment variable.");
  }

  // Create a GenerativeAI client
  const genAI = new GoogleGenerativeAI(apiKey);

  // Read the image file
  const imageData = readFileSync(imagePath);

  // Detect the image mime type
  const mimeType = lookup(imagePath);

  // Prepare the image data for Gemini
  const imageBytes = Array.from(imageData);

  // Create a generation config
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  };

  // Create the GenerativeModel
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
  });

  // Prompt the model with the image and a question
  const prompt = "in the next message strictly type just the name of the most probable disease and nothing else . if the image is not indicative of any disease simply respond with 'none'";

  // Send the prompt with the image
  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: Buffer.from(imageBytes).toString("base64"),
        mimeType,
      },
    },
  ]);

  // Extract and return the model's response instead of console logging
  const textResponse = result.response.text();
  return textResponse;

  // Remember, this is not a medical diagnosis tool.
  // Consult a dermatologist for accurate diagnosis and treatment.
}

// Example usage (replace with your image path):
// const imagePath = 'uploads/your_image.jpg';
// analyzeSkinImage(imagePath).then(console.log).catch(console.error);

export { analyzeSkinImage };
