<template>
  <div v-if="showMessage" class="card">
        <Message size="large"  severity="error" class="msg-pulsante"> 
        <i class="pi pi-shopping-cart" style="font-size: 2rem">&nbsp; Oba! Você tem um novo pedido!</i>
           </Message> 
            
  </div>

  <div class="pedidos-container p-4">
    <div class="flex justify-content-between align-items-center mb-4">
      <h1 class="text-2xl font-bold text-900 m-0">Painel de Pedidos</h1>   
     </div>
     <div>
      <audio id="meuSom">
        <source src="../assets/sounds/notificacao.mp3" type="audio/mpeg">
      </audio>
     </div>   

    <div class="kanban-wrapper flex">      
      <div class="kanban-col flex-1">
        <div class="kanban-header novo">
          <span class="font-bold">NOVO PEDIDO</span>
          <Badge :value="pedidosRecebidos" severity="info"></Badge>
        </div>
       <div class="kanban-content flex flex-column">
            <div 
              v-for="pedido in novosPedidos" 
              :key="pedido.id" 
              class="pedido-card shadow-1"
            >
              <div class="flex flex-column mb-2">
                <span class="font-bold mb-1"><strong>Pedido: {{ pedido.displayId }}</strong></span><br>
                <span class="text-sm text-500 mb-1"><strong>Data: &nbsp;</strong>{{ formatarDataBR(pedido.createdAt) }} as {{formatarHoraBR(pedido.createdAt) }}</span>
              </div>
              
              <!-- <div class="text-sm font-medium mb-2"><strong>Cliente:</strong> {{ pedido.customer.name }}</div> -->
              
              <!-- <div class="text-xs text-600 mb-3">
                {{ pedido.itensResumo }}
              </div> -->

              <div style="margin-top: 1rem;">
                <Button 
                  label="Ver detalhes" 
                  class="p-button-sm w-full" 
                  @click="abrirDetalhes(pedido)" 
                />
                
              </div>              
              
            </div>
          </div>
          <div v-if="nenhumPedido" class="flex flex-column align-items-center gap-3 mt-5" style="padding-bottom: 2rem;">
            <i class="pi pi-info-circle text-4xl text-500"></i>
            <span class="text-lg text-500 ">&nbsp; Nenhum pedido novo no momento.</span>   
                 
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

      <Toast />
      <ConfirmDialog></ConfirmDialog>

      <div class="card flex justify-center">        
                <Dialog v-model:visible="visibleDialogPedidos" modal header="Detalhes do Pedido" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '30vw', '575px': '50vw' }">
                    <!-- <p class="m-0">
                      <span><strong>Pedido:</strong> #{{ pedidoSelecionado }}</span> <br>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    
                      </p> -->
                      <div><strong>Pedido:</strong><span> &nbsp;#{{pedidoSelecionado}}</span></div>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; margin-bottom: 1.5rem;">                      
                        <div class="bg-blue-500 p-4"> 
                          <span><Badge :value="detalhesDoPedido?.orderType=== 'TAKEOUT'?'RETIRADA':'DELIVERY'" severity="info"></Badge></span>&nbsp;
                          <span>{{ formatarDataBR(detalhesDoPedido?.createdAt) }} - {{ formatarHoraBR(detalhesDoPedido?.createdAt) }} </span>
                         
                        </div>
                        <div class="bg-red-500 p-4">
                          <Button icon="pi pi-print" severity="secondary" outlined />
                        </div>                                               
                      </div>

                      <div style="border: 1px; border: 1px solid; border-radius: 5px; padding:1rem;"> 
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid; padding-bottom: 1rem; margin-bottom: 1.5rem;">
                          <div class="font-bold">Descrição</div>
                          <div>qtd</div>
                          <div class="font-bold">Itens</div>
                        </div>                       

                        <div >
                          <div v-for="item in detalhesDoPedido?.itens" :key="item.id">
                              <!-- DESCRIÇÃO -->
                              <div style="display: flex; justify-content: space-between;">
                                  <div style="margin-left: 0; width: 35%;">
                                    <span>{{ item?.name }}</span><br>
                                    <span style="font-size: 12px;">{{ item?.description }}</span><br>
                                    <span style="font-size: 14px;" >{{item?.options?.[0].name}}</span>
                                  </div> 
                              
                              <!-- QUANTIDADE -->
                              <div style="text-align: center; width: 30%;">
                                
                                  {{ item?.quantity }}
                               
                              </div>

                              <div style="text-align: end; width: 30%;">
                               
                                  {{ item?.options?.[0]?.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
                                
                              </div>                            
                            
                            </div>                             
                                
                            </div>                         
                            
                        </div>
                        </div>
                  
                       <!-- METODOS DE PAGAMENTO -->

                       <div style="border-radius: 5px; border: 1px solid; margin-top: 1rem; padding: 1rem;">
                          <div style=" display: flex; justify-content: space-between;" v-for="pagamento in detalhesDoPedido?.payments?.methods " >                          
                            <div style="margin-bottom: 5px;">Forma de pagamento:</div>
                            <div>{{ traduzirMetodoPagamento(pagamento?.method)}}</div>                       
                          </div> 

                          <div v-for="pagamento in detalhesDoPedido?.payments?.methods " >  
                            <div v-if="pagamento?.method === 'CASH'" style="display: flex; justify-content: space-between; margin-bottom: 1px;">                        
                              <div >Precisa de troco:</div>
                              <div>{{ pagamento.card?.brand ? pagamento.card?.brand?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 'R$ 0.00' }}</div> 
                            </div> 
                            

                                         
                          </div> 
                        </div>

                      <div style="border-radius: 5px; border: 1px solid; margin-top: 1rem; padding: 1rem;">
                                                                       
                        <div style="display: flex; justify-content: space-between; margin-top: 3px;">
                            <div>SubTotal: </div>
                            <div>{{ detalhesDoPedido?.total?.subTotal?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}} </div>
                          </div>

                          <div style="display: flex; justify-content: space-between; margin-top: 3px;">
                            <div>Taxa de entrega: </div>
                            <div>{{ detalhesDoPedido?.total?.deliveryFee?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }} </div>
                          </div>

                          <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                            <div>Total: </div>
                            <div>{{ detalhesDoPedido?.total?.orderAmount?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}</div>
                          </div>
                      </div>

                       <!-- DADOS DO CLIETNE -->
                      <div style="border-radius: 5px; border: 1px solid; margin-top: 1rem; padding: 1rem;">
                        <div>Cliente:&nbsp;{{ detalhesDoPedido?.customer?.name }}</div><br>
                        <div style="margin-top: 1px;">Telefone:&nbsp;{{ detalhesDoPedido?.customer?.phone?.number }}</div>
                       
                      </div>

                    <footer style="display: flex; justify-content: center;">
                      <Button style="margin: .5rem;" label="Rejeitar" severity="secondary" @click="getConfirmPedidos(idDoPedido.value)" />              
                      <Button style="margin: .5rem;" label="Aceitar" severity="success" @click="getConfirmPedidos(pedidoSelecionado)" />
                    </footer>            
                </Dialog>        
              </div> 
     
    </template> 

<script setup>
import { ref, onMounted, watch ,onBeforeUnmount} from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import { pedidoService } from '@/services/pedidoService';

// Importações de componentes para garantir que o script os reconheça se não forem globais
import ConfirmDialog from 'primevue/confirmdialog'; 
import Toast from 'primevue/toast';
import { Pedido } from '../../../API/src/core/entities/Pedidos';
import { uaiService } from "@/services/uaiService";
import { Pagamento } from '../../../API/src/core/entities/Pagamentos';

const confirm = useConfirm();
const toast = useToast();
const pedidosRecebidos = ref(0);
const showMessage = ref(false);
const visibleDialogPedidos = ref(false);
const nenhumPedido = ref(false);
const idPedido = ref(null);
const idDoPedido = ref(null);
const idPedidoAck = ref(null);
const numPedidoDisplay= ref(null);
const detalhesDoPedido=ref({})

const visible = ref(false);
const  visiblePedidoPronto = ref(false);
const pedidoSelecionado = ref(null); // Variável para guardar o pedido clicado
const typeFPayments = ref(['Dinheiro', 'Cartão de Credito', 'Cartão de Debito', 'Pagamento Online'])

const pedidos = ref([]);
const novosPedidos = ref([]);
const isLoading = ref(true);
const { showToast } = useToast();

// Começa como 'true' por padrão
const isSoundEnabled = ref(true);

let intervalId = null;


const carregarDetalhesDoPedido = async (idPedido) => {
  try {
   
    // Chamada ao novo serviço
    const dadosCompletos = await pedidoService.buscarDetalhesUaiRango(idPedido);  
    const dadosPedidos={
      createdAt:dadosCompletos?.createdAt,
      orderType: dadosCompletos?.orderType,
      itens:dadosCompletos?.items,
      payments:dadosCompletos?.payments, 
      total:dadosCompletos?.total,
      customer:dadosCompletos?.customer, 
    }

    detalhesDoPedido.value = dadosPedidos;
   
    pedidoSelecionado.value = dadosCompletos.displayId; // Salva o pedido clicado       
    console.log(dadosCompletos?.total)
    

  } catch (error) {

    toast.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar os detalhes do pedido.', life: 3000 });

  }
  
}

const traduzirMetodoPagamento = (method) => {
  switch (method) {
    case 'CASH':
      return 'Dinheiro';
    case 'CARD':
      return 'Cartão na Entrega';
    case 'ONLINE':
      return 'Pago pelo App';
    case 'PIX':
      return 'Pix';
    case 'DEBIT_CARD':
      return 'Cartão de Débito';
    case 'CREDIT_CARD':
      return 'Cartão de Crédito';
      
    default:
      return method; // Caso venha algo novo, ele mostra o código original
  }
};


const getConfirmPedidos = async (idPedido) => {
 const tenantId = sessionStorage.getItem('empresaId');
  
  // Transformamos o ID único em um Array, pois a API da UaiRango espera uma lista
  const payload = [idDoPedido.value]; 

  try {
    // Agora o uaiService.confirmarProcessamentoPelaRota EXISTE!
    const data = await uaiService.confirmarProcessamentoPelaRota(tenantId, payload);
   
    if (data.sucesso) {
      toast.add({ severity: 'success', summary: 'Sucesso', detail: data.mensagem, life: 3000 });
      visibleDialogPedidos.value = false;    
      
      // RECARREGA A LISTA: Importantíssimo para o pedido sair da coluna "Novo"
      await carregarPedidos(); 
    }
  } catch (error) {
    console.error("Erro ao confirmar:", error);
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao comunicar com o servidor.', life: 3000 });
  }
};

const abrirDetalhes = (pedido) => {
  visibleDialogPedidos.value = true; // Fecha o modal antes de abrir um novo, se já estiver aberto   
  numPedidoDisplay.value = pedido.orderId; // Salva o displayId para mostrar no modal
  idDoPedido.value = pedido.id; // Salva o ID do pedido para usar na confirmação
  carregarDetalhesDoPedido(numPedidoDisplay.value); // Carrega os detalhes do pedido mais recente
  };

const formatarDataBR = (dataISO) => {
  if (!dataISO) return '';
  const data = new Date(dataISO);
  // Usamos as partes UTC para montar a string manualmente
  const dia = String(data.getUTCDate()).padStart(2, '0');
  const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
  const ano = data.getUTCFullYear();
  return `${dia}/${mes}/${ano}`;
};

const formatarHoraBR = (dataISO) => {
  if (!dataISO) return '';
  const data = new Date(dataISO);
  // Pega a hora e minuto sem aplicar o fuso horário local
  const hora = String(data.getUTCHours()).padStart(2, '0');
  const minutos = String(data.getUTCMinutes()).padStart(2, '0');
  return `${hora}:${minutos}`;
};

const toggleSound = () => {
  isSoundEnabled.value = !isSoundEnabled.value;
  
};

// Monitora a lista de pedidos
watch(pedidos, (newRows, oldRows) => {
  // Se o número de pedidos aumentou, avisamos!
  if (newRows.length > oldRows.length && oldRows.length > 0) {
    playNotificationSound();   
    toast.add({ severity: 'info', summary: 'Novo Pedido', detail: 'Oba! Um novo pedido foi recebido.', life: 3000 });
  }
}, { deep: true });


const playNotificationSound = () => {  

  try {
 
     const audio = document.getElementById('meuSom');
     audio.play();

    console.log("Som tocado com sucesso!");
    
  } catch (error) {
    console.warn("Áudio bloqueado ou erro na reprodução:", error.message);
  }
};

const carregarPedidos = async () => {
  const tenantId = sessionStorage.getItem('empresaId');

  try {
    const data = await pedidoService.getPedidosByTenant(tenantId); 
    idPedido.value = data?.pedidos?.[0]?.id || null; // Atualiza o ID do pedido para o mais recente ou null se não houver pedidos  
    novosPedidos.value = data?.pedidos || [];
   
   
    if(!data?.pedidos){
      showMessage.value = false;
    } 
    
    if(data.recebidos >= 1){
      pedidosRecebidos.value = data.pedidos.length || 0; // Garante que seja 0 se vier null/undefined
      showMessage.value = true;
      nenhumPedido.value = false;
      playNotificationSound();
     
     
    } else {
      showMessage.value = false;
      nenhumPedido.value = true;
      pedidosRecebidos.value = 0;
    }       

  } catch (error) {
    console.error(error);
    toast.add({ 
      severity: 'error', 
      summary: 'Erro', 
      detail: `Falha ao sincronizar pedidos. - ${error.message}`, 
      life: 3000 
    });
  } 
};
// Limpar o intervalo quando sair da página para não gastar memória
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

 // Executa assim que o componente é montado no DOM
onMounted(() => {
  // 1. Executa a primeira carga assim que abrir a tela
  carregarPedidos();

  // 2. Configura o intervalo para repetir a carga
  // Note que o "intervalId =" está dentro da função agora
  intervalId = setInterval(() => {
       carregarPedidos();
  }, 30000);
});

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
  /* justify-content: center; */
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

/* Definindo a animação */
@keyframes pulsar {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(236, 96, 108, 0.4); /* Cor opcional para o brilho */
  }
  70% {
    transform: scale(1.02);
      box-shadow: 0 0 0 0 rgba(236, 96, 108, 0.4); /* Cor opcional para o brilho */
  }
  100% {
    transform: scale(1);
      box-shadow: 0 0 0 0 rgba(236, 96, 108, 0.4); /* Cor opcional para o brilho */
  }
}

/* Criando a classe que aplica a animação */
.msg-pulsante {
  animation: pulsar 1s infinite ease-in-out;
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

.displayPedido{
  display: flex;
  background-color: #2ecc71;
}

}
</style>