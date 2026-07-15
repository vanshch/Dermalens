import express from "express";

const resp = {
  diseaseNames: ["vitiligo", "alopecia_areata", "prurigo_nodularis"],
  diseasePercentages: [0.9999, 0, 0],
};

import { readFileSync } from "fs";
const disease = JSON.parse(readFileSync('./backend/data/diseases.json', 'utf8'));

function findDiseaseData(disease, diseaseName) {
  diseaseName = diseaseName.toLowerCase();
  const diseaseData = disease.find((d) => d.name.toLowerCase() === diseaseName);
  return diseaseData;
}
const router = express.Router();

router.post("/image", (req, res) => {
  res.send(findDiseaseData(disease, resp.diseaseNames[0]));
});

export default router;
