import { CategorySection } from '../../components/home/CategorySection';
import { ImageItem } from '../../components/home/ImageItemBase';

const images: ImageItem[] = [
  {
    url: 'https://res.cloudinary.com/poppy-gallary/image/upload/v1701413327/u7s2xfv7npichvxhmokq.jpg',
  },
  {
    url: 'https://res.cloudinary.com/poppy-gallary/image/upload/v1701405473/z0nk7r3oovhczdbqy663.jpg',
  },
  {
    url: 'https://res.cloudinary.com/poppy-gallary/image/upload/v1701413327/u7s2xfv7npichvxhmokq.jpg',
  },
  {
    url: 'https://res.cloudinary.com/poppy-gallary/image/upload/v1701401994/vockcytmxoj0qdlpy3ft.jpg',
  },
  {
    url: 'https://res.cloudinary.com/poppy-gallary/image/upload/v1701413327/u7s2xfv7npichvxhmokq.jpg',
  },
  {
    url: 'https://res.cloudinary.com/poppy-gallary/image/upload/v1701413327/u7s2xfv7npichvxhmokq.jpg',
  },
];
export default function Page() {
  return (
    <div>
      <CategorySection title="Recent" images={images} maxItem={5} />
      <CategorySection title="Album" images={images} containerStyle="mt-16" maxItem={4} />
    </div>
  );
}
