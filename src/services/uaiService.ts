import api from './api'; // Seu axios configurado
 
export const uaiService = {

  async getTenantToken(tenantId: string) {
    try {
      // Faz o GET para a rota informada
      const response = await api.get(`/token/${tenantId}`,{
        headers: {                 
          'Content-Type': 'application/json', 
          // 'x-api-key': import.meta.env.VITE_UAIRANGO_API_KEY || ''       
        }
      });
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar token para o tenant ${tenantId}:`, error.message);
      throw error; // Repassa o erro para o componente tratar (ex: mostrar Toast)
    }
  },
 
  async updateStatus(empresaId: string, merchantId: string, data: any) {
    // Rota que definimos no seu backend

    return await api.put(`/config/${empresaId}/merchant/${merchantId}`, data, {
      headers: {                 
        'Content-Type': 'application/json', 
        'x-api-key': import.meta.env.VITE_UAIRANGO_API_KEY || ''       
      }
    });
  }, 

  // ADICIONE ESTA FUNÇÃO AQUI:
  async getStatus(empresaId: string, merchantId: string) {
    // Note que a rota aqui deve bater com a que você criou no Express
    const response = await api.get(`/${empresaId}/status/${merchantId}`, {
       headers: {                 
        'Content-Type': 'application/json', 
        'x-api-key': import.meta.env.VITE_UAIRANGO_API_KEY || ''       
      }
  });
    return response.data;
  }
};