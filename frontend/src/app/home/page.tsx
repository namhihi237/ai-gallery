'use client';
import { CategorySection } from '../../components/home/CategorySection';
import { useQuery } from '@tanstack/react-query';
import { getImages } from '../../services/image';
import { useEffect, useState } from 'react';
import { ROUTE } from '../../configs/route';

export default function Page() {
  const [images, setImage] = useState([]);

  const { data } = useQuery({
    queryKey: ['getImages'],
    queryFn: () => getImages(),
  });

  useEffect(() => {
    if (data) {
      setImage(data.data?.data?.images);
    }
  }, [data]);

  return (
    <div>
      <CategorySection title="Recent" images={images} maxItem={5} linkTo={ROUTE.HOME_ALL} />
      <CategorySection title="Album" images={images} containerStyle="mt-16" maxItem={4} />
    </div>
  );
}
