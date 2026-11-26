import { readFile } from "node:fs/promises";
import * as tf from "@tensorflow/tfjs";
import sharp from "sharp";

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

const MODEL_PATH = new URL("../../Dermalens-model/model.json", import.meta.url);
const INPUT_SIZE = 224;
let modelPromise;

async function loadModelFromDisk() {
  const { modelTopology, weightsManifest } = JSON.parse(await readFile(MODEL_PATH, "utf8"));
  const shards = await Promise.all(weightsManifest.flatMap(({ paths }) =>
    paths.map((path) => readFile(new URL(path, MODEL_PATH)))
  ));
  const weights = Buffer.concat(shards);
  return tf.loadLayersModel(tf.io.fromMemory({
    modelTopology,
    weightSpecs: weightsManifest.flatMap(({ weights }) => weights),
    weightData: weights.buffer.slice(weights.byteOffset, weights.byteOffset + weights.byteLength),
  }));
}

function loadModel() {
  modelPromise ??= loadModelFromDisk().catch((error) => {
    modelPromise = undefined;
    throw error;
  });
  return modelPromise;
}

export async function getModelPredictions(imagePath) {
  let decoded;
  try {
    decoded = await sharp(imagePath, { limitInputPixels: 20_000_000 })
      .toColourspace("srgb")
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
  } catch (error) {
    throw Object.assign(new Error("Upload a supported image of at most 20 megapixels.", { cause: error }), { status: 400 });
  }

  const { data, info } = decoded;
  const model = await loadModel();
  const predictionValues = tf.tidy(() => {
    const image = tf.tensor3d(data, [info.height, info.width, info.channels]);
    const input = tf.image.resizeBilinear(image, [INPUT_SIZE, INPUT_SIZE]).div(255).expandDims(0);
    return model.predict(input).dataSync();
  });

  return CLASS_NAMES.map((className, index) => ({
    className,
    probability: predictionValues[index],
  })).sort((a, b) => b.probability - a.probability);
}
