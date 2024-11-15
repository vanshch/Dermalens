<template>
  <div class="bg-gray-900 rounded-lg shadow-lg overflow-hidden max-w-sm w-full">
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-white">{{ disease.name }}</h2>
        <div
          class="w-3 h-3 rounded-full"
          :class="{
            'bg-green-500': disease.severity === 'low',
            'bg-yellow-500': disease.severity === 'medium',
            'bg-red-500': disease.severity === 'high'
          }"
        ></div>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-400">Symptoms</h3>
        <ul class="list-disc list-inside text-gray-300">
          <li v-for="symptom in disease.symptoms" :key="symptom">{{ symptom }}</li>
        </ul>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-400">Remedies</h3>
        <ul class="list-disc list-inside text-gray-300">
          <li v-for="remedy in disease.remedies" :key="remedy">{{ remedy }}</li>
        </ul>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-400">Medicines</h3>
        <ul class="list-disc list-inside text-gray-300">
          <li v-for="medicine in disease.medicines" :key="medicine" class="flex justify-between items-center">
            {{ medicine }}
            <button
              @click="redirectToAppointment"
              class="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Buy
            </button>
          </li>
        </ul>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-gray-400">Specialist Contact</h3>
        <p class="text-gray-300">{{ disease.specialistNumber }}</p>
      </div>
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
import router from '../router/router';

const props = defineProps({
  disease: {
    type: Object,
    // required: true,
    default:() => ({
      name: 'Common Cold',
      severity: 'low',
      symptoms: ['Cough', 'Sneezing', 'Runny nose'],
      remedies: ['Drink warm liquids', 'Rest', 'Gargle'],
      medicines: ['Paracetamol', 'Ibuprofen'],
      specialistNumber: '+91 9876543210',
    })
  },
});

const makeAppointment = () => {
  // Implement appointment making logic here
  console.log('Making appointment for', props.disease.name);
  router.push('/commingsoon');
};

const redirectToAppointment = () => {
  // Implement redirect logic here
  console.log('Redirecting to appointment for', props.disease.name);
  router.push('/commingsoon');
};
</script>
