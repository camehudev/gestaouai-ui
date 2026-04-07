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
  }
};