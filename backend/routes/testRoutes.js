import express from "express";

const resp = {
  diseaseNames: ["vitiligo", "alopecia_areata", "prurigo_nodularis"],
  diseasePercentages: [0.9999, 0, 0],
};

const disease = [
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
];

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
