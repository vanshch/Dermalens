<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-gray-100">
    <header class="px-4 lg:px-6 h-14 flex items-center">
      <router-link to="/" class="flex items-center justify-center">
        <camera-icon class="h-6 w-6 mr-2" />
        <span class="font-bold text-xl">Dermalens</span>
      </router-link>
    </header>
    <main class="flex-1 flex items-center justify-center">
      <div class="container px-4 md:px-6 text-center">
        <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Coming Soon
        </h1>
        <p class="mt-4 text-lg text-gray-400 md:text-xl lg:text-2xl">
          Dermalens is preparing to revolutionize skin health analysis.
        </p>
        <div class="mt-8">
          <countdown-timer :target-date="launchDate" />
        </div>
        <div class="mt-12 max-w-md mx-auto">
          <h2 class="text-2xl font-semibold mb-4">Stay Updated</h2>
          <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row gap-2">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="flex-grow px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              class="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Notify Me
            </button>
          </form>
        </div>
        <div class="mt-12 flex justify-center space-x-6">
          <a href="#" class="text-gray-400 hover:text-white">
            <twitter-icon class="h-6 w-6" />
            <span class="sr-only">Twitter</span>
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <facebook-icon class="h-6 w-6" />
            <span class="sr-only">Facebook</span>
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <instagram-icon class="h-6 w-6" />
            <span class="sr-only">Instagram</span>
          </a>
        </div>
      </div>
    </main>
    <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
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
import { CameraIcon, TwitterIcon, FacebookIcon, InstagramIcon } from 'lucide-vue-next'
import CountdownTimer from '../components/CountdownTimer.vue'

const email = ref('')
const launchDate = new Date('2024-12-31T00:00:00') // Set your launch date here

const subscribeNewsletter = () => {
  // Here you would typically send the email to your backend
  console.log('Subscribed email:', email.value)
  // Reset form after submission
  email.value = ''
  // You might want to show a success message to the user here
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>