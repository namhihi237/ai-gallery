import { useEffect, useRef } from 'react';
import { useOutside } from '../../hooks/useOutSide';
import { localStorageUtils } from '../../utils/localStorage';
import { removeToken } from '../../utils/cookie';
import { useUser } from '../../contexts/UserContext';
type Props = {
  onClose: Function;
};

export default function MenuDropdown(props: Props) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { updateCurrentUser } = useUser();

  useOutside(dropdownRef, props.onClose);

  const MENU_ITEMS = [
    {
      icon: '',
      name: 'Logout',
      action: () => {
        localStorageUtils.removeItem('user');
        removeToken();
        updateCurrentUser();
      },
    },
  ];

  return (
    <div ref={dropdownRef} className="absolute top-full right-5 bg-white opacity-80 z-50">
      {MENU_ITEMS.map((item, index) => (
        <button
          key={index}
          className="bg-gray-500 hover:bg-gray-400 py-2 px-10"
          onClick={() => {
            item.action();
            props.onClose();
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
