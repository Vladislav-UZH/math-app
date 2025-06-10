import Aura from "@primeuix/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@primevue/nuxt-module",
    "@nuxt/icon",
    "@nuxt/image",
    "@vite-pwa/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/tailwindcss",
  ],
  css: ["~/assets/css/main.css"],
  primevue: {
    options: {
      // ripple: true,
      inputVariant: "filled",
      theme: {
        preset: Aura,
      },
    },
  },
});
