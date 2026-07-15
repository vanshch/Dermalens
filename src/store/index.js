// src/store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    token: null,
    isDoctor: false,
    email: null, // Add email to the state
  },
  mutations: {
    SET_LOGGED_IN(state, status) {
      state.isLoggedIn = status;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null; // Reset email on logout
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email"); // Remove email from localStorage on logout
      localStorage.removeItem("isDoctor");
    },
    SET_DOCTOR_STATUS(state, status) {
      state.isDoctor = status;
    },
    SET_EMAIL(state, email) {
      // Add mutation for setting email
      state.email = email;
    },
  },
  actions: {
    login({ commit }, { token, isDoctor, email }) {
      // Update login action to accept email
      commit("SET_LOGGED_IN", true);
      commit("SET_TOKEN", token);
      commit("SET_DOCTOR_STATUS", isDoctor);
      commit("SET_EMAIL", email); // Commit the email to the state
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("isDoctor", isDoctor);
      localStorage.setItem("email", email); // Store email in localStorage
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    checkLoginStatus({ commit }) {
      const token = localStorage.getItem("jwtToken");
      const isDoctor = localStorage.getItem("isDoctor") === "true";
      const email = localStorage.getItem("email"); // Retrieve email from localStorage
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.exp * 1000 < Date.now()) {
            commit("LOGOUT");
            return;
          }
          commit("SET_LOGGED_IN", true);
          commit("SET_TOKEN", token);
          commit("SET_DOCTOR_STATUS", isDoctor);
          commit("SET_EMAIL", email); // Commit the email to the state
        } catch (e) {
          commit("LOGOUT");
        }
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    },
    getToken(state) {
      return state.token;
    },
    isDoctor(state) {
      return state.isDoctor;
    },
    getEmail(state) {
      // Add getter for email
      return state.email;
    },
  },
});
