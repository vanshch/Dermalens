// src/store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    token: null,
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
      localStorage.removeItem("auth_token");
      // localStorage.removeItem("");

      console.log("LOGOUT mutation executed:", {
        stateToken: state.token,
        localStorageToken: localStorage.getItem("jwtToken"),
      });
    },
  },
  actions: {
    login({ commit }, token) {
      commit("SET_LOGGED_IN", true);
      commit("SET_TOKEN", token);
      localStorage.setItem("jwtToken", token); // Store token in localStorage
    },
    logout({ commit }) {
      // console.log('Before logout:', localStorage.getItem("jwtToken"));

      commit("LOGOUT");
      console.log("After logout:", localStorage.getItem("jwtToken"));
    },
    checkLoginStatus({ commit }) {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        commit("SET_LOGGED_IN", true);
        commit("SET_TOKEN", token);
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
  },
});
