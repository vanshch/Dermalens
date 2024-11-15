<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { checkAuthStatus } from './utils/auth';
import Toast from 'primevue/toast';

const router = useRouter();

onMounted(async () => {
  await checkAuthStatus();
});
</script>

<template>
  <Toast />
  <router-view />
</template>

<style scoped>
/* Add your styles here */
</style>