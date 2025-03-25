import { defineNuxtPlugin } from '#app'
import Toast from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        position: 'top-right',
        duration: 3000,
    })
})
