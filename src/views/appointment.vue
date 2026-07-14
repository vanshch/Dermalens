<template>
  <div>
    <NavbarTest />
    <div v-if="!showConfirmation" class="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h1
          class="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          Book Your Appointment
        </h1>

        <div class="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-xl">
          <div class="p-6">
            <form @submit.prevent="onSubmit" class="space-y-8">
              <!-- Add specialization field -->
              <div class="space-y-2">
                <label for="specialization" class="block text-lg font-medium">Select Specialization</label>
                <select id="specialization" v-model="form.specialization"
                  class="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="" disabled>Select a specialization</option>
                  <option v-for="spec in specialization" :key="spec" :value="spec">
                    {{ spec }}
                  </option>
                </select>
                <p v-if="errors.specialization" class="text-red-400 text-sm">{{ errors.specialization }}</p>
              </div>

              <div class="space-y-2">
                <label for="doctor" class="block text-lg font-medium">Select Doctor</label>
                <select id="doctor" v-model="form.doctor" :disabled="!form.specialization"
                  class="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  @change="updateSelectedDoctor">
                  <option value="" disabled>{{ form.specialization ? 'Select a doctor' : 'Please select specialization first' }}</option>
                  <option v-for="doctor in filteredDoctors" :key="doctor.id" :value="doctor.id">
                    {{ doctor.name }} ({{ doctor.experience }})
                  </option>
                </select>
                <p v-if="errors.doctor" class="text-red-400 text-sm">{{ errors.doctor }}</p>
              </div>

              <Transition name="fade">
                <div v-if="selectedDoctor" class="bg-gray-800/30 p-6 rounded-lg space-y-4 border border-gray-700/50">
                  <h2 class="text-2xl font-semibold mb-4">Doctor Details</h2>
                  <div class="space-y-2">
                    <p class="font-medium text-lg">{{ selectedDoctor.name }}</p>
                    <p class="text-blue-400">{{ selectedDoctor.specialty }}</p>
                    <p>{{ selectedDoctor.credentials }}</p>
                    <p>{{ selectedDoctor.experience }}</p>
                    <p>{{ selectedDoctor.education }}</p>
                  </div>
                </div>
              </Transition>

              <div class="space-y-2">
                <label for="appointmentDate" class="block text-lg font-medium">Appointment Date</label>
                <input type="date" id="appointmentDate" v-model="form.appointmentDate" :disabled="!selectedDoctor"
                  :min="new Date().toISOString().split('T')[0]"
                  class="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50" />
                <p v-if="errors.appointmentDate" class="text-red-400 text-sm">{{ errors.appointmentDate }}</p>
              </div>

              <div class="space-y-2">
                <label for="appointmentTime" class="block text-lg font-medium">Appointment Time</label>
                <select id="appointmentTime" v-model="form.appointmentTime"
                  :disabled="!selectedDoctor || !form.appointmentDate"
                  class="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50">
                  <option value="" disabled>{{ selectedDoctor && form.appointmentDate ? 'Select time slot' : 'Please select doctor and date first' }}</option>
                  <option v-for="slot in selectedDoctor?.availableSlots" :key="slot" :value="slot">
                    {{ slot }}
                  </option>
                </select>
                <p v-if="errors.appointmentTime" class="text-red-400 text-sm">{{ errors.appointmentTime }}</p>
              </div>

              <div class="space-y-2">
                <label for="symptoms" class="block text-lg font-medium">Symptoms & Problems</label>
                <textarea id="symptoms" v-model="form.symptoms"
                  placeholder="Please describe your symptoms and skin concerns in detail"
                  class="w-full min-h-[120px] bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                <p v-if="errors.symptoms" class="text-red-400 text-sm">{{ errors.symptoms }}</p>
              </div>

              <div class="space-y-2">
                <label for="previousMedication" class="block text-lg font-medium">Previous Medications (if any)</label>
                <textarea id="previousMedication" v-model="form.previousMedication"
                  placeholder="List any previous treatments or medications"
                  class="w-full min-h-[100px] bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                <p v-if="errors.previousMedication" class="text-red-400 text-sm">{{ errors.previousMedication }}</p>
              </div>

              <button type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Book Appointment
              </button>

              <div class="mt-4 text-center text-gray-400 text-sm">
                <p>Upon submission, a confirmation will be sent to the doctor.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <AppointmentConfirmation v-else :appointment="confirmedAppointmentDetails" @return-home="handleReturnHome" />
  </div>
</template>

<script setup>

import { ref, reactive, computed, watch } from 'vue'
import axios from 'axios'
import NavbarTest from '../components/navbar_test.vue'
import AppointmentConfirmation from '../components/appointment_confirmation.vue'
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'
import { doctors } from '../data/doctors.js'

// Extract unique specializations from the doctors array
const specialization = [...new Set(doctors.map(doctor => doctor.specialization))];

// Add API base URL
const API_BASE_URL = 'http://localhost:3000/api'

// Get store
const store = useStore()
const toast = useToast()

const showConfirmation = ref(false)
const confirmedAppointmentDetails = ref({
  date: '',
  time: '',
  with: ''
})

const form = reactive({
  specialization: '',
  doctor: '',
  appointmentDate: '',
  appointmentTime: '',
  symptoms: '',
  previousMedication: ''
})

const errors = reactive({
  specialization: '',
  doctor: '',
  appointmentDate: '',
  appointmentTime: '',
  symptoms: '',
  previousMedication: ''
})
const selectedDoctor = ref(null)

const filteredDoctors = computed(() => {
  if (!form.specialization) return []
  return doctors.filter(doctor => doctor.specialization === form.specialization)
})

const updateSelectedDoctor = () => {
  selectedDoctor.value = doctors.find(d => d.id === parseInt(form.doctor))
  form.appointmentDate = '' // Reset date when doctor changes
  form.appointmentTime = ''
}

const validateForm = () => {
  errors.specialization = form.specialization ? '' : 'Please select a specialization'
  errors.doctor = form.doctor ? '' : 'Please select a doctor'
  errors.appointmentDate = form.appointmentDate ? '' : 'Please select an appointment date'
  errors.appointmentTime = form.appointmentTime ? '' : 'Please select an appointment time'
  errors.symptoms = form.symptoms.length >= 10 && form.symptoms.length <= 500
    ? ''
    : 'Symptoms must be between 10 and 500 characters'
  errors.previousMedication = form.previousMedication.length <= 500
    ? ''
    : 'Previous medication details cannot exceed 500 characters'

  return Object.values(errors).every(error => error === '')
}

watch(() => form.specialization, () => {
  form.doctor = ''
  form.appointmentDate = ''
  form.appointmentTime = ''
  selectedDoctor.value = null
  if (errors.doctor) errors.doctor = ''; // Clear doctor error if specialization changes
  if (errors.appointmentDate) errors.appointmentDate = '';
  if (errors.appointmentTime) errors.appointmentTime = '';
})

watch(() => form.doctor, (newDoctorId) => {
  if (newDoctorId) {
    if (errors.doctor) errors.doctor = '';
  }
  // Reset date and time if doctor changes, handled by updateSelectedDoctor
});

watch(() => form.appointmentDate, (newDate) => {
  if (newDate) {
    if (errors.appointmentDate) errors.appointmentDate = '';
  }
  form.appointmentTime = ''; // Reset time slot when date changes
});


const onSubmit = async () => {
  if (validateForm()) {
    try {
      // Get user email from Vuex store
      const userEmail = store.state.email || 'user@example.com'

      // Create appointment payload
      const appointmentData = {
        specialization: form.specialization,
        doctorId: String(selectedDoctor.value?.email), // Changed to send doctor's email
        appointmentDate: form.appointmentDate,
        appointmentTime: form.appointmentTime,
        symptoms: form.symptoms,
        previousMedication: form.previousMedication || '',
        userId: store.state.email // Use email as userId
      };

      console.log('Sending appointment data:', appointmentData);

      // Send request to backend
      const response = await axios.post(
        `${API_BASE_URL}/appointment/create`,
        appointmentData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Populate confirmation details
      confirmedAppointmentDetails.value = {
        date: new Date(form.appointmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        time: form.appointmentTime,
        with: selectedDoctor.value?.name || 'N/A'
      };

      // Show confirmation
      showConfirmation.value = true;

      // Success message (optional if confirmation page is shown)
      // toast.add({
      //   severity: 'success',
      //   summary: 'Appointment Booked',
      //   detail: `Appointment request submitted successfully. Your appointment number is: ${response.data.appointmentNumber}`,
      //   life: 5000,
      //   position: 'bottom-center'
      // });

      // Reset form
      form.specialization = '';
      form.doctor = '';
      form.appointmentDate = '';
      form.appointmentTime = '';
      form.symptoms = '';
      form.previousMedication = '';
      selectedDoctor.value = null; // Also reset selected doctor display

    } catch (error) {
      console.error('Error:', error);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'There was an error submitting your appointment request. Please try again.',
        life: 5000,
        position: 'bottom-center'
      });
    }
  }
}

const handleReturnHome = () => {
  showConfirmation.value = false;
  // Optionally, navigate to a different route or reset more state
  // For now, it just shows the form again.
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
