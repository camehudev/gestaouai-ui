import axios from 'axios';
import router from '@/router'; // Importe o seu router para redirecionar

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // ESSENCIAL para enviar/receber Cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor de Requisição (Geralmente usado para Logs ou Tokens de Header)
api.interceptors.request.use(config => {  
  return config;
});

// NOVO: Interceptor de Resposta (Para capturar a expiração do Cookie)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. Verificamos se o erro é 401
    if (error.response && error.response.status === 401) {
      
      // 2. A MÁGICA: Só redireciona se NÃO estivermos no login
      // Isso evita que o erro 401 na tela de login cause um refresh infinito
      if (!window.location.pathname.includes('/login')) {
        console.warn("Sessão expirada. Redirecionando para o login...");
        
        sessionStorage.clear();
        localStorage.clear();

        // Redireciona de forma limpa
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;