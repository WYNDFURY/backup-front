// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@deegital/nuxt-trustup-io-toasteo"],
  trustupIoToasteo: {},
  imports: {
    dirs:[
      "composables/**",
    ]
  },
  tailwindcss: {
    configPath: "tailwind.config.js",
  },
  app: {
    head: {
      script: [
        {
          src: "https://kit.fontawesome.com/5f8a0c88f2.js",
          crossorigin: "anonymous",
        },
      ],
    },
  },
})