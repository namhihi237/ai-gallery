'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getImages } from '../../../services/image';
import { ImageItem, ImageItemBase } from '../../../components/home/ImageItemBase';
const LIMIT = 10;
export default function Page() {
  const [images, setImage] = useState<ImageItem[]>([]);
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['getImages', page],
    queryFn: () => getImages(page, LIMIT),
  });

  useEffect(() => {
    const maxImages = page * LIMIT;
    if (data && maxImages > images.length) {
      setImage([...images, ...data.data?.data?.images]);
    }
  }, [data]);

  const isShowLoadMore = () => {
    return data?.data?.data?.total > images.length;
  };

  return (
    <div>
      <div className="flex flex-wrap pt-2">
        {images.map((image, index) => (
          <div className="w-1/4 pb-2" key={index}>
            <ImageItemBase url={image.url} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setPage(page + 1)}>
          {isShowLoadMore() ? 'Load More' : isLoading ? 'Loading more...' : ''}
        </button>
      </div>
    </div>
  );
}
