import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";

import "./style.css";
import { definePreset } from "@primevue/themes";
import { ToastService, ConfirmationService } from "primevue";

import { createPinia } from "pinia";
import router from "@/router";


const Preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{teal.50}",
      100: "{teal.100}",
      200: "{teal.200}",
      300: "{teal.300}",
      400: "{teal.400}",
      500: "{teal.500}",
      600: "{teal.600}",
      700: "{teal.700}",
      800: "{teal.800}",
      900: "{teal.900}",
      950: "{teal.950}",
    },
  },
});

const pinia = createPinia();

const app = createApp(App);
app
  .use(PrimeVue, {
    theme: {
      preset: Preset,
    },
    ripple: true,
  })
  .use(ToastService)
  .use(ConfirmationService)
  .use(pinia)
  .use(router)
  .mount("#app");
