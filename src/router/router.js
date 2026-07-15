// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/landing.vue";

const homePage = () => import("../views/home.vue");
const AboutPage = () => import("../views/about.vue");
const dashboardPage = () => import("../views/dashboard.vue");
const ContactPage = () => import("../views/contact.vue");
const FaqPage = () => import("../views/faq.vue");
const appointmentPage = () => import("../views/appointment.vue");
const commingSoonPage = () => import("../views/commingsoon.vue");

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
    path: "/appointment",
    name: "appointment",
    component: appointmentPage,
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
