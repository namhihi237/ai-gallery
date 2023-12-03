'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getImages } from '../../../services/image';
import { ImageItem, ImageItemBase } from '../../../components/home/ImageItemBase';

export default function Page() {
  const [images, setImage] = useState<ImageItem[]>([]);

  const { data } = useQuery({
    queryKey: ['getImages'],
    queryFn: getImages,
  });

  useEffect(() => {
    if (data) {
      setImage(data.data?.data?.images);
    }
  }, [data]);

  return (
    <div>
      <div className="flex flex-wrap pt-2">
        {images.map((image, index) => (
          <div className="w-1/4 pb-2" key={index}>
            <ImageItemBase url={image.url} />
          </div>
        ))}
      </div>
    </div>
  );
}
