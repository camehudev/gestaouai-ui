<template>
  <Toast />
  <RouterView />
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Toast from 'primevue/toast';
  
</script>

<style>
/* CSS Global aqui */
body {
  margin: 0;
  font-family: var(--p-family);
}
</style>