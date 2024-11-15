// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import homePage from "../views/home.vue";
// import loginPage from "../views/login.vue";
import AboutPage from "../views/about.vue";
import dashboardPage from "../views/dashboard.vue";
import LandingPage from "../views/landing.vue";
import ContactPage from "../views/contact.vue";
import FaqPage from "../views/faq.vue";
import commingSoonPage from "../views/commingsoon.vue";

// import registerPage from "../views/register.vue";

import store from "../store";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/Login",
    name: "Login",
    component: homePage,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/register",
    name: "register",
    component: homePage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboardPage,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/Contact",
    name: "Contact",
    component: ContactPage,
  },

  {
    path: "/faq",
    name: "faq",
    component: FaqPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/commingsoon",
    name: "commingsoon",
    component: commingSoonPage,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Uncomment and modify the router guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  // Initialize store state if token exists
  if (localStorage.getItem("jwtToken")) {
    store.dispatch("checkLoginStatus");
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    console.log("You are not logged in, redirecting to login page");
    next("/Login");
    return;
  }
  next();
});

export default router;
