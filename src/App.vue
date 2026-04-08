<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppHeader from './components/AppHeader.vue';
  import { computed, onMounted, ref, watch } from 'vue';
  import api, { loadingCount } from './services/api';
  import AppSidebar from './components/AppSidebar.vue';
  import { useRoute } from 'vue-router';
  import { useToast } from 'primevue/usetoast';

  

  const temToken = ref(false);  
  const route = useRoute();
  const loading = ref(true);
  let userData = ref(null); 
  const toast = useToast();


    const verificarSessao = async () => {
    try {
      // Se a API /me responder 200, significa que o cookie é válido
      const { data } = await api.get('/me', { withCredentials: true });  
      userData.value = data.user || data;
      temToken.value = true; // Mostra os menus

    } catch (error) {      

        temToken.value = false;
        userData.value = null;      
        toast.add({ severity: 'info', summary: 'Info', detail: 'Sessão expirada. È necessário logar novamente.', life: 3500 });

    } finally {
      loading.value = false;
    }
  };

  // Verifica ao carregar o App
  onMounted(() => {
    verificarSessao();
  });

  // Re-verifica quando a rota muda (ex: após login ou logout)
  watch(() => route.path, () => {
    verificarSessao();
  });

  onMounted(async () => {
  try {
    // Adicionamos o await e a configuração de credentials explicitamente
    const { data } = await api.get('/me', { withCredentials: true }); 
    
    // IMPORTANTE: Use .value se userData for um ref()
    userData.value = data.user || data;     

  } catch (error) {
    console.error("Erro 401 ou de conexão:", error);
  } finally {
    loading.value = false;
  }
});
  
</script>

<template>
  <AppHeader v-if="temToken" :user="userData" class="layout-header" />
  <AppSidebar v-if="temToken" class="layout-sidebar" />

  <div v-if="loadingCount > 0" style="
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100vw; 
      height: 100vh; 
      background: rgba(0, 0, 0, 0.5); 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      z-index: 999999;
      color: white;
      /* backdrop-filter: blur(8px); */
    ">
    <div style="text-align: center;">
       <div class="spinner"></div>
       <div style="font-size: 24px; margin-top: 10px; font-family: sans-serif;">Carregando...</div>
    </div>
  </div>

  <div :class="temToken ? 'layout-content-logado' : 'layout-content-deslogado'">
    <router-view />         
  </div>
</template>

<style scoped>
/* Adicione esse spinner para ficar mais profissional */
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>




<style>
/* CSS Global aqui */

body {
  margin: 0;
  font-family: var(--p-family);
  padding: 0;
}

.layout-wrapper {
  display: flex; /* Coloca Sidebar e Main Container lado a lado */
  min-height: 100vh;
  background-color: #f8f9fa; /* Um cinza bem clarinho para o fundo das páginas */
}

.layout-sidebar {
  width: 280px; /* Largura fixa da sua sidebar azul */
  position: relative; /* Deixa ela travada na esquerda */
  height: 100vh;
  z-index: 999;
}

.layout-main-container {
  display: flex;
  flex-direction: column; /* Header em cima, Conteúdo embaixo */
  flex-grow: 1; /* Ocupa todo o resto da tela */
  margin-left: 225px;  /*Empurra o conteúdo para não ficar embaixa da Sidebar */
}

.layout-header {  
  position: relative;
  top: 0;
  z-index: 998;
}

.layout-content-logado {
  padding: 2rem; /* Espaçamento interno para o Dashboard não colar nas bordas */
  flex-grow: 1;
  margin-left: 225px;
}

.layout-content-deslogado {
  padding: 0; /* Espaçamento interno para o Dashboard não colar nas bordas */
  margin: 0;
  flex-grow: 1;
}

@media(max-width: 868px){
  .container-sidebar{
  display: none;
}
.layout-main-container{
  margin-left: 0px; 
}

.layout-content{
  padding: 0.2rem; /* Espaçamento interno para o Dashboard não colar nas bordas */
  flex-grow: 1;

}

.layout-content-logado {
  padding: .5rem; /* Espaçamento interno para o Dashboard não colar nas bordas */
  flex-grow: 1;
  margin-left: 0;
}

}
</style>