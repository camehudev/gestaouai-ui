<template>
  <div class="login-container">
    <div class="lado-esquerdo">
      <Card style="width: 25rem; padding: 1rem; overflow: hidden; border-radius: 5px;background-color: #F6F6F6;">
        <template #title>Bem Vindo!</template>
        <!-- <template #subtitle>A Batuta para seu negocio</template> -->
        
        <template #content>
          <div class="flex flex-column gap-3 align-text">
            <div class="flex flex-column text-left gap-2">
              <label for="username">Email</label>
              <InputText id="username" v-model="email" aria-describedby="username-help" size="large" fluid />            
            </div>
            
            <div class="flex flex-column text-align-justify gap-2">
              <label for="password">Senha</label>
              <Password class="text-left" id="password" size="large" v-model="password" :feedback="false" fluid/>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex gap-3 mt-1 align-button">
            <Button label="Entrar" class="w-full" @click="handleLogin()" :loading="loading"/>
          </div>
        </template>
      </Card>

    </div>

    <div class="lado-direito">
   
        <img 
          src="@/assets/logo-uai-transparente.png"    
          style="height: 500px; width: auto;"      
          
        />     
            
    </div>
    
  </div>  

  <div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import api from '@/services/api'; // Importa a nossa config
import { useToast } from 'primevue/usetoast'; // 1. Importe o hook
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loading = ref(false);
const toast = useToast(); // 2. Inicialize a constante toast
const router = useRouter();

const handleLogin = async () => {
  console.log(email.value)
  if (!email.value || !password.value){
     return toast.add({ 
      severity: 'error', 
      summary: 'Falha no Login', 
      detail: 'campos email e senha devem ser preenchidos! ', 
      life: 1500
    });
  } ;

  loading.value = true;
  
  try {
    const { data } = await api.post('/login', {
      email: email.value,
      password: password.value
    });

    sessionStorage.setItem('empresa', data.user.empresaId);
    sessionStorage.setItem('merchant', data.user.uaiMerchantId);
    sessionStorage.setItem('role', data.user.role);
    

    toast.add({ 
      severity: 'success', 
      summary: 'Success!', 
      detail: 'Login feito com sucesso! ', 
      life: 1000
    });


    // Se chegou aqui, sucesso!
    setTimeout(()=>{
      router.push('/dashboard');
    },1000)
    

  } catch (error: any) {
    // Pegamos a mensagem do backend ou uma padrão
    const errorMsg = error.response?.data?.error || 'Erro inesperado ao fazer login';
    
    toast.add({ 
      severity: 'error', 
      summary: 'Falha no Login', 
      detail: errorMsg, 
      life: 3000 
    });
  } finally {
    // O finally garante que o loading pare independente de erro ou sucesso
    loading.value = false;
  }
};



</script>

<style scoped>
.login-container {  
  display: flex;
  height: 100vh; /* Altura total da tela */ 
  
}

.lado-esquerdo {
  flex: 1; /* Ocupa 50% do pai */
   background-color: #002b5c; 
  
  /* Ativa o alinhamento interno */
  display: flex; 
  flex-direction: column; /* Garante que o logo fique em cima do texto */
  justify-content: center; /* Centraliza verticalmente */
  align-items: center;     /* Centraliza horizontalmente */ 
 
  height: 100vh; /* Garante que ele tenha altura para centralizar */
}

.lado-direito {
  flex: 1; /* Ocupa os outros 50% */
 
 
  color: white; /* Cor do texto padrão */
  
  /* Ativa o alinhamento interno */
  display: flex; 
  flex-direction: column; /* Caso queira texto abaixo do logo */
  justify-content: center; /* Centraliza verticalmente */
  align-items: center;     /* Centraliza horizontalmente */
  background-color: #F6F6F6;
   
  height: 100vh; /* Garante que ele tenha altura para centralizar */
}

.align-text, .align-button{
    text-align: justify;
    padding-top: 1rem;

}

.flex-column { display: flex; flex-direction: column; }
.gap-3 { gap: 1rem; }
.gap-2 { gap: 0.5rem; }
.w-full { width: 100%; }

@media (max-width: 868px) {
  .lado-direito{
    display: none;}
  
}
</style>