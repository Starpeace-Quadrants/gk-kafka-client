import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: '939293573845-e3e5t507011f13rid8ccu4iv4p6be2i8.apps.googleusercontent.com'
})

app.mount('#app')
