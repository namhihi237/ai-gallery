import axios from 'axios';
import { getToken } from '../utils/cookie';

export interface ImageCreation {
  file: File;
  tags: string[];
  title: string;
}

export const uploadImage = async ({ file, title, tags }: ImageCreation) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  tags.forEach((tag) => {
    formData.append('tags[]', tag);
  });

  const token = getToken()
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
  });
  return;
};

export const getImages = async (page: number = 1, limit: number = 10) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/images?limit=${limit}&page=${page}`, {});
};
