<template>
  <div class="container-sidebar">
    <Menu :model="items" >  

     <template #item="{ item, props }">
        <a v-ripple 
            class="flex items-center menu-link-uai" 
            v-bind="props.action">
            <span :class="[item.icon, 'mr-2']" />
            <span class="font-medium">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        </a>
</template>
    
    </Menu>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";

const items = ref([
  {    
    items: [
      { label: 'Home', icon: 'pi pi-home', command: () => router.push('/dashboard') },
      { label: 'Pedidos', icon: 'pi pi-shopping-bag', command: () => router.push('/pedidos') },
      { label: 'Cardapio', icon: 'pi pi-list',command: () => router.push('/cardapio') },
      { label: 'Clientes', icon: 'pi pi-users', command: () => router.push('/clientes')},
      {label: 'Comerciante', icon: 'pi pi pi-shop', command: () => router.push('/comerciante') },
      { label: 'Financeiro', icon: 'pi pi-money-bill', command: () => router.push('/financeiro') },
     
    ]
  }
]);
</script>

<style scoped>
/* 1. O container da sidebar com o Azul Profundo */
.container-sidebar {
    background-color: #002B5C !important;
    height: 100dvw;
    width: 225px;
    position: fixed;
}

/* 2. Forçar o fundo do Menu a ser transparente */
:deep(.p-menu) {
    background: transparent !important;
    border: none;
    padding-top: 1.5rem;
}

/* 3. Estilizar o Link (A mágica acontece aqui) */
:deep(.menu-link-uai) {
    color: #2ecc71 !important; /* VERDE NOS LINKS */
    padding: 0.75rem 1.25rem !important;
    transition: all 0.2s ease;
}

/* 4. Estilizar o Ícone especificamente */
:deep(.menu-link-uai .p-menuitem-icon) {
    color: #2ecc71 !important; /* VERDE NOS ÍCONES */
}

/* 5. Efeito de Hover (Passar o mouse) */
:deep(.menu-link-uai:hover) {
    background-color: rgba(245, 248, 246, 0.1) !important; /* Fundo verde clarinho */
    color: #363636 !important; /* Texto branco no hover para brilhar */
    width: 200px;
}

/* Mira especificamente no span que carrega o ícone dentro do seu link customizado */
:deep(.menu-link-uai .p-menuitem-icon), 
:deep(.menu-link-uai span[class^="pi"]) {
    color: #2ecc71 !important; /* Cor Verde */
    margin-right: 0.5rem;
    display: inline-block; /* Garante que o ícone tenha dimensões */
    font-size: 1.2rem;    /* Ajusta o tamanho se estiver muito pequeno */
}

/* Garante que o ícone mude de cor ou brilhe no hover */
:deep(.menu-link-uai:hover span[class^="pi"]) {
    color: #ffffff !important;
}

</style>