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

      <!-- Navigation Links (desktop) -->
      <div class="hidden md:flex space-x-6">
        <a v-for="link in displayedNavLinks" :key="link.text" :href="link.href"
          class="text-gray-300 hover:text-teal-500">
          <router-link :to="link.to">{{ link.text }}</router-link>
        </a>
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden flex items-center">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-gray-300 hover:text-white focus:outline-none">
          <MenuIcon v-if="!isMobileMenuOpen" class="h-6 w-6" />
          <XIcon v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden mt-2 pb-2 space-y-1">
      <router-link v-for="link in displayedNavLinks" :key="link.text" :to="link.to"
        class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-500 hover:bg-gray-700"
        @click="isMobileMenuOpen = false">
        {{ link.text }}
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { CameraIcon, MenuIcon, XIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const isMobileMenuOpen = ref(false);

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
  },
  isAuthenticated: {
    type: Boolean,
    default: false
  }
});

const displayedNavLinks = computed(() => {
  const baseLinks = Array.isArray(props.navLinks) ? [...props.navLinks] : [];
  if (props.isAuthenticated) {
    const appointmentsLink = { text: 'Appointments', to: '/appointments', href: '#' };
    if (!baseLinks.some(link => link.text === appointmentsLink.text)) {
      return [appointmentsLink, ...baseLinks];
    }
  }
  return baseLinks;
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
