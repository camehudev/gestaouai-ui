<script setup lang="ts">
import { ref, onMounted } from 'vue'; // <--- ESSENCIAL
import SelectButton from 'primevue/selectbutton'

// Definindo o valor inicial (deve ser um dos objetos da lista de opções)
const opcoesPeriodo = ref([
    { label: 'Hoje', value: 'hoje' },
    { label: '7 Dias', value: '7d' },
    { label: 'Este Mês', value: 'mes' }
]);

const periodoSelecionado = ref(opcoesPeriodo.value[0]); // Começa com 'Hoje'



const chartData = ref();
const chartOptions = ref();

onMounted(() => {
    chartData.value = {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [
            {
                label: 'Vendas (R$)',
                data: [500, 5200, 4800, 1200, 6500, 8900, 9500],
                fill: true, // Preenche a área abaixo da linha
                borderColor: '#2ecc71', // Seu Verde UAI
                backgroundColor: 'rgba(46, 204, 113, 0.1)', // Verde transparente
                tension: 0.4, // Deixa a linha curva (suave)
                pointRadius: 5,
                pointBackgroundColor: '#2ecc71'
            }
        ]
    };

   chartOptions.value = {
    responsive: true,           // O gráfico se ajusta ao container
    maintainAspectRatio: false, // Permite que ele mude a proporção em telas pequenas
    plugins: {
        legend: { display: false }
    },
    scales: {
        x: {
            ticks: {
                maxRotation: 45, // Rotaciona as datas se a tela for pequena
                minRotation: 45
            }
        }
    }
    };
});
</script>

<template>
    <div class="flex container-card p-4">
  
          <div class="container-filtro">
              <div style="margin: 1rem;"><span class="font-medium text-sm hidden md:block">Filtrar por:</span></div>
              <div style="margin: 1rem;"><SelectButton v-model="periodoSelecionado" :options="opcoesPeriodo" optionLabel="label" /></div>

          </div>
      

        <div class="cards">
          <div class="card-kpi">
              <div>
                  <span class="block text-verde font-medium mb-3">Faturamento Total</span>
                  <div class="text-white font-bold text-xl">R$ 15.230,50</div>
              </div>
          </div>

          <div class="card-kpi">
              <div>
                  <span class="block text-verde font-medium mb-3">Faturamento Total</span>
                  <div class="text-white font-bold text-xl">R$ 15.230,50</div>
              </div>
          </div>

          <div class="card-kpi">
                <div>
                    <span class="block text-verde font-medium mb-3">Pedidos Realizados</span>
                    <div class="text-white font-bold text-xl">312</div>
                </div>
               
          </div>

          <div class="card-kpi" style="justify-content: center;">
              <div>
                <div>
                    <span class="block text-verde font-medium mb-3">Ticket Médio</span>
                    <div class="text-white font-bold text-xl">R$ 48,81</div>
                </div>
               
            </div>
               
          </div>
      </div>
    </div>

   
      <div class="grid mt-4">
        <div  class="col-12">
          <div style="padding: 1rem;" class="chart-container shadow-2 border-round p-4 bg-white">
            <div class="flex justify-content-between align-items-center mb-4">
              <span class="text-xl font-bold text-900">Evolução de Vendas</span>             
            </div>
            
            <div class="card bg-white p-4 shadow-2 border-round" style="position: relative; height: 305px;">
                <Chart type="line" :data="chartData" :options="chartOptions" class="h-full" />
            </div>
          </div>
        </div>
      </div>



</template>





<style scoped>
/* Azul Profundo para o Card */
.bg-azul-profundo {
    background-color: #002B5C !important;
}

/* Verde UAI para os detalhes */
.text-verde {
    color: #2ecc71 !important;
}

.bg-verde {
    background-color: #2ecc71 !important;
}

/* Estilização interna dos Cards */
.card-kpi {
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
    
}

.card-kpi:hover {
    transform: translateY(-5px);
    border-color: #2ecc71;
}

/* Ajuste para o SelectButton do PrimeVue */
:deep(.p-selectbutton .p-button.p-highlight) {
    background-color: #2ecc71 !important;
    border-color: #2ecc71 !important;
    color: #002B5C !important;
    font-weight: bold;
}

.card-kpi {
  display: flex; width: 230px; height: auto; padding: 1.5rem;margin: 1rem; background-color: rgb(240, 241, 241); border-radius: 5px;
    /* x=0, y=4px, desfoque=10px, cor preta com 10% de opacidade */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.cards{
  display: flex; margin: 1rem; justify-content: center;
}

.container-filtro{
  display: flex; justify-content: center; align-items: center;
}

.chart-container {
    background: #ffffff;
    border: 1px solid #f1f5f9;
}

/* Garante que o gráfico ocupe a altura definida */
:deep(.p-chart) {
    height: 300px;
}

@media(max-width:868px){
  .container-card{
    display: block;
    padding-left: .5rem !important;
    padding-top: 1rem;
    padding-bottom: 1rem;

  }
  .cards{
    display: block; margin: 0px; justify-content: center;
}

.container-filtro{
  display: block; justify-content: start;
  margin-bottom: 1.5rem;
}



}
</style>



