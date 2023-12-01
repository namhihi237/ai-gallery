import { ImageItem, ImageItemBase } from './ImageItemBase';

export type CategorySectionProps = {
  title: string;
  images: ImageItem[];
  maxItem?: number;
  containerStyle?: string;
};

export function CategorySection(props: CategorySectionProps) {
  const imageElements = props.maxItem ? props.images.slice(0, props.maxItem) : props.images;
  return (
    <div className={props.containerStyle}>
      <div className="flex justify-between mb-4">
        <p className="text-xl">{props.title}</p>
        <a className="text-xl" href="">
          See all
        </a>
      </div>
      <div className="flex flex-wrap">
        {imageElements.map((image, index) => (
          <ImageItemBase key={index} url={image.url} />
        ))}
      </div>
    </div>
  );
}
