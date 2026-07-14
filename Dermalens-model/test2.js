import * as tf from "@tensorflow/tfjs-node";
import * as fs from "fs";

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

// Load the model
async function loadModel() {
  const model = await tf.loadLayersModel(
    "file://D:/projects/Dermalens/Dermalens-model/model.json"
  );
  return model;
}

// Preprocess the image for ResNet-50 (224x224 RGB image)
async function preprocessImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const decodedImage = tf.node.decodeImage(imageBuffer, 3); // Decode to RGB
  const resizedImage = tf.image.resizeBilinear(decodedImage, [224, 224]);
  const normalizedImage = resizedImage.div(255.0); // Normalize to [0, 1]
  return normalizedImage.expandDims(0); // Add batch dimension
}

// Make a prediction
async function predict(imagePath) {
  const model = await loadModel();
  const preprocessedImage = await preprocessImage(imagePath);
  const predictions = model.predict(preprocessedImage);
  const predictionValues = predictions.dataSync();
  
  // Pair predictions with class names and sort
  const results = CLASS_NAMES.map((className, index) => ({
    className,
    probability: predictionValues[index]
  }))
  .sort((a, b) => b.probability - a.probability);

  // Display results
  console.log('\nPredictions for:', imagePath);
  console.log('-----------------------------------');
  results.forEach(({className, probability}) => {
    console.log(`${className}: ${(probability * 100).toFixed(2)}%`);
  });
}

// Run the prediction
predict("Psoriasis_on_back1.jpg");
