<template>
  <div class="pedidos-container p-4">
    <div class="flex justify-content-between align-items-center mb-4">
      <h1 class="text-2xl font-bold text-900 m-0">Painel de Pedidos</h1>
      <!-- <Button label="Novo Pedido" icon="pi pi-plus" class="p-button-success" /> -->
    </div>

    <div class="kanban-wrapper flex gap-3">
      
      <div class="kanban-col flex-1">
        <div class="kanban-header novo">
          <span class="font-bold">NOVO PEDIDO</span>
          <Badge value="3" severity="info"></Badge>
        </div>
        <div class="kanban-content flex flex-column gap-3">
          <div class="pedido-card shadow-1">
            <div class="flex justify-content-between mb-2">
              <span class="font-bold">#1025</span>
              <span class="text-sm text-500">10:30</span>
            </div>
            <div class="text-sm font-medium mb-2">João Silva</div>
            <div class="text-xs text-600 mb-3">1x Pizza Calabresa, 1x Coca-Cola</div>
            <div style="margin-top: 1rem;"><Button label="Ver detalhes" icon="" class="p-button-sm p-mt-6 w-full" @click="openPosition('top')" /></div>
          </div>
        </div>
      </div>

      <div class="kanban-col flex-1">
        <div class="kanban-header preparacao">
          <span class="font-bold">EM PREPARAÇÃO</span>
          <Badge value="2" severity="warning"></Badge>
        </div>
        <div class="kanban-content flex flex-column gap-3">
          <div class="pedido-card shadow-1 border-left-3 border-orange-500">
            <div class="flex justify-content-between mb-2">
              <span class="font-bold">#1025</span>
              <span class="text-sm text-500">10:30</span>
            </div>
            <div class="text-sm font-medium mb-2">João Silva</div>
            <div class="text-xs text-600 mb-3">1x Pizza Calabresa, 1x Coca-Cola</div>
              <div style="margin-top: 1rem;">
                 <Button label="Pedido pronto" icon="" class="p-button-sm p-mt-6 w-full" @click="pedidoPronto('top')" />
              </div>
          </div>
        </div>
      </div>

      <div class="kanban-col flex-1">
        <div class="kanban-header entrega">
          <span class="font-bold">SAIU PARA ENTREGA</span>
          <Badge value="1" severity="success"></Badge>
        </div>
        <div class="kanban-content flex flex-column gap-3">
           <div class="pedido-card shadow-1 border-left-3 border-green-500">
             <div class="flex justify-content-between mb-2">
              <span class="font-bold">#1020</span>
              <span class="text-sm text-500">09:50</span>
            </div>
            <div class="text-sm font-medium">Entregador: Marcos</div>
            <div class="text-xs mt-2 italic text-600">Destino: Rua das Flores, 123</div>
            <div style="margin-top: 1rem;">
               <Button label="Confirmar entrega" icon="" class="p-button-sm p-mt-6 w-full" @click="pedidoEntregue('top')" />
            </div>
          </div>
          
        </div>
      </div>

      <div class="kanban-col flex-1">
      <div class="kanban-header cancelado">
      <span class="font-bold uppercase text-sm">Pedidos Cancelados</span>
      <Badge value="1" severity="danger"></Badge>
      </div>

      <div class="kanban-content flex flex-column gap-3">
      <div class="pedido-card shadow-1 border-left-3 border-red-500 opacity-80">
        <div class="flex justify-content-between mb-2">
          <span class="font-bold text-700">#1020</span>
          <span class="text-xs text-500">Cancelado às 10:15</span>
        </div>
        
        <div class="text-sm font-medium text-800 mb-1">Cliente: Marcos Silva</div>
        
        <div class="text-xs p-1 bg-red-50 text-red-600 border-round">
          <i class="pi pi-times-circle mr-1"></i>
          <span>Motivo: Item indisponível</span>
        </div>
      </div>
      </div>
      </div>

    </div>
  </div>

  <div class="card flex justify-center">
        <Button label="Show" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Detalhes do Pedido: " :style="{ width: '50vw' }" :breakpoints="{ '1199px': '30vw', '575px': '50vw' }">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <footer style="display: flex; justify-content: center;">
              <Button style="margin: .5rem;" label="Rejeitar" severity="secondary" @click="confirm2()" />              
              <Button style="margin: .5rem;" label="Aceitar" severity="success" />
            </footer>            
        </Dialog>

        
    </div>   

      <Toast />
      <ConfirmDialog></ConfirmDialog>
    </template> 

<script setup>
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
// Importações de componentes para garantir que o script os reconheça se não forem globais
import ConfirmDialog from 'primevue/confirmdialog'; 
import Toast from 'primevue/toast';

const confirm = useConfirm();
const toast = useToast();

const visible = ref(false);
const  visiblePedidoPronto = ref(false);

const confirm1 = () => {    
    confirm.require({
        message: 'Tem certeza que deseja informar que o pedido está pronto?',
        header: 'Confirmação de Produção',
        icon: 'pi pi-check-circle',
        acceptLabel: 'Sim, está pronto',
        rejectLabel: 'Cancelar',
        // Removi o rejectLabel: 'Sim' que estava duplicado e confuso no seu código
        acceptProps: {
            severity: 'success'
        },
        rejectProps: {
            severity: 'secondary',
            outlined: true
        },
        accept: () => {
            toast.add({ 
              severity: 'success', 
              summary: 'Pronto!', 
              detail: 'O status do pedido foi atualizado.', 
              life: 3000 
            });
        }
    });
};

const confirm2 = () => {
    visible.value = false; // Fecha o modal de detalhes antes de abrir a confirmação
    
    confirm.require({
        message: 'Tem certeza que deseja rejeitar este pedido?',
        header: 'Atenção!!!',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Rejeitar',
        rejectLabel: 'Cancelar',
        acceptProps: {
            severity: 'danger'
        },
        accept: () => {
            toast.add({ 
              severity: 'success', 
              summary: 'Sucesso', 
              detail: 'Pedido rejeitado com sucesso', 
              life: 3000 
            });
        },
        reject: () => {
            // Ação opcional ao cancelar
        }
    });
};

const confirm3 = () => {    
    confirm.require({
        message: 'Tem certeza que deseja informar a entrega?',
        header: 'Confirmação de Entrega ',
        icon: 'pi pi-check-circle',
        acceptLabel: 'Sim, Produto Entregue',
        rejectLabel: 'Cancelar',
        // Removi o rejectLabel: 'Sim' que estava duplicado e confuso no seu código
        acceptProps: {
            severity: 'success'
        },
        rejectProps: {
            severity: 'secondary',
            outlined: true
        },
        accept: () => {
            toast.add({ 
              severity: 'success', 
              summary: 'Pronto!', 
              detail: 'Entrega confirmada com sucesso.', 
              life: 3000 
            });
        }
    });
};

const openPosition = () => {
    visible.value = true;
}

const pedidoPronto = (pos) => {
    // Se você quiser usar a posição 'top', 'center' etc, precisaria passar para o confirm
    // Mas para o básico funcionar:
    confirm1();
}
const pedidoEntregue = (pos) => {
    // Se você quiser usar a posição 'top', 'center' etc, precisaria passar para o confirm
    // Mas para o básico funcionar:
    confirm3();
}


</script>

<style scoped>
.kanban-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 150px);
  /* Permite scroll horizontal se as colunas não couberem */
  overflow-x: auto; 
 padding: 1rem;
}

.kanban-col {
  background-color: #f1f5f9;
  border-radius: 12px;
  min-width: 350px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  max-height: auto;
  margin: 1rem;
}

.kanban-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px 12px 0 0;
  color: white;
}

/* Cores das Raias */
.kanban-header.novo { background-color: #002B5C; } /* Azul Profundo */
.kanban-header.preparacao { background-color: #f39c12; }
.kanban-header.entrega { background-color: #2ecc71; } /* Verde UAI */
.kanban-header.cancelado { 
    background-color: #64748b; /* Um cinza ardósia elegante */
}

.kanban-content {
  padding: 1rem;
  overflow-y: auto; /* Scroll vertical se houver muitos cards */
}

.pedido-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.pedido-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* Customização de botões do PrimeVue para ficarem menores */
:deep(.p-button-sm) {
  font-size: 0.8rem;
  padding: 0.4rem;
}

@media(max-width:868px){
  .kanban-wrapper{
    display:inline-block;
  }

.layout-content-logado {
    padding: 2rem;
    flex-grow: 1;
    /* margin-left: 225px; */
}


}
</style>