import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import router from './router';

const app = createApp(App);

app.use(router) // ESTA LINHA É OBRIGATÓRIA

// Registra o PrimeVue na instância que acabamos de criar
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
});

// Monta a instância JÁ CONFIGURADA no elemento #app
app.mount('#app');