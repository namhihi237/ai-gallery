import classNames from 'classnames';

export type ImageItem = {
  url: string;
  _id?: string;
  type?: MediaType;
  showDetail?: any;
};

enum MediaType {
  image,
  album,
}

export function ImageItemBase(props: ImageItem) {
  const { type = MediaType.image, showDetail = () => {} } = props;

  return (
    <button className="mr-4" onClick={showDetail}>
      <img
        src={props.url}
        alt="img"
        className={classNames(
          'transition-transform transform-gpu hover:scale-105',
          type === MediaType.image ? 'max-h-[300px]' : 'max-h-[400px]',
        )}
      />
    </button>
  );
}
