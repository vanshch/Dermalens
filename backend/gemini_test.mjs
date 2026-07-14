
import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "fs";
import { lookup } from "mime-types";

async function analyzeSkinImage(imagePath) {
  // Set your API key from Google Cloud Platform
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
    model: "gemini-pro-vision",
    generationConfig,
  });

  // Prompt the model with the image and a question
  const prompt = "Analyze this image and suggest potential skin conditions.";

  // Send the prompt with the image
  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: Buffer.from(imageBytes).toString('base64'),
        mimeType
      }
    }
  ]);

  // Extract and print the model's response
  const textResponse = result.response.text();
  console.log("Model Response:", textResponse);

  // Remember, this is not a medical diagnosis tool.
  // Consult a dermatologist for accurate diagnosis and treatment.
}

// Example usage (replace with your image path)
const imagePath = "./path/to/your/image.jpg";
analyzeSkinImage(imagePath)
  .then(() => console.log("Analysis complete."))
  .catch((error) => console.error("Error:", error));