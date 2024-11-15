<template>
<NavbarTest/>
  <div class="flex justify-center  pt-8 pb-12">
    <LoginCard title="Login"/>
  </div>
  <Footer/>
</template>

<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import Test from './components/input.vue' // Changed to uppercase T for component naming convention  
// import LoginCard from './components/LoginCard.vue';
// import LoginCard from './components/LoginCard.vue'
import LoginCard from '../components/LoginCard.vue' 
import NavbarTest from '../components/navbar_test.vue'
import Footer from '../components/Footer.vue'
import {useStore} from 'vuex'
import router from '../router/router';

const store = useStore()

if(store.getters.isLoggedIn){
  router.push('/dashboard')
}
</script>