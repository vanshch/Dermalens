<!-- <template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div v-if="isRegistration">
      <label for="name" class="block text-sm font-medium">Name</label>
      <input
        v-model="form.name"
        type="text"
        id="name"
        class="w-full mt-1 px-4 py-2 bg-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        :disabled="isLoading"
      />
      <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
    </div>

    <div>
      <label for="email" class="block text-sm font-medium">Email</label>
      <input
        v-model="form.email"
        type="email"
        id="email"
        class="w-full mt-1 px-4 py-2 bg-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        :disabled="isLoading"
      />
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium">Password</label>
      <input
        v-model="form.password"
        type="password"
        id="password"
        class="w-full mt-1 px-4 py-2 bg-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        :disabled="isLoading"
      />
      <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
    </div>

    <div v-if="isRegistration">
      <label for="confirmPassword" class="block text-sm font-medium">Confirm Password</label>
      <input
        v-model="form.confirmPassword"
        type="password"
        id="confirmPassword"
        class="w-full mt-1 px-4 py-2 bg-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        :disabled="isLoading"
      />
      <span v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>
    </div>

    <div class="flex gap-4">
      <button
        type="submit"
        :disabled="isLoading || !isValid"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
      >
        {{ isRegistration ? 'Register' : 'Login' }}
      </button>
      <button
        type="button"
        @click="toggleMode"
        :disabled="isLoading"
        class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
      >
        {{ isRegistration ? 'Switch to Login' : 'Switch to Register' }}
      </button>
    </div>

    <div v-if="apiError" class="text-red-500 text-sm text-center">
      {{ apiError }}
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/index'
import { z } from 'zod'
import axios from 'axios'

// Props with default values
const props = defineProps({
  title: {
    type: String,
    default: 'Authentication'
  },
  redirectPath: {
    type: String,
    default: '/dashboard'
  }
})

// Environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Composables
const router = useRouter()
const authStore = useAuthStore()

// State
const isRegistration = ref(false)
const isLoading = ref(false)
const apiError = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({})

// Validation schemas
const validationSchemas = {
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters')
}

// Computed
const isValid = computed(() => {
  if (isRegistration.value) {
    return form.name && form.email && form.password && form.confirmPassword && 
           form.password === form.confirmPassword && Object.keys(errors).length === 0
  }
  return form.email && form.password && !errors.email && !errors.password
})

// Methods
const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])

  try {
    // Validate email and password for both login and registration
    validationSchemas.email.parse(form.email)
    validationSchemas.password.parse(form.password)
    
    // Additional validation for registration
    if (isRegistration.value) {
      validationSchemas.name.parse(form.name)
      if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
        return false
      }
    }
    
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        errors[err.path[0]] = err.message
      })
    }
    return false
  }
}

const handleSubmit = async () => {
  try {
    if (!validateForm()) return
    
    isLoading.value = true
    apiError.value = ''

    const endpoint = isRegistration.value ? '/auth/register' : '/auth/login'
    const payload = isRegistration.value 
      ? { name: form.name, email: form.email, password: form.password }
      : { email: form.email, password: form.password }

    const { data } = await axios.post(`${API_BASE_URL}${endpoint}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      },
      withCredentials: true
    })

    authStore.setToken(data.token)
    authStore.setUser(data.user)
    await router.push(props.redirectPath)
  } catch (error) {
    apiError.value = error.response?.data?.message || 'Authentication failed'
    console.error('Auth error:', error)
  } finally {
    isLoading.value = false
  }
}

const toggleMode = () => {
  isRegistration.value = !isRegistration.value
  apiError.value = ''
  Object.keys(errors).forEach(key => delete errors[key])
  form.name = ''
  form.confirmPassword = ''
}
</script> -->