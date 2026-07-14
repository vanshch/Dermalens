<template>
  <div class="min-h-screen bg-gray-900 flex justify-center items-center p-4 text-gray-100">
    <div
      class="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center">
      <div class="mb-6 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-teal-400">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h1 class="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-500">
        Appointment Confirmed</h1>
      <p class="text-gray-300 mb-6">Your appointment has been successfully scheduled.</p>

      <div class="bg-gray-700/50 border border-gray-600/50 rounded-lg p-4 sm:p-6 mb-8 text-left space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-gray-400 font-medium">Date:</span>
          <span class="text-gray-100 font-semibold">{{ appointment.date }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-400 font-medium">Time:</span>
          <span class="text-gray-100 font-semibold">{{ appointment.time }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-400 font-medium">With:</span>
          <span class="text-gray-100 font-semibold">{{ appointment.with }}</span>
        </div>
      </div>

      <button
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        @click="goHome">
        Return Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  appointment: {
    type: Object,
    required: true,
    default: () => ({
      date: 'N/A',
      time: 'N/A',
      with: 'N/A'
    })
  }
});

const router = useRouter();

const goHome = () => {
  router.push('/dashboard');
};
</script>

<style scoped>
/* Styles are now primarily handled by Tailwind CSS classes in the template. 
   You can add any additional specific styles here if needed, 
   or remove this style block if all styling is done via Tailwind. */
</style>