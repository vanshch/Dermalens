import { readFileSync } from "fs";
import { analyzeSkinImage } from "../gemini_test.js";
import { getModelPredictions } from "../services/localModel.js";

const disease = JSON.parse(
  readFileSync(new URL("../data/diseases.json", import.meta.url), "utf8")
);

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
      const modelPredictions = await getModelPredictions(req.file.path);
      const geminiPrediction = await analyzeSkinImage(req.file.path);
      const top3Predictions = modelPredictions.slice(0, 3);
      const modelDiseaseData = findDiseaseData(disease, top3Predictions[0]?.className);
      const geminiDiseaseData = geminiPrediction ? findDiseaseData(disease, geminiPrediction) : null;

      res.json({
        success: true,
        data: {
          modelPredictions: top3Predictions,
          modelDiseaseData: modelDiseaseData,
          geminiPrediction,
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
