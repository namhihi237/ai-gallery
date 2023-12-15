import { MouseEvent } from 'react';
import { Icon } from '../Icon';

type Props = {
  onClose: Function;
  url: string;
};

export function ImageDetailModal(props: Props) {
  const handleCloseModal = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
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

  return (
    <div>
      <div
        onClick={handleCloseModal}
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-50"
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-600 p-4 rounded-md shadow-md z-50">
        <div className="w-full flex justify-end">
          <button onClick={handleDownload}>
            <Icon iconName="FaDownload" />
          </button>
        </div>
        <img src={props.url} alt="image" className="mt-3" />
      </div>
    </div>
  );
}
