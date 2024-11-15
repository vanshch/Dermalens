<template>
  <nav class="bg-gray-800 p-2 shadow-md">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo and Photo -->
      <div class="flex items-center">
        <camera-icon class="h-10 w-10 text-white mr-4" />
        <span class="text-white text-xl font-semibold">
          <a href="/">Dermalens</a>
        </span>
      </div>

      <!-- Navigation Links (dynamically generated) -->
      <div class="hidden md:flex space-x-6">
        <a v-for="link in navLinks" :key="link.text" :href="link.href" class="text-gray-300 hover:text-teal-500">
          <router-link :to="link.to">{{ link.text }}</router-link>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { CameraIcon } from 'lucide-vue-next'

// Define props
const props = defineProps({
  navLinks: {
    type: Array,
    // required: true,
    default: () => [
      { text: 'Home', to: '/', href: '#' },
      { text: 'About', to: '/about', href: '#' },
      { text: 'Contact', to: '/contact', href: '#' },
      { text: 'FAQ', to: '/faq', href: '#' }
    ]
  }
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
