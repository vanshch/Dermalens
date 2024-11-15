<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-gray-100">
    <header class="px-4 lg:px-6 h-14 flex items-center">
      <router-link to="/" class="flex items-center justify-center">
        <camera-icon class="h-6 w-6 mr-2" />
        <span class="font-bold text-xl">Dermalens</span>
      </router-link>
      <nav class="ml-auto flex gap-4 sm:gap-6">
        <router-link to="/" class="text-sm font-medium hover:underline underline-offset-4">Home</router-link>
        <router-link to="/contact" class="text-sm font-medium hover:underline underline-offset-4">Contact</router-link>
        <router-link to="/support" class="text-sm font-medium hover:underline underline-offset-4">Support</router-link>
      </nav>
    </header>
    <main class="flex-1">
      <section class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
          <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Support</h1>
          <div class="grid gap-10 lg:grid-cols-2">
            <div class="space-y-6">
              <h2 class="text-2xl font-bold">Contact Our Team</h2>
              <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-200">Name</label>
                  <input v-model="form.name" id="name" type="text" required class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-200">Email</label>
                  <input v-model="form.email" id="email" type="email" required class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label for="message" class="block text-sm font-medium text-gray-200">Message</label>
                  <textarea v-model="form.message" id="message" rows="4" required class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Send Message
                </button>
              </form>
            </div>
            <div class="space-y-6">
              <h2 class="text-2xl font-bold">Frequently Asked Questions</h2>
              <div class="space-y-4">
                <details v-for="(faq, index) in faqs" :key="index" class="group bg-gray-800 rounded-lg">
                  <summary class="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                    <span>{{ faq.question }}</span>
                    <span class="transition group-open:rotate-180">
                      <chevron-down-icon class="h-5 w-5" />
                    </span>
                  </summary>
                  <p class="px-4 pb-4 text-gray-300">
                    {{ faq.answer }}
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
      <p class="text-xs text-gray-400">© 2024 Dermalens. All rights reserved.</p>
      <nav class="sm:ml-auto flex gap-4 sm:gap-6">
        <router-link to="/terms" class="text-xs hover:underline underline-offset-4 text-gray-400">
          Terms of Service
        </router-link>
        <router-link to="/privacy" class="text-xs hover:underline underline-offset-4 text-gray-400">
          Privacy
        </router-link>
      </nav>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CameraIcon, ChevronDownIcon } from 'lucide-vue-next'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form.value)
  // Reset form after submission
  form.value = { name: '', email: '', message: '' }
  // You might want to show a success message to the user here
}

const faqs = ref([
  {
    question: "What is Dermalens?",
    answer: "Dermalens is a cutting-edge platform that allows users to upload photos of their skin and receive an AI-powered analysis to help identify potential skin conditions or diseases. Our goal is to empower individuals with the knowledge and tools to better understand their skin health."
  },
  {
    question: "How does Dermalens work?",
    answer: "Dermalens utilizes advanced machine learning algorithms and a comprehensive database of skin conditions to analyze the uploaded images. By examining various factors such as color, texture, and patterns, the platform can provide users with a personalized assessment and suggest potential next steps."
  },
  {
    question: "Is Dermalens a substitute for professional medical advice?",
    answer: "No, Dermalens is not a substitute for professional medical advice. Our platform is designed to be a preliminary screening tool, and we strongly recommend that users consult with a licensed dermatologist or healthcare provider for a proper diagnosis and treatment plan."
  },
  {
    question: "What types of skin conditions can Dermalens identify?",
    answer: "Dermalens can analyze a wide range of skin conditions, including but not limited to acne, eczema, psoriasis, skin cancer, and various types of rashes or lesions. However, the platform's accuracy and capabilities are constantly evolving, so we encourage users to stay up to date with our latest developments."
  },
  {
    question: "How accurate is Dermalens' diagnosis?",
    answer: "The accuracy of Dermalens' diagnosis depends on several factors, such as the quality of the uploaded images, the complexity of the skin condition, and the user's specific circumstances. While we strive for high accuracy, our platform should be used as a supplementary tool and not as a definitive diagnosis."
  },
  {
    question: "Is Dermalens free to use?",
    answer: "Yes, Dermalens is currently offered as a free service to users. However, we may introduce premium features or subscriptions in the future to support the ongoing development and maintenance of the platform."
  },
  {
    question: "How do I get started with Dermalens?",
    answer: "To use Dermalens, simply visit our website, create an account, and follow the step-by-step instructions to upload your skin photos. Our user-friendly interface will guide you through the process and provide you with the analysis results."
  },
  {
    question: "Is my personal information secure on Dermalens?",
    answer: "Protecting user privacy is of utmost importance to us. Dermalens adheres to strict data security protocols and privacy policies to ensure that your personal information and uploaded images are kept confidential and secure."
  }
])
</script>

<style scoped>
/* Add any component-specific styles here */
</style>