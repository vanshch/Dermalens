<template>
    <div class="pb-12">
        <navbar_test :navLinks="navlinks" />
    </div>
    <!-- <upload /> -->
    <upload_preview />

    <!-- Updated button styling and positioning -->
    <div class="fixed bottom-4 right-4">
        <button @click="handleLogout"
            class="bg-red-500/80 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded text-sm">
            Logout
        </button>
    </div>
</template>

<script setup>
// import navbar from '../components/navbar.vue'
import navbar_test from '../components/navbar_test.vue';
import upload from '../components/upload.vue'
import router from '../router/router';
import upload_preview from '../components/upload_preview.vue';
import analysis from '../components/analysis.vue';
import { useStore } from 'vuex';
const store = useStore();
// console.log(store.getters.isAuthenticated);
if (!store.getters.isAuthenticated) {
    router.push('/');
}

const navlinks = [
    { text: 'About', to: '/about', href: '#' },
    { text: 'contact', to: '/contact', href: '#' },
    { text: 'FAQ', to: '/faq', href: '#' },
];

const handleLogout = () => {
    store.dispatch('logout');
    // store.commit('LOGOUT')
    router.push('/');
};

</script>
