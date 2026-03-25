import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import router from './router';
import ToastService from 'primevue/toastservice';
import Ripple from 'primevue/ripple'; // 1. Já está importado

// Componentes
import ProgressSpinner from 'primevue/progressspinner';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar'; // Certifique-se de registrar o Menubar também!
import 'primeicons/primeicons.css';
import Chart from 'primevue/chart';

const app = createApp(App);

// 2. REGISTRE A DIRETIVA (Isso resolve o erro "Failed to resolve directive")
app.directive('ripple', Ripple);
app.component('Chart', Chart);

app.use(ToastService);
app.use(router);

// Componentes Globais
app.component('ProgressSpinner', ProgressSpinner);
app.component('Avatar', Avatar);
app.component('Badge', Badge);
app.component('Button', Button);
app.component('Menu', Menu);
app.component('Menubar', Menubar);

// 3. ATIVE O RIPPLE DENTRO DO USE(PRIMEVUE)
app.use(PrimeVue, {
    ripple: true, // ADICIONE ESTA LINHA AQUI
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
});

app.mount('#app');