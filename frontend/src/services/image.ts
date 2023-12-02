import axios from 'axios';

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

  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return;
};

export const getImages = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/images`, {});
};
