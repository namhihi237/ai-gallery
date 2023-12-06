import Image from 'next/image';
import { useState } from 'react';
import MenuDropdown from './MenuDropdown';

type AvatarProps = {
  url: string;
};

export default function Avatar({ url }: AvatarProps) {
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => {
          setIsShowMenu((prevIsShowMenu) => !prevIsShowMenu);
        }}
      >
        <Image src={url} width={40} height={40} alt="avatar" className="rounded-full" />
      </button>
      {isShowMenu && <MenuDropdown onClose={() => setIsShowMenu(false)} />}
    </div>
  );
}
