import axios from 'axios';
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

    console.log('EMPRESA', empresaId);
    console.log('MERCHANT', merchantId);    
    
    // Note que a rota aqui deve bater com a que você criou no Express
    const response = await api.get(`/${empresaId}/status/${merchantId}`, {
       headers: {                 
        'Content-Type': 'application/json', 
        'x-api-key': import.meta.env.VITE_UAIRANGO_API_KEY || ''       
      }
  });
    return response.data;
  },

  async confirmarProcessamentoPelaRota(tenantId:string, eventIds: string[]) {
    // Note: eventIds deve ser um array ["id_do_pedido"]
    const response = await axios.post(`http://localhost:3000/pedidos/confirmar/${tenantId}`, {
      eventIds: eventIds,
        headers: {                 
        'Content-Type': 'application/json', 
        'x-api-key': import.meta.env.VITE_UAIRANGO_API_KEY || ''       
      }
    });
    return response.data;
  },

  async confirmarAceitePedido(tenantId:string,orderId:string){
  
    const response = await axios.post(`http://localhost:3000/pedidos/${orderId}/confirmar`,{
       headers: {                 
        'Content-Type': 'application/json', 
        'x-api-key': import.meta.env.VITE_UAIRANGO_API_KEY || '',
        'tenant-id': tenantId
        
      }
    })

    return response.data

  },


  async confirmarPedidoPronto(tenantId:string,orderId:string){
  
    const response = await axios.post(`http://localhost:3000/despachar/${orderId}`,{
       headers: {                 
        'Content-Type': 'application/json', 
        'x-api-key': import.meta.env.VITE_UAIRANGO_API_KEY || '',
        'tenant-id': tenantId
        
      }
    })

    return response.data

  },

   async confirmaPedidoProntoRetirada(tenantId:string,orderId:string){
  
    const response = await axios.post(`http://localhost:3000/readyToPickup/${orderId}`,{
       headers: {                 
        'Content-Type': 'application/json', 
        'x-api-key': import.meta.env.VITE_UAIRANGO_API_KEY || '',
        'tenant-id': tenantId
        
      }
    })

    return response.data

  }


};