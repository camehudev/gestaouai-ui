import { createRouter, createWebHistory } from 'vue-router'
import api from '@/services/api' // Sua instância do Axios

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('@/views/LoginView.vue'), meta: { guestOnly: true } },
    { path: '/dashboard', component: () => import('@/views/DashboardView.vue'), meta: { requiresAuth: true } },
  ]
})

router.beforeEach(async (to, from, next) => {
  // 1. Se a rota não precisa de autenticação NEM é exclusiva para visitas, passa direto
  if (!to.meta.requiresAuth && !to.meta.guestOnly) {
    return next();
  }

  try {
    // 2. Tenta validar o usuário
    await api.get('/me');
    
    // Se funcionou e ele está tentando ir para o Login, manda pro Dashboard
    if (to.meta.guestOnly) {
      return next('/dashboard');
    }
    next(); // Se ia pro Dashboard e está logado, segue viagem
    
  } catch (error) {
    // 3. Se deu erro (Cookie excluído ou expirado)
    
    // Se a rota que ele quer EXIGE auth, manda pro login
    if (to.meta.requiresAuth) {
      return next('/login');
    }
    
    // Se ele já estava indo pro login e deu erro no /me, deixa ele ir pro login!
    next(); 
  }
});

export default router