'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getImages } from '../../../services/image';
import { ImageItem, ImageItemBase } from '../../../components/home/ImageItemBase';
import { ImageDetailModal } from '../../../components/home/ImageDetailModal';

const LIMIT = 10;
export default function Page() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [page, setPage] = useState(1);
  const [imageSelected, setImageSelected] = useState<ImageItem | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ['getImages', page],
    queryFn: () => getImages(page, LIMIT),
  });

  useEffect(() => {
    const isNew = !images.length || (images[0]._id !== data?.data?.data?.images._id && page === 1);
    if (data) {
      if (isNew) {
        setImages(data?.data?.data?.images);
        return;
      }

      setImages([...images, ...data?.data?.data?.images]);
    }
  }, [data]);

  const isShowLoadMore = () => {
    return data?.data?.data?.total > images.length;
  };

  const loadMore = () => {
    if (isShowLoadMore()) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Intersection Observer setup for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.85 }, // Trigger when x/full of the element is in the viewport
    );

    const sentinel = document.getElementById('infinite-scroll-sentinel');

    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [loadMore]);

  return (
    <div>
      <div className="flex flex-wrap pt-2">
        {images.map((image, index) => (
          <div className="pb-2" key={index}>
            <ImageItemBase url={image.url} showDetail={() => setImageSelected(image)} />
          </div>
        ))}
      </div>
      {isLoading && <span className="loading loading-spinner loading-xs"></span>}
      <div id="infinite-scroll-sentinel" className="h-2"></div>
      {imageSelected && (
        <ImageDetailModal onClose={() => setImageSelected(null)} url={imageSelected.url} />
      )}
    </div>
  );
}
