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
      </nav>
    </header>
    <main class="flex-1">
      <section class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
          <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Contact Us</h1>
          <div class="grid gap-10 sm:grid-cols-2">
            <div class="space-y-6">
              <h2 class="text-2xl font-bold">Our Team</h2>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <user-icon class="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 class="font-semibold">Dr. Jane Smith</h3>
                    <p class="text-sm text-gray-400">Lead Dermatologist</p>
                    <a href="mailto:jane.smith@dermalens.com" class="text-blue-400 hover:underline">jane.smith@dermalens.com</a>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <user-icon class="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 class="font-semibold">John Doe</h3>
                    <p class="text-sm text-gray-400">AI Research Lead</p>
                    <a href="mailto:john.doe@dermalens.com" class="text-blue-400 hover:underline">john.doe@dermalens.com</a>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <user-icon class="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 class="font-semibold">Sarah Johnson</h3>
                    <p class="text-sm text-gray-400">Customer Relations Manager</p>
                    <a href="mailto:sarah.johnson@dermalens.com" class="text-blue-400 hover:underline">sarah.johnson@dermalens.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <h2 class="text-2xl font-bold">Customer Care</h2>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <phone-icon class="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 class="font-semibold">Phone Support</h3>
                    <p class="text-sm text-gray-400">Monday to Friday, 9AM - 5PM EST</p>
                    <a href="tel:+18001234567" class="text-blue-400 hover:underline">+1 (800) 123-4567</a>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <mail-icon class="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 class="font-semibold">Email Support</h3>
                    <p class="text-sm text-gray-400">24/7 Support</p>
                    <a href="mailto:support@dermalens.com" class="text-blue-400 hover:underline">support@dermalens.com</a>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <message-circle-icon class="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 class="font-semibold">Live Chat</h3>
                    <p class="text-sm text-gray-400">Available on our website</p>
                    <button @click="openLiveChat" class="text-blue-400 hover:underline">Start Chat</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
        <div class="container px-4 md:px-6">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">Send Us a Message</h2>
          <form @submit.prevent="submitForm" class="max-w-md mx-auto space-y-4">
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
import { CameraIcon, UserIcon, PhoneIcon, MailIcon, MessageCircleIcon } from 'lucide-vue-next'

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

const openLiveChat = () => {
  // Implement live chat functionality
  console.log('Opening live chat')
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>