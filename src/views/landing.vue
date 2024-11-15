<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-gray-100">
    <header class="px-4 lg:px-6 h-14 flex items-center">
      <router-link to="/" class="flex items-center justify-center">
        <camera-icon class="h-6 w-6 mr-2" />
        <span class="font-bold text-xl">Dermalens</span>
      </router-link>
      <nav class="ml-auto flex gap-4 sm:gap-6">
        <a href="#features" class="text-sm font-medium hover:underline underline-offset-4 py-2">Features</a>
        <a href="#how-it-works" class="text-sm font-medium hover:underline underline-offset-4 py-2">How It Works</a>
        <button @click="redirectToLogin" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Login / Sign Up
        </button>
      </nav>
    </header>
    <main class="flex-1">
      <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div class="container px-4 md:px-6">
          <div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div class="flex flex-col justify-center space-y-4">
              <div class="space-y-2">
                <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Skin concerns?
                </h1>
                <p class="max-w-[600px] text-gray-400 md:text-xl">
                  Upload an image of your skin and get instant AI-powered diagnosis of probable skin conditions.
                </p>
              </div>
              <div class="flex flex-col gap-2 min-[400px]:flex-row">
                <button @click="redirectToLogin" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Try Dermalens Now
                </button>
              </div>
            </div>
            <img
              alt="Hero"
              class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="550"
              src="https://plus.unsplash.com/premium_photo-1675869589440-8b3f38dc5fe2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width="550"
            />
          </div>
        </div>
      </section>
      <section id="features" class="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
              <p class="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover how Dermalens can help you identify skin conditions quickly and accurately.
              </p>
            </div>
          </div>
          <div class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div class="flex flex-col items-center space-y-4">
              <camera-icon class="h-12 w-12 text-blue-500" />
              <h3 class="text-xl font-bold">Easy Image Upload</h3>
              <p class="text-sm text-gray-400 text-center">
                Simply upload a clear image of your skin concern for instant analysis.
              </p>
            </div>
            <div class="flex flex-col items-center space-y-4">
              <brain-icon class="h-12 w-12 text-blue-500" />
              <h3 class="text-xl font-bold">AI-Powered Diagnosis</h3>
              <p class="text-sm text-gray-400 text-center">
                Our advanced AI model analyzes your image to identify potential skin conditions.
              </p>
            </div>
            <div class="flex flex-col items-center space-y-4">
              <clock-icon class="h-12 w-12 text-blue-500" />
              <h3 class="text-xl font-bold">Instant Results</h3>
              <p class="text-sm text-gray-400 text-center">
                Get quick results and recommendations for your skin concerns.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">How It Works</h2>
          <div class="grid gap-4 md:grid-cols-3 md:gap-8">
            <div class="flex flex-col items-center space-y-2 border border-gray-700 p-4 rounded-lg">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">1</div>
              <h3 class="text-xl font-bold">Upload Image</h3>
              <p class="text-sm text-gray-400 text-center">Take a clear photo of your skin concern and upload it to Dermalens.</p>
            </div>
            <div class="flex flex-col items-center space-y-2 border border-gray-700 p-4 rounded-lg">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">2</div>
              <h3 class="text-xl font-bold">AI Analysis</h3>
              <p class="text-sm text-gray-400 text-center">Our AI model analyzes the image to identify potential skin conditions.</p>
            </div>
            <div class="flex flex-col items-center space-y-2 border border-gray-700 p-4 rounded-lg">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">3</div>
              <h3 class="text-xl font-bold">Get Results</h3>
              <p class="text-sm text-gray-400 text-center">Receive instant results with probable skin conditions and recommendations.</p>
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
import { CameraIcon, BrainIcon, ClockIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const router = useRouter()
const store = useStore()

const redirectToLogin = () => {
  router.push('/login')
}

onMounted(() => {
  // Check login status from store
  store.dispatch('checkLoginStatus')
  if (store.getters.isAuthenticated) {
    router.push('/dashboard')
  }
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>