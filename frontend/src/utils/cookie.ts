import Cookies from 'js-cookie';
const TOKEN_COOKIE_KEY = 'accessToken';

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_COOKIE_KEY);
};

export const setToken = (token: string) => {
  Cookies.set(TOKEN_COOKIE_KEY, token, { path: '/' });
};

export const removeToken = () => {
  Cookies.remove(TOKEN_COOKIE_KEY, { path: '/' });
};
