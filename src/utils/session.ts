export const sessionManager = {
  setUserData(empresaId: string, merchantId: string, role:string) {
    sessionStorage.setItem('empresaId', empresaId);
    sessionStorage.setItem('merchantId', merchantId);
    sessionStorage.setItem('role', role);
  },

  getUserData() {
    return {
      empresaId: sessionStorage.getItem('empresaId'),
      merchantId: sessionStorage.getItem('merchantId'),
      role: sessionStorage.getItem('role'),
    };
  },

  clear() {
    sessionStorage.clear();
  }
};