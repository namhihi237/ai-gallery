import axios from 'axios';
import { setToken } from '../app/utils/cookie';

export const loginWithGoogle = async (credential: string) => {
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
    token: credential,
  });

  setToken(data.data.accessToken);
  return;
};
