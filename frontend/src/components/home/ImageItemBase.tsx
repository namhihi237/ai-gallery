import classNames from 'classnames';

export type ImageItem = {
  url: string;
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
          'w-full h-auto transition-transform transform-gpu hover:scale-105',
          type === MediaType.image ? 'max-h-[200px]' : 'max-h-[300px]',
        )}
      />
    </button>
  );
}
