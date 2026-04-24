import api from './api'; // Sua instância do Axios configurada


export const pedidoService = {
  /**
   * Busca a lista de pedidos de um tenant específico
   * @param tenantId ID da empresa/unidade
   */
  async getPedidosByTenant(tenantId: string) {
    try {
      const response = await api.get(`/pedidos/${tenantId}`);     
      return response.data; // Retorna a lista de pedidos
    } catch (error: any) {
      console.error(`Erro ao buscar pedidos do tenant ${tenantId}:`, error.message);
      throw error; // Lança o erro para ser tratado pelo componente (Toast)
    }
  },


  async buscarDetalhesUaiRango(orderId: string, idPedido:string,) {   
    // Chamamos o NOSSO backend, que tem a permissão de falar com a UaiRango
    const response = await api.get(`/order/pedido/${orderId}/${idPedido}`,{
          headers: {                 
            'Content-Type': 'application/json', 
            'x-api-key': import.meta.env.VITE_UAIRANGO_API_KEY || '' , 
            'tenant-id': sessionStorage.getItem('empresaId') || '' // Enviando o tenantId do sessionStorage
        
        }
  });
    return response.data;
  }


};