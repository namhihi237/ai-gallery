import { MouseEvent, useState } from 'react';
import Avatar from '../avatar/Avatar';
import SearchBox from '../search/SearchBox';
import Logo from './Logo';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export default function Navbar() {
  const user = false; //TODO
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <div className="h-20 w-screen border-solid border-b-[1px] border-zinc-600 items-center flex">
      <div className="w-full flex items-center justify-between px-10">
        <Logo />
        <SearchBox />
        {user ? (
          <Avatar url="https://res.cloudinary.com/poppy-gallary/image/upload/v1700620691/_1fc72ba8-5e74-4835-b002-898874ab3a1f_ajvvif.jpg" />
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

type LoginModalProp = {
  onClose: Function;
};

function LoginModal({ onClose }: LoginModalProp) {
  const handleLoginWithGoogle = () => {
    // Implement Google login logic here
    // This could involve redirecting to a Google login page or using a third-party library
    // For simplicity, let's assume a successful login and close the modal
    onClose();
  };

  const handleCloseModal = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div>
      {/* Overlay for the entire content */}
      <div
        onClick={handleCloseModal}
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-50"
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md z-50">
        <h2 className="text-2xl mb-4">Login Modal</h2>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);
              handleLoginWithGoogle();
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
