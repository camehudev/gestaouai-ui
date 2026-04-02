import Cookies from 'js-cookie';

const TOKEN_KEY = 'token'; // O nome que você deu ao salvar o cookie

export const getToken = () => {
    return Cookies.get(TOKEN_KEY);
};

export const setToken = (token: string) => {
  // Salva por 7 dias, com Secure e SameSite para segurança
  Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: 'strict' });
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};