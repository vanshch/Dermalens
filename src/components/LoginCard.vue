<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #header>
      <img class="h-56 w-screen" alt="user header"
        src="https://images.unsplash.com/photo-1729161769741-e7bbb82abc84?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </template>
    <template #title>
      <div class="text-center">
        {{ title }}
      </div>
    </template>
    <template #content>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-if="isRegisterMode">
          <BaseInput v-model="formData.name" id="name" label="Name" :error="errors.name"
            placeholder="Enter your name" />
        </div>

        <BaseInput v-model="formData.email" id="email" type="email" label="Email" :error="errors.email"
          placeholder="Enter your email" />

        <BaseInput v-model="formData.password" id="password" type="password" label="Password" :error="errors.password"
          placeholder="Enter your password" />
      </form>
    </template>
    <template #footer>
      <div class="flex flex-col gap-4 mt-1">
        <div class="flex gap-4">
          <Button @click="handleSubmit" :label="isRegisterMode ? 'Register' : 'Login'"
            class="w-full !bg-blue-600 hover:!bg-blue-700" />
        </div>
        <div class="text-center">
          <button @click="toggleMode" class="text-blue-500 hover:text-blue-700 text-sm">
            {{ isRegisterMode ? 'Already have an account? Login' : 'Need an account? Register' }}
          </button>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import BaseInput from './BaseInput.vue'; // New component for input fields
// import { loginUser, registerUser } from 'src/services/auth'; // New auth service
import { loginUser, registerUser } from '../services/auth'; // New auth service
import { validateEmail, validateRequired } from '../utils/validation'; // New validation utilities
import { useToast } from 'primevue/usetoast';
import { setAuthToken } from '../utils/auth';

const router = useRouter();
const store = useStore();
const toast = useToast();

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  initialMode: {
    type: String,
    default: 'login', // 'login' or 'register'
    validator: (value) => ['login', 'register'].includes(value)
  }
})

const formData = reactive({
  name: '',
  email: '',
  password: ''
});

const errors = reactive({
  name: '',
  email: '',
  password: ''
});

const isRegisterMode = ref(props.initialMode === 'register');

function validateForm() {
  let isValid = true;
  errors.email = validateEmail(formData.email);
  errors.password = validateRequired(formData.password, 'Password');

  if (isRegisterMode.value) {
    errors.name = validateRequired(formData.name, 'Name');
    if (errors.name) isValid = false;
  }

  if (errors.email || errors.password) isValid = false;
  return isValid;
}

async function handleSubmit() {
  if (!validateForm()) return;

  try {
    const response = isRegisterMode.value
      ? await registerUser(formData)
      : await loginUser(formData);

    if (isRegisterMode.value) {
      toast.add({
        severity: 'success',
        summary: 'Registration Successful',
        detail: 'Your account has been created successfully! Please login.',
        life: 5000,
        position: 'bottom-center'
      });
      router.push('/login');
    } else if (response.token) {
      setAuthToken(response.token);
      store.commit('SET_TOKEN', response.token);
      store.commit('SET_LOGGED_IN', true);
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('Authentication error:', error);

    // Check if error is due to already registered user
    console.log(error.response?.status === 400)
    console.log(isRegisterMode.value)
    if (isRegisterMode.value && error.response?.status === 409) {
      isRegisterMode.value = false;
      toast.add({
        severity: 'info',
        summary: 'Account Exists',
        detail: 'This email is already registered. Please login instead.',
        life: 5000,
        position: 'bottom-center'
      });
    } else if (!isRegisterMode.value && error.response?.status === 401) {
      // Remove console.log and ensure toast is properly called
      toast.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: error.response?.data?.message || 'Invalid email or password',
        // detail:'Email or password incorrect',
        life: 5000,
        // position: 'bottom-center'
      });
    } else {
      // Handle other errors
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An unexpected error occurred',
        life: 5000,
        position: 'bottom-center'
      });
    }
  }
}

function toggleMode() {
  isRegisterMode.value = !isRegisterMode.value;
  // Reset form and errors when switching modes
  Object.keys(formData).forEach(key => formData[key] = '');
  Object.keys(errors).forEach(key => errors[key] = '');
}
</script>
