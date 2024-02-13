// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        [
            "@pinia/nuxt",
            {
                autoImports: ["defineStore", "acceptHMRUpdate"],
            },
        ],
        '@nuxtjs/google-fonts'
    ],
    imports: {
        dirs: ['stores']
    },
    googleFonts: {
        families: {
            Nunito: true
        }
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            application_api: process.env.APPLICATION_API || "http://localhost:8000",
        },
    },
})
