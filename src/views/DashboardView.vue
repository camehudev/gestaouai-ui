<script setup lang="ts">
import { useRouter } from 'vue-router';
import api from '@/services/api';
import { useToast } from "primevue/usetoast"; // Importe o HOOK, não o componente
import { ref, onMounted } from 'vue';
import AppHeader from '../components/AppHeader.vue'

const router = useRouter();
const toast = useToast(); // Inicialize o serviço



let userData = ref(null);
const loading = ref(true);

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

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home'
    }])

</script>


<template>
  <AppHeader :user="userData" />

</template>



