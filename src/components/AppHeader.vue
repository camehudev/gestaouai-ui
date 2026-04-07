<script setup lang="ts">
import { onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import Menubar from 'primevue/menubar';
import { uaiService } from '@/services/uaiService';
import { useToast } from "primevue/usetoast";



// Definindo as props com tipos
const props = defineProps<{
  empresaId?: string;
  merchantId?: string;
   user: {
    name: string;
  } | null;
}>();

const router = useRouter();
const toast = useToast();
const menu = ref();

const checkedStatusCaixa = ref(false);
const checkedDelivery = ref(false);
const checkedRetirada = ref(false);

const user = props.user;
const empresaId = sessionStorage.getItem('empresaId') || '';
const merchantId = sessionStorage.getItem('merchantId') || '';

onMounted(async () => { 
   buscarStatusDaAPI(); // Busca o status inicial ao montar o componente
});

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
    
    
  } catch (error:any) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Erro ao deslogar:', life: 1500 });
    console.error('Erro ao deslogar:', error);
    // Mesmo que a API falhe, é prudente mandar o usuário pro login
    router.push('/login');
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
    }
  }
]);



// const propsStatus = defineProps(['empresaId', 'merchantId']);
const isAvailable = ref(false);
const isLoading = ref(true);

const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Status atualizado com sucesso!', life: 1500 });
};



const buscarStatusDaAPI = async () => {
  try {
    const data = await uaiService.getStatus(empresaId, merchantId);    
   
    if(data[0].state){
       checkedStatusCaixa.value = data[0].state? true : false;
       checkedDelivery.value = data[0].state? true : false;
       checkedRetirada.value = data[1].state != 'CLOSED' ? true : false;       
       
    }

     if(data[1].state){
       checkedStatusCaixa.value = data[0].state? true : false;
       checkedDelivery.value = data[0].state? true : false;
       checkedRetirada.value = data[1].state != 'CLOSED' ? true : false;      
    }

  } catch (error) {
    
    checkedStatusCaixa.value = false;
    checkedDelivery.value = false;
      ''
  }
};
    // setInterval(() => {
    //   buscarStatusDaAPI(); // Busca o status a cada 30 segundos
    // }, 10000);  



const updateToogleChek = () => {
  
}

const upStatus= async (event:any) => {
  try {

      // Montamos o objeto exatamente como seu backend/Prisma espera
      const payload = {

            "status": checkedStatusCaixa.value ? "AVAILABLE" : "UNAVAILABLE",
            "operations": [
                {
                    "name": "DELIVERY",
                    "status": checkedStatusCaixa.value ? "AVAILABLE" : "UNAVAILABLE",
                    "estimatedTime": 15
                },
                {
                    "name": "TAKEOUT",
                    "status": checkedRetirada.value ? "AVAILABLE" : "UNAVAILABLE",
                    "estimatedTime": 20
                }
            ]
        
      };     

     const data = await uaiService.updateStatus(empresaId, merchantId, payload);

     if(data.status === 200){      
        showSuccess(); // Exibe o toast de sucesso
        setTimeout(() => {
          router.go(0); // Recarrega a página para refletir as mudanças
        }, 1000); // Aguarda o toast desaparecer antes de recarregar

     } else {
       alert("Erro ao atualizar o status");
     }
    
  } catch (error) {
    
  }
}

// Esta função é disparada sempre que o usuário clica no Toggle
const handleDeliveryChange = async (event:any) => {  

  try {  

      await upStatus(event); // Tenta atualizar o status na API
        setTimeout(() => {
          router.go(0); // Recarrega a página para refletir as mudanças
        }, 1000); // Aguarda o toast desaparecer antes de recarregar

    } catch (error) {
      // Se der erro na API (como o "Wrong segments"), voltamos o switch para false        
      toast.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível abrir o delivery', life: 5000 });
    }
};


</script>

<template>
    <div class="header-uai">
        <Menubar :model="items">

    <template  #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center container-header-link" v-bind="props.action">
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
        </a>
    </template>

    <template #start>
      <div style="display: flex; justify-content: end; align-items: center; width: 80vw;" class="card">
        <span style="color: aliceblue; font-size: 16px;">ESTABELECIMENTO: &nbsp; &nbsp;</span>
       
        <div style="display: flex; justify-content: end; align-items: center; margin-right: 1rem;">
          <ToggleSwitch v-model="checkedStatusCaixa" style="margin-right: .5rem;" @change="handleDeliveryChange" />
            <span style="color: aliceblue;" class="text-xs font-bold uppercase" >
                    {{ checkedStatusCaixa ? 'Aberto' : 'Fechado' }}
                </span>
        </div>

        <div style="display: flex; justify-content: end; align-items: center; margin-right: 1rem;"> 
          <ToggleSwitch v-model="checkedDelivery" style="margin-right: .5rem;" @change="handleDeliveryChange" />
          <span style="color: aliceblue;" class="text-xs font-bold uppercase" >  
            Delivery   
              </span>
        </div>

        <div style="display: flex; justify-content: end; align-items: center; margin-right: 1rem;"> 
          <ToggleSwitch v-model="checkedRetirada" style="margin-right: .5rem;" @change="handleDeliveryChange" />
         <span style="color: aliceblue;" class="text-xs font-bold uppercase" >  
            Retirada   
              </span>
        </div>
         <Toast />
      </div>

    </template>
    <template #end>       
            
        <div class="avatar">           

          <div class="flex flex-column text-right hidden md:block avatar2">
            <span style="color: #2ecc71 ;" class="text-sm opacity-70">Olá, &nbsp;</span>
            <span style="color: #2ecc71 ;" class="font-bold text-900">{{ user?.name || 'Visitante' }}</span>
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

<div>
  <Toast/>
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