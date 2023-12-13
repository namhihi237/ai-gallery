import { MouseEvent } from 'react';

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
  return (
    <div>
      <div
        onClick={handleCloseModal}
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-50"
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md z-50">
        <img src={props.url} alt="image" />
      </div>
    </div>
  );
}
