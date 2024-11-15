import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import router from "./router/router.js";
import store from "../src/store/index.js";
import ToastService from 'primevue/toastservice';
// import { prepareStackTrace } from "postcss/lib/css-syntax-error";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use( router );
app.use(store);
app.use(ToastService);
app.mount("#app");
