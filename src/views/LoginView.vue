<template>
  <div class="login-container">
    <Card style="width: 25rem; overflow: hidden">
      <template #title>Bem Vindo ao GESTÃO UAI</template>
      <template #subtitle>A Batuta para seu negocio</template>
      
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
          <Button label="Entrar" class="w-full" @click="handleLogin" :loading="loading"/>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const email = ref('');
const password = ref('');
const loading = ref(false);

const handleLogin = () => {
  loading.value = true;
  console.log('Tentando logar com:', email.value);
  // Aqui chamaremos sua API Node.js depois!
  setTimeout(() => loading.value = false, 1500);
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
 
}

.align-text, .align-button{
    text-align: justify;
    padding-top: 1rem;

}

.flex-column { display: flex; flex-direction: column; }
.gap-3 { gap: 1rem; }
.gap-2 { gap: 0.5rem; }
.w-full { width: 100%; }
</style>