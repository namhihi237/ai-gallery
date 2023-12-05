import axios from 'axios';
import { setToken } from '../utils/cookie';
import { localStorageUtils } from '../utils/localStorage';

export const loginWithGoogle = async (credential: string) => {
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
    token: credential,
  });

  setToken(data.data.accessToken);
  localStorageUtils.setItem('user', data.data.user);
  return;
};
