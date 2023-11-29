import Image from 'next/image';

type AvatarProps = {
  url: string;
};

export default function Avatar({ url }: AvatarProps) {
  return (
    <div>
      <Image src={url} width={40} height={40} alt="avatar" className="rounded-full" />
    </div>
  );
}
