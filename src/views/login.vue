<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-gray-100">
    <navbar_test :navLinks="navlinks" />
    <main class="flex-1 flex justify-center items-center py-12">
      <LoginCard title="Welcome Back" />
    </main>
  </div>
</template>

<script setup>
import navbar_test from '../components/navbar_test.vue';
import LoginCard from '../components/LoginCard.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();
const store = useStore();

const navlinks = [
  { text: 'Home', to: '/', href: '#' },
  { text: 'FAQ', to: '/faq', href: '#' },
  { text: 'Contact', to: '/contact', href: '#' }
];

onMounted(() => {
  // Redirect to dashboard if already logged in
  if (store.getters.isAuthenticated) {
    router.push('/dashboard');
  }
});
</script>
