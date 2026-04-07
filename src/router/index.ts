import { createRouter, createWebHistory } from 'vue-router'
import api from '@/services/api' // Sua instância do Axios

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('@/views/LoginView.vue'), meta: { guestOnly: true, hideMenus: true },  },
    { path: '/dashboard', component: () => import('@/views/DashboardView.vue'), meta: { requiresAuth: true, hideMenus: true } },
    {path: '/pedidos', component: ()=> import('@/views/PedidosView.vue'),meta: {requireAuth: true}},
    {path: '/cardapio', component: ()=> import('@/views/CardapioView.vue'),meta: {requireAuth: true}},
    {path: '/comerciante', component: ()=> import('@/views/ComercianteView.vue'),meta: {requireAuth: true}},
    {path: '/clientes', component: ()=> import('@/views/ClienteView.vue'),meta: {requireAuth: true}},
    {path: '/Financeiro', component: ()=> import('@/views/FinanceiroView.vue'),meta: {requireAuth: true}}
  ]
})

router.beforeEach(async (to, from, next) => {
  // 1. Rota pública e que não é restrita a visitantes? Passa direto.
  if (!to.meta.requiresAuth && !to.meta.guestOnly) {
    return next();
  }

  try {
    // 2. Valida a sessão no Backend
    // Se o cookie de 6 horas expirou, esta chamada retornará erro (401)
    await api.get('/me');
    
    // Se o usuário está logado e tenta ir para o Login, manda para o Dashboard/Pedidos
    if (to.meta.guestOnly) {
      return next('/pedidos'); // Mudei para /pedidos pois parece ser sua tela principal
    }
    
    next(); 
    
  } 
  catch (error) {
    // 3. O Cookie expirou ou o usuário não está autenticado
    
    // Limpa os dados de sessão para não sobrar "lixo" no navegador
    sessionStorage.clear(); 
    localStorage.removeItem('user'); // Se você usar localStorage também

    // Se a rota exige login, redireciona
    if (to.meta.requiresAuth) {
      // Opcional: Adicionar um alerta ou toast informando "Sessão expirada"
      return next('/login');
    }
    
    // Se era guestOnly (como o próprio Login), permite o acesso
    next(); 
  }
});

export default router