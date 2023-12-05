import { useMutation } from '@tanstack/react-query';
import { loginWithGoogle } from '../../services/auth';
import { MouseEvent } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useUser } from '../../contexts/UserContext';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

type LoginModalProp = {
  onClose: Function;
};

export function LoginModal({ onClose }: LoginModalProp) {
  const { updateCurrentUser } = useUser();

  const handleLoginWithGoogle = () => {
    // Implement Google login logic here
    // This could involve redirecting to a Google login page or using a third-party library
    // For simplicity, let's assume a successful login and close the modal
    updateCurrentUser();
    onClose();
  };

  const handleCloseModal = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const mutationLoginGoogle = useMutation<void, Error, string>({
    mutationFn: loginWithGoogle,
    onSuccess: () => {
      handleLoginWithGoogle();
    },
  });

  return (
    <div>
      {/* Overlay for the entire content */}
      <div
        onClick={handleCloseModal}
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-50"
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md z-50">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (credentialResponse.credential) {
                mutationLoginGoogle.mutate(credentialResponse.credential);
              }
            }}
            onError={() => {
              onClose();
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
