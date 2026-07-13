<template>
  <navbar_test :navLinks="navlinks" />
  <!-- <test /> -->
  <about_us />
  <div class="flex py-8 justify-center">
    <!-- <test /> -->
  </div>
</template>

<script setup>
import navbar_test from '../components/navbar_test.vue';
import contact from './contact.vue';
// import test from '../components/test.vue';
import about_us from '../components/about_us.vue';
const navlinks = [
  { text: 'Home', to: '/', href: '#' },
  { text: 'Contact', to: '/contact', href: '#' },
  // { text: 'contact', to: '/contact', href: '#' },
];


// VanshcHauHan
</script>
