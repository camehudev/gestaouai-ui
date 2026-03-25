
<template>
  <div class="layout-wrapper">
     <div class="layout-main-container">
        <AppHeader :user="userData" class="layout-header" />

        <div class="layout-content">
          <router-view /> 
          <Toast />
        </div>
    </div>

    <AppSidebar class="layout-sidebar" />

   
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Toast from 'primevue/toast';
  import AppHeader from './components/AppHeader.vue';
import { onMounted, ref } from 'vue';
import api from './services/api';
import AppSidebar from './components/AppSidebar.vue';

  const loading = ref(true);
  let userData = ref(null);

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

.layout-content {
  padding: 2rem; /* Espaçamento interno para o Dashboard não colar nas bordas */
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

}
</style>