import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import * as tf from "@tensorflow/tfjs-node";
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

const MODEL_PATH = process.env.MODEL_PATH || "file://../Dermalens-model/model.json";

// Add model-related functions
async function loadModel() {
  const model = await tf.loadLayersModel(MODEL_PATH);
  return model;
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

const disease = [
  // main diseases 
  {
    name: "Vitiligo",
    severity: "medium",
    symptoms: ["White patches on skin", "Premature graying of hair"],
    remedies: ["Topical corticosteroids", "UV light therapy"],
    medicines: ["Tacrolimus", "Steroids"],
    specialistNumber: "+91 9876543210",
  },
  {
    name: "Psoriasis",
    severity: "high",
    symptoms: ["Red patches", "Itchy skin", "Scaly skin"],
    remedies: ["Moisturizing creams", "Phototherapy"],
    medicines: ["Methotrexate", "Corticosteroids"],
    specialistNumber: "+91 9876543220",
  },
  {
    name: "Eczema",
    severity: "medium",
    symptoms: ["Red, inflamed skin", "Itchiness", "Dry patches"],
    remedies: ["Moisturizers", "Avoiding irritants"],
    medicines: ["Hydrocortisone cream", "Antihistamines"],
    specialistNumber: "+91 9876543230",
  },
  {
    name: "Acne",
    severity: "low",
    symptoms: ["Pimples", "Blackheads", "Cysts"],
    remedies: ["Cleanse skin", "Topical treatments"],
    medicines: ["Benzoyl peroxide", "Retinoids"],
    specialistNumber: "+91 9876543240",
  },
  {
    name: "Rosacea",
    severity: "medium",
    symptoms: ["Redness on face", "Swelling", "Visible blood vessels"],
    remedies: ["Avoid hot drinks", "Sun protection"],
    medicines: ["Metronidazole", "Azelaic acid"],
    specialistNumber: "+91 9876543250",
  },
  {
    name: "Ringworm",
    severity: "low",
    symptoms: ["Circular rash", "Itching", "Scaly skin"],
    remedies: ["Antifungal creams", "Maintain hygiene"],
    medicines: ["Clotrimazole", "Terbinafine"],
    specialistNumber: "+91 9876543260",
  },
  {
    name: "Melasma",
    severity: "low",
    symptoms: ["Brown patches on face", "Hyperpigmentation"],
    remedies: ["Sunscreen", "Topical creams"],
    medicines: ["Hydroquinone", "Tretinoin"],
    specialistNumber: "+91 9876543270",
  },
  {
    name: "Shingles",
    severity: "high",
    symptoms: ["Painful rash", "Blisters", "Tingling sensation"],
    remedies: ["Cold compresses", "Antiviral drugs"],
    medicines: ["Acyclovir", "Valacyclovir"],
    specialistNumber: "+91 9876543280",
  },
  {
    name: "Dermatitis",
    severity: "medium",
    symptoms: ["Red rash", "Itchy skin", "Dry patches"],
    remedies: ["Moisturizers", "Avoid allergens"],
    medicines: ["Corticosteroids", "Antihistamines"],
    specialistNumber: "+91 9876543290",
  },
  {
    name: "Hives (Urticaria)",
    severity: "low",
    symptoms: ["Itchy welts", "Swelling", "Red bumps"],
    remedies: ["Cool compress", "Avoid triggers"],
    medicines: ["Antihistamines", "Steroids"],
    specialistNumber: "+91 9876543300",
  },
  {
    name: "Lichen Planus",
    severity: "medium",
    symptoms: ["Purple, flat bumps", "Itching", "Mouth sores"],
    remedies: ["Antihistamines", "Topical creams"],
    medicines: ["Corticosteroids", "Retinoids"],
    specialistNumber: "+91 9876543310",
  },
  {
    name: "Scabies",
    severity: "medium",
    symptoms: ["Intense itching", "Rashes", "Blisters"],
    remedies: ["Topical creams", "Oral medications"],
    medicines: ["Permethrin", "Ivermectin"],
    specialistNumber: "+91 9876543320",
  },
  {
    name: "Seborrheic_Dermatitis",
    severity: "low",
    symptoms: ["Scaly patches", "Red skin", "Dandruff"],
    remedies: ["Anti-dandruff shampoo", "Moisturizers"],
    medicines: ["Ketoconazole", "Selenium sulfide"],
    specialistNumber: "+91 9876543330",
  },
  {
    name: "Cellulitis",
    severity: "high",
    symptoms: ["Red, swollen skin", "Pain", "Fever"],
    remedies: ["Antibiotics", "Rest"],
    medicines: ["Penicillin", "Cephalexin"],
    specialistNumber: "+91 9876543340",
  },
  {
    name: "Cutaneous_Lupus",
    severity: "high",
    symptoms: ["Red, scaly rash", "Lesions", "Sensitivity to sunlight"],
    remedies: ["Sun protection", "Avoid stress"],
    medicines: ["Hydroxychloroquine", "Corticosteroids"],
    specialistNumber: "+91 9876543350",
  },
  {
    name: "Alopecia_Areata",
    severity: "medium",
    symptoms: ["Hair loss", "Bald patches", "Scalp itching"],
    remedies: ["Corticosteroid injections", "Minoxidil"],
    medicines: ["Topical immunotherapy", "Steroids"],
    specialistNumber: "+91 9876543360",
  },
  {
    name: "Keratosis_Pilaris",
    severity: "low",
    symptoms: ["Bumpy skin", "Dry patches", "Rough texture"],
    remedies: ["Exfoliation", "Moisturizers"],
    medicines: ["Lactic acid cream", "Salicylic acid"],
    specialistNumber: "+91 9876543370",
  },
  // diseases for model 
  {
    "name": "Acne and Rosacea",
    "severity": "Mild to Moderate",
    "symptoms": ["Pimples, blackheads, whiteheads", "Redness, flushing, and bumps on the face"],
    "remedies": ["Over-the-counter medications, prescription medications, lifestyle changes"],
    "medicines": ["Benzoyl peroxide, salicylic acid, retinoids"],
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Actinic Keratosis Basal Cell Carcinoma",
    "severity": "Moderate to Severe",
    "symptoms": ["Rough, scaly patches on sun-exposed skin", "Open sores that bleed or crust"],
    "remedies": ["Cryotherapy, laser therapy, topical medications"],
    "medicines": ["Fluorouracil cream, imiquimod cream"],
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Atopic Dermatitis",
    "severity": "Mild to Severe",
    "symptoms": ["Itchy, red, scaly skin", "Dry, cracked skin"],
    "remedies": ["Moisturizers, topical corticosteroids, oral medications"],
    "medicines": ["Hydrocortisone cream, topical calcineurin inhibitors"],
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Bullous Disease",
    "severity": "Moderate to Severe",
    "symptoms": ["Blisters on the skin", "Pain and discomfort"],
    "remedies": ["Topical corticosteroids, oral corticosteroids, immunosuppressant medications"],
    "medicines": ["Prednisone, azathioprine"],
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Cellulitis Impetigo",
    "severity": "Mild to Moderate",
    "symptoms": ["Red, swollen, and painful skin", "Pus-filled blisters"],
    "remedies": ["Antibiotics"],
    "medicines": ["Cephalexin, dicloxacillin"],
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Eczema",
    "severity": "Mild to Severe",
    "symptoms": ["Itchy, red, scaly skin"],
    "remedies": ["Moisturizers, topical corticosteroids, oral medications"],
    "medicines": ["Hydrocortisone cream, topical calcineurin inhibitors"],
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Exanthems and Drug Eruptions",
    "severity": "Mild to Severe",
    "symptoms": ["Rash, hives, itching"],
    "remedies": ["Antihistamines, topical corticosteroids, avoiding triggers"],
    "medicines": ["Diphenhydramine, cetirizine"],
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Hair Loss Alopecia",
    "severity": "Mild to Severe",
    "symptoms": ["Hair loss on the scalp or other parts of the body"],
    "remedies": ["Minoxidil, finasteride, hair transplant"],
    "medicines": ["Minoxidil, finasteride"],
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Herpes HPV and STDs",
    "severity": "Mild to Severe",
    "symptoms": ["Blisters, sores, warts, genital discharge"],
    "remedies": ["Antiviral medications, topical treatments"],
    "medicines": ["Acyclovir, valacyclovir"],
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Light Diseases and Pigmentation",
    "severity": "Mild to Moderate",
    "symptoms": ["Dark spots, light spots, uneven skin tone"],
    "remedies": ["Sunscreen, topical creams, laser therapy"],
    "medicines": ["Hydroquinone cream, tretinoin cream"],
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Lupus and Connective Tissue Diseases",
    "severity": "Moderate to Severe",
    "symptoms": ["Rash, joint pain, fatigue, fever"],
    "remedies": ["Immunosuppressant medications, corticosteroids, antimalarial drugs"],
    "medicines": ["Hydroxychloroquine, prednisone, methotrexate"],
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Melanoma Skin Cancer Nevi and Moles",
    "severity": "Moderate to Severe",
    "symptoms": ["Abnormal moles, skin cancer"],
    "remedies": "Surgery, radiation therapy, chemotherapy",
    "medicines": "Depends on the specific type of cancer",
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Nail Fungus and Diseases",
    "severity": "Mild to Moderate",
    "symptoms": "Thick, discolored, and brittle nails",
    "remedies": "Topical antifungal medications, oral antifungal medications",
    "medicines": "Terbinafine, itraconazole",
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Poison Ivy and Contact Dermatitis",
    "severity": "Mild to Moderate",
    "symptoms": "Itchy, red rash",
    "remedies": "Topical corticosteroids, calamine lotion, oatmeal baths",
    "medicines": "Hydrocortisone cream",
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Psoriasis Lichen Planus",
    "severity": "Mild to Severe",
    "symptoms": "Red, scaly patches on the skin",
    "remedies": "Topical corticosteroids, light therapy, systemic medications",
    "medicines": "Calcipotriene, tazarotene, methotrexate",
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Scabies Lyme Disease",
    "severity": "Mild to Moderate",
    "symptoms": "Intense itching, skin rash",
    "remedies": "Topical scabicide medications, oral antibiotics",
    "medicines": "Permethrin cream, doxycycline",
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Seborrheic Keratoses",
    "severity": "Mild",
    "symptoms": "Warty, crusty growths on the skin",
    "remedies": "Usually no treatment needed, but can be removed for cosmetic reasons",
    "medicines": "N/A",
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Systemic Disease",
    "severity": "Variable",
    "symptoms": "Depends on the specific systemic disease",
    "remedies": "Depends on the specific systemic disease",
    "medicines": "Depends on the specific systemic disease",
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Tinea Ringworm Candidiasis",
    "severity": "Mild to Moderate",
    "symptoms": "Itchy, red, scaly patches on the skin",
    "remedies": "Topical antifungal medications, oral antifungal medications",
    "medicines": "Clotrimazole cream, terbinafine cream, fluconazole",
    "specialistNumber": "+91 1234567890"
  },
  {
    "name": "Urticaria Hives",
    "severity": "Mild to Severe",
    "symptoms": "Itchy, red, raised welts on the skin",
    "remedies": "Antihistamines, topical corticosteroids",
    "medicines": "Diphenhydramine, cetirizine, hydrocortisone cream",
    "specialistNumber": "+91 1234567890"
  },
{
  "name": "Vasculitis",
  "severity": "Moderate to Severe",
  "symptoms": ["Red, tender, or painful skin, often with a rash", "Fever, fatigue, and weight loss"],
  "remedies": "Depends on the specific type of vasculitis and its severity. May involve medications to reduce inflammation and suppress the immune system.",
  "medicines": "Corticosteroids, immunosuppressants, biologic therapies",
  "specialistNumber": "+91 1234567890"
},
{
  "name": "Warts Molluscum",
  "severity": "Mild to Moderate",
  "symptoms": "Small, flesh-colored or pearly bumps on the skin",
  "remedies": "Often resolve on their own, but treatments like cryotherapy, topical medications, or laser therapy can be used to remove them.",
  "medicines": "Salicylic acid, cryotherapy, imiquimod cream",
  "specialistNumber": "+91 1234567890"
}

];

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
  image_upload: async (req, res) => {
    console.log("in image_upload");
    if (!req.file) {
      return res.status(400).send("No files were uploaded.");
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

      res.send({
        modelPredictions: top3Predictions,
        modelDiseaseData: modelDiseaseData,
        geminiPrediction: geminiPrediction || "Unknown Condition",
        geminiDiseaseData: geminiDiseaseData
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error processing image");
    }
  },
  feedback_post: (req, res) => {
    console.log(req.body);
    res.send("Feedback route hit");
  },
};

export default postController;
