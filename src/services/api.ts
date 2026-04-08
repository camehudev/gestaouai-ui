import axios from 'axios';
import router from '@/router'; // Importe o seu router para redirecionar
import { ref } from 'vue';

// Estado global do loading
export const loadingCount = ref(0);

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // ESSENCIAL para enviar/receber Cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// // Interceptor de Requisição (Geralmente usado para Logs ou Tokens de Header)
// api.interceptors.request.use(config => {  
//   return config;
// });

// --- INTERCEPTOR DE REQUISIÇÃO ---
api.interceptors.request.use((config) => {
  loadingCount.value++; // Adiciona uma requisição ativa
  return config;

}, (error) => {
  loadingCount.value--; // Remove se a requisição nem chegou a sair
  return Promise.reject(error);
});

// --- INTERCEPTOR DE RESPOSTA ---
api.interceptors.response.use(
  (response) => {
    loadingCount.value = Math.max(0, loadingCount.value - 1); // Subtrai uma concluída
    return response;
  },
  (error) => {
    loadingCount.value = Math.max(0, loadingCount.value - 1); // Subtrai mesmo se der erro

    // --- Sua lógica de 401 existente ---
    if (error.response && error.response.status === 401) {
      if (!window.location.pathname.includes('/login')) {
        console.warn("Sessão expirada. Redirecionando para o login...");
        
        sessionStorage.clear();
        localStorage.clear();

        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;