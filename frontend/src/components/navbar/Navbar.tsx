import { useState } from 'react';
import Avatar from './Avatar';
import SearchBox from '../search/SearchBox';
import Logo from './Logo';
import { LoginModal } from '../auth/LoginModal';
import { useUser } from '../../contexts/UserContext';

export default function Navbar() {
  const { currentUser } = useUser();

  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div className="h-20 w-screen border-solid border-b-[1px] border-zinc-600 items-center flex">
      <div className="w-full flex items-center justify-between px-10">
        <Logo />
        <SearchBox />
        {currentUser ? (
          <div className="flex justify-center items-center">
            <strong className="mr-2">{currentUser.name}</strong>
            <Avatar url={currentUser.image} />
          </div>
        ) : (
          <button onClick={() => setIsShowModal(true)} className="hover:text-yellow-500">
            Login
          </button>
        )}
      </div>
      {isShowModal && <LoginModal onClose={() => setIsShowModal(false)} />}
    </div>
  );
}
