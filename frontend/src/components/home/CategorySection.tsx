import Link from 'next/link';
import { ImageItem, ImageItemBase } from './ImageItemBase';

export type CategorySectionProps = {
  title: string;
  images: ImageItem[];
  maxItem?: number;
  containerStyle?: string;
  linkTo?: string;
};

export function CategorySection(props: CategorySectionProps) {
  const { maxItem, linkTo = '' } = props;
  const imageElements = maxItem ? props.images.slice(0, maxItem) : props.images;

  return (
    <div className={props.containerStyle}>
      <div className="flex justify-between mb-4">
        <p className="text-xl">{props.title}</p>
        <Link className="text-xl" href={linkTo}>
          See all
        </Link>
      </div>
      <div className="flex flex-wrap">
        {imageElements.map((image, index) => (
          <ImageItemBase key={index} url={image.url} />
        ))}
      </div>
    </div>
  );
}
