<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import api from '@/services/api';
import Menubar from 'primevue/menubar';

const router = useRouter();
const toast = useToast();
const menu = ref();
const menuHeader = ref(false);

// Não importe o defineProps! Use-o diretamente:
const props = defineProps<{
  user: {
    name: string;
  } | null
}>();

const user = props


// Configuração do Menu Suspenso
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-user',
    command: () => router.push('/dashboard')
  },
  {
    separator: true
  },
  {
    label: 'Usuarios',
    icon: 'pi pi-sign-out',
    class: 'text-red-500', 
  },
]);

const handleLogout = async () => {
  try {
    // 1. Avisa o servidor para matar o cookie
    await api.post('/logout');

     toast.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: 'Logout feito com sucesso! ', 
      life: 1200
    });
    
    // 2. Redireciona para o login
    // Como o cookie sumiu, o router.beforeEach vai barrar qualquer tentativa de voltar
    setTimeout(()=>{
      router.push('/login');
    })
    
    
  } catch (error) {
    console.error('Erro ao deslogar:', error);
    // Mesmo que a API falhe, é prudente mandar o usuário pro login
    // router.push('/login');
  }
};

// Função para abrir/fechar o menu
const toggleMenu = (event: Event) => {
  menu.value.toggle(event);
};
// Itens do Menu
const menuItems = ref([
  {
    label: 'Perfil',
    icon: 'pi pi-user',
    command: () => router.push('/profile')
  },
  {
    label: 'Configurações',
    icon: 'pi pi-cog',
    command: () => router.push('/settings')
  },
  {
    separator: true // Linha divisória
  },
  {
    label: 'Sair',
    icon: 'pi pi-sign-out',
    class: 'text-red-500', // Deixa o texto vermelho (se usar PrimeFlex)
    command: async () => {
        handleLogout();
    //   await api.post('/logout');
    //   router.push('/login');
    }
  }
]);

</script>

<template>
    <div class="header-uai">
        <Menubar :model="items">
    <template #start>       
        <!-- <div class="flex">
        <img 
            src="@/assets/logo_azul-profundo.png" 
            style="height: 80px; width: auto;" 
            class="" 
        />       
    </div> -->

    </template>
    <template  #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center container-header-link" v-bind="props.action">
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
        </a>
    </template>
    <template #end>  
            
        <div class="avatar">
          <div class="flex flex-column text-right hidden md:block avatar2">
            <span style="color: #2ecc71 ;" class="text-sm opacity-70">Olá, &nbsp;</span>
            <span style="color: #2ecc71 ;" class="font-bold text-900">{{ user?.user?.name || 'Visitante' }}</span>
          </div>

          <div class="">
            <Avatar 
                image="/src/assets/homem.png" 
                shape="circle" 
                size="large"
                class="cursor-pointer hover:shadow-2 transition-duration-200"
                @click="toggleMenu" 
                aria-haspopup="true" 
                aria-controls="overlay_menu"
                style="height: 30px; width: auto;"
            />
          </div>

          <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true"/>

        </div>
    </template>
</Menubar>
</div>
</template>

<style scoped>
.header-container {
  height: 70px;
}
.avatar{
    display: flex;
    gap: 3;
    align-items: center;
    margin-right: 1rem;
    cursor: pointer;
  }
  .avatar2{
    padding-right: 1rem;
    padding-left: 1rem;
    cursor: pointer;
  }


/* 1. Fundo Azul Profundo para o container do cabeçalho */
.header-uai {
    background-color: #002B5C !important;
    width: 100%;

}

/* 2. Tornar o Menubar transparente para herdar o azul */
:deep(.p-menubar) {
    background-color: transparent !important;
    border: none !important;
    padding: 0.5rem 1rem;
}

/* 3. Estilo Verde para os Links do Menu */
:deep(.container-header-link) {
    color: #2ecc71 !important; /* VERDE GESTÃO UAI */
    transition: all 0.2s;
}

/* Hover nos links: fundo sutil e texto branco */
:deep(.container-header-link:hover) {
    background-color: rgba(46, 204, 113, 0.1) !important;
    color: #ffffff !important;
}

/* 4. Estilo Verde para o texto de Bem-vindo */
.text-verde {
    color: #2ecc71;
}

/* Ajuste para o texto dentro do link (Label) */
:deep(.p-menuitem-text) {
    color: inherit !important; /* Herda o verde do container-header-link */
}

/* Estilo para ícones do submenu (setinhas) */
:deep(.pi-angle-down), :deep(.pi-angle-right) {
    color: #2ecc71 !important;
}

:deep(.p-menubar-mobile .p-menubar-button) {
    display: none !important;
    color: #ffffff !important;
  }

:deep(.p-menubar-root-list ){
  display: none !important;
}

:deep(.p-avatar-lg){
  background-color: aliceblue;
}

  :deep(.p-menubar-start) {
      display: flex;
    
}

  @media(max-width: 868px){ 
    :deep(.p-menubar-mobile .p-menubar-button) {
    display: inline-block !important;
    color: #ffffff !important;
  }





  }
  
</style>