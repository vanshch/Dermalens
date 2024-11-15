<template v-once>
  <nav class="bg-gray-800 p-2 shadow-md">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo and Photo -->
      <div class="flex items-center">
        <img
          src='https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt="Logo" class="h-10 w-10 rounded-full mr-4" />
        <span class="text-white text-xl font-semibold">Dermalens</span>
      </div>

      <!-- Navigation Links -->
      <div class="hidden md:flex space-x-6">
        <a href="#" class="text-gray-300 hover:text-teal-500">
          <router-link to="/about">About</router-link>
        </a>  
        <a href="#" class="text-gray-300 hover:text-teal-500">Contacts</a>
        <a href="#" class="text-gray-300 hover:text-teal-500">Help</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>
