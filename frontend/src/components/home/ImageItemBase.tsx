import classNames from 'classnames';

export type ImageItem = {
  url: string;
  _id?: string;
  type?: MediaType;
};

enum MediaType {
  image,
  album,
}

export function ImageItemBase(props: ImageItem) {
  const { type = MediaType.image } = props;
  return (
    <button className="mr-4 flex-1">
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
