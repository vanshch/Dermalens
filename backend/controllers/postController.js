import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import * as tf from "@tensorflow/tfjs-node";
import { readFileSync } from "fs";
const disease = JSON.parse(readFileSync('./backend/data/diseases.json', 'utf8'));
import { analyzeSkinImage } from "../gemini_test.js";

const CLASS_NAMES = [
  "Acne and Rosacea",
  "Actinic Keratosis Basal Cell Carcinoma",
  "Atopic Dermatitis",
  "Bullous Disease",
  "Cellulitis Impetigo",
  "Eczema",
  "Exanthems and Drug Eruptions",
  "Hair Loss Alopecia",
  "Herpes HPV and STDs",
  "Light Diseases and Pigmentation",
  "Lupus and Connective Tissue",
  "Melanoma Skin Cancer Nevi and Moles",
  "Nail Fungus and Diseases",
  "Poison Ivy and Contact Dermatitis",
  "Psoriasis Lichen Planus",
  "Scabies Lyme Disease",
  "Seborrheic Keratoses",
  "Systemic Disease",
  "Tinea Ringworm Candidiasis",
  "Urticaria Hives",
  "Vascular Tumors",
const disease = JSON.parse(readFileSync('./backend/data/diseases.json', 'utf8'));
import { analyzeSkinImage } from "../gemini_test.js";

const CLASS_NAMES = [
  "Acne and Rosacea",
  "Actinic Keratosis Basal Cell Carcinoma",
  "Atopic Dermatitis",
  "Bullous Disease",
  "Cellulitis Impetigo",
  "Eczema",
  "Exanthems and Drug Eruptions",
  "Hair Loss Alopecia",
  "Herpes HPV and STDs",
  "Light Diseases and Pigmentation",
  "Lupus and Connective Tissue",
  "Melanoma Skin Cancer Nevi and Moles",
  "Nail Fungus and Diseases",
  "Poison Ivy and Contact Dermatitis",
  "Psoriasis Lichen Planus",
  "Scabies Lyme Disease",
  "Seborrheic Keratoses",
  "Systemic Disease",
  "Tinea Ringworm Candidiasis",
  "Urticaria Hives",
  "Vascular Tumors",
  "Vasculitis",
  "Warts Molluscum"
];

const MODEL_PATH = "file://D:/projects/Dermalens/Dermalens-model/model.json";

let cachedModel = null;
async function loadModel() {
  if (!cachedModel) {
    cachedModel = await tf.loadLayersModel(MODEL_PATH);
  }
  return cachedModel;
}

async function preprocessImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const decodedImage = tf.node.decodeImage(imageBuffer, 3);
  const resizedImage = tf.image.resizeBilinear(decodedImage, [224, 224]);
  const normalizedImage = resizedImage.div(255.0);
  return normalizedImage.expandDims(0);
}

async function getModelPredictions(imagePath) {
  const model = await loadModel();
  const preprocessedImage = await preprocessImage(imagePath);
  const predictions = model.predict(preprocessedImage);
  const predictionValues = predictions.dataSync();

  return CLASS_NAMES.map((className, index) => ({
    className,
    probability: predictionValues[index],
  })).sort((a, b) => b.probability - a.probability);
}



const defaultDiseaseData = {
  name: "Unknown Condition",
  severity: "undetermined",
  symptoms: ["Please consult a dermatologist for proper diagnosis"],
  remedies: ["Seek professional medical advice"],
  medicines: ["Prescription required"],
  specialistNumber: "+91 9876543200",
};

function findDiseaseData(disease, diseaseName) {
  if (!diseaseName) return defaultDiseaseData;
  
  const diseaseData = disease.find((d) => 
    d.name.toLowerCase() === diseaseName.toLowerCase() ||
    diseaseName.toLowerCase().includes(d.name.toLowerCase())
  );
  
  console.log(JSON.stringify(diseaseData));
  return diseaseData || defaultDiseaseData;
}

const postController = {
  image_upload: async (req, res, next) => {
    console.log("in image_upload");
    if (!req.file) {
      return res.status(400).json({ success: false, data: null, message: "No files were uploaded." });
    }

    try {
      // Get predictions from both models
      const [modelPredictions, geminiPrediction] = await Promise.all([
        getModelPredictions(req.file.path),
        analyzeSkinImage(req.file.path)
      ]);

      const top3Predictions = modelPredictions.slice(0, 3);
      const modelDiseaseData = findDiseaseData(disease, top3Predictions[0]?.className);
      const geminiDiseaseData = findDiseaseData(disease, geminiPrediction);

      res.json({
        success: true,
        data: {
          modelPredictions: top3Predictions,
          modelDiseaseData: modelDiseaseData,
          geminiPrediction: geminiPrediction || "Unknown Condition",
          geminiDiseaseData: geminiDiseaseData
        },
        message: "Image analyzed successfully"
      });
    } catch (error) {
      next(error);
    }
  },
  feedback_post: (req, res) => {
    console.log(req.body);
    res.json({ success: true, data: null, message: "Feedback route hit" });
  },
};

export default postController;
