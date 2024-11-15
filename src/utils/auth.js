import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

export const TOKEN_KEY = 'auth_token';
export const TOKEN_EXPIRY_KEY = 'token_expiry';

export function setAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  // Set expiry to 1 hour from now
  const expiry = new Date().getTime() + (60 * 60 * 1000);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

export function isTokenValid() {
  const token = getAuthToken();
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  
  if (!token || !expiry) return false;
  
  return new Date().getTime() < parseInt(expiry);
}

export async function checkAuthStatus() {
  const router = useRouter();
  const store = useStore();

  if (isTokenValid()) {
    store.commit('SET_TOKEN', getAuthToken());
    store.commit('SET_LOGGED_IN', true);
    return true;
  } else {
    removeAuthToken();
    store.commit('SET_TOKEN', null);
    store.commit('SET_LOGGED_IN', false);
    router.push('/');
    return false;
  }
}

export function setupAxiosInterceptors() {
  axios.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
} 