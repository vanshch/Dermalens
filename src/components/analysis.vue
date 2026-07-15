<template>
  <div v-if="isLoading" class="bg-gray-900 rounded-lg shadow-lg overflow-hidden max-w-md w-full animate-pulse">
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between">
        <div class="h-8 bg-gray-700 rounded w-1/2"></div>
        <div class="h-6 bg-gray-700 rounded w-1/4"></div>
      </div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
        <div class="h-4 bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
        <div class="h-4 bg-gray-700 rounded w-full"></div>
      </div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
        <div class="h-4 bg-gray-700 rounded w-full"></div>
      </div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
        <div class="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
    <div class="px-6 py-4 border-t border-gray-800">
      <div class="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-700 rounded w-full"></div>
      </div>
    </div>
    <div class="px-6 py-4 border-t border-gray-800">
      <div class="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
      <div class="h-4 bg-gray-700 rounded w-full"></div>
    </div>
    <div class="px-6 py-4 bg-gray-800">
      <div class="h-10 bg-gray-700 rounded w-full"></div>
    </div>
  </div>

  <div v-else class="bg-gray-900 rounded-lg shadow-lg overflow-hidden max-w-md w-full">
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-white">{{ disease?.modelDiseaseData?.name || 'Unknown' }}</h2>
        <div
          class="px-2 py-1 rounded-full text-xs font-medium"
          :class="{
            'bg-green-500 text-green-100': disease?.modelDiseaseData?.severity?.toLowerCase().includes('mild'),
            'bg-yellow-500 text-yellow-100': disease?.modelDiseaseData?.severity?.toLowerCase().includes('moderate'),
            'bg-red-500 text-red-100': disease?.modelDiseaseData?.severity?.toLowerCase().includes('severe')
          }"
        >
          {{ disease?.modelDiseaseData?.severity || 'Unknown' }}
        </div>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-400">Symptoms</h3>
        <ul class="list-disc list-inside text-gray-300">
          <li v-for="symptom in getArrayOrSplit(disease?.modelDiseaseData?.symptoms)" :key="symptom">
            {{ symptom }}
          </li>
        </ul>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-400">Remedies</h3>
        <ul class="list-disc list-inside text-gray-300">
          <li v-for="remedy in getArrayOrSplit(disease?.modelDiseaseData?.remedies)" :key="remedy">
            {{ remedy }}
          </li>
        </ul>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-400">Medicines</h3>
        <ul class="list-disc list-inside text-gray-300">
          <li v-for="medicine in getArrayOrSplit(disease?.modelDiseaseData?.medicines)" :key="medicine" class="flex justify-between items-center">
            {{ medicine }}
          </li>
        </ul>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-400">Specialist Contact</h3>
        <p class="text-gray-300">{{ disease?.modelDiseaseData?.specialistNumber }}</p>
      </div>
    </div>
    
    <div class="px-6 py-4 border-t border-gray-800">
      <h3 class="text-sm font-medium text-gray-400 mb-2">AI Model Predictions</h3>
      <div class="space-y-2">
        <div v-for="prediction in disease?.modelPredictions" :key="prediction.className" 
             class="flex justify-between items-center text-gray-300">
          <span>{{ prediction.className }}</span>
          <span class="text-blue-400">{{ (prediction.probability * 100).toFixed(2) }}%</span>
        </div>
      </div>
    </div>
    
    <div class="px-6 py-4 border-t border-gray-800">
      <h3 class="text-sm font-medium text-gray-400 mb-2">Gemini Prediction</h3>
      <p class="text-gray-300">{{ disease?.geminiPrediction }}</p>
    </div>
    
    <div class="px-6 py-4 bg-gray-800">
      <button
        @click="makeAppointment"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Make Appointment
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  disease: {
    type: Object,
    required: true,
    default: () => ({
      modelPredictions: [
        {
          className: "Acne and Rosacea",
          probability: 0.85
        },
        {
          className: "Eczema",
          probability: 0.10
        },
        {
          className: "Psoriasis Lichen Planus",
          probability: 0.05
        }
      ],
      modelDiseaseData: {
        name: "Acne and Rosacea",
        severity: "Mild to Moderate",
        symptoms: [
          "Pimples, blackheads, whiteheads",
          "Redness, flushing, and bumps on the face"
        ],
        remedies: [
          "Over-the-counter medications, prescription medications, lifestyle changes"
        ],
        medicines: [
          "Benzoyl peroxide, salicylic acid, retinoids"
        ],
        specialistNumber: "+91 1234567890"
      },
      geminiPrediction: "Acne and Rosacea",
      geminiDiseaseData: {
        name: "Acne and Rosacea",
        severity: "Mild to Moderate",
        symptoms: [
          "Pimples, blackheads, whiteheads",
          "Redness, flushing, and bumps on the face"
        ],
        remedies: [
          "Over-the-counter medications, prescription medications, lifestyle changes"
        ],
        medicines: [
          "Benzoyl peroxide, salicylic acid, retinoids"
        ],
        specialistNumber: "+91 1234567890"
      }
    })
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const makeAppointment = () => {
  console.log('Making appointment for', props.disease.modelDiseaseData.name);
  router.push('/appointment');
};

// Add this helper function
const getArrayOrSplit = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return [value];
  return [];
};
</script>