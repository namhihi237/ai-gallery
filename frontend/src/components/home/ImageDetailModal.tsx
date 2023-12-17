import { MouseEvent } from 'react';
import { Icon } from '../Icon';
import { useMutation } from '@tanstack/react-query';
import { likeImage } from '../../services/image';

type Props = {
  onClose: Function;
  url: string;
  id: string;
};

export function ImageDetailModal(props: Props) {
  const handleCloseModal = (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (
      event.target === event.currentTarget ||
      (event.target as HTMLElement).classList.contains('close-button')
    ) {
      props.onClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');

    fetch(props.url)
      .then((response) => response.blob())
      .then((blob) => {
        link.href = URL.createObjectURL(blob);
        link.download = props.url.split('/').pop() || 'download.jpg';

        link.click();
      });
  };

  const mutationLike = useMutation<void, Error, string>({
    mutationFn: likeImage,
    onSuccess: () => {},
  });

  return (
    <div>
      <div
        onClick={handleCloseModal}
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-50"
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 p-4 rounded-md shadow-md z-50">
        <div className="flex w-full justify-between">
          <button onClick={handleDownload} className="tooltip mr-4" data-tip="download">
            <Icon iconName="FaDownload" />
          </button>
          <button onClick={handleCloseModal} className="tooltip close-button" data-tip="download">
            <Icon iconName="GrClose" className="close-button" />
          </button>
        </div>
        <img src={props.url} alt="image" className="mt-3" />
        <div className="flex w-full justify-end mt-4">
          <button
            className="mr-4 tooltip"
            data-tip="like"
            onClick={() => mutationLike.mutate(props.id)}
          >
            <Icon iconName="FaHeart" />
          </button>
          <button className="tooltip" data-tip="save">
            <Icon iconName="FaBookmark" />
          </button>
        </div>
      </div>
    </div>
  );
}
