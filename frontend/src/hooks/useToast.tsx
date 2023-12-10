import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { Toast, ToastEnum, ToastProps } from '../components/Toast';

type ToastContextType = {
  addToast: (message: string, type?: ToastEnum) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<JSX.Element[]>([]);

  const addToast = useCallback((message: string, type: ToastEnum = ToastEnum.success) => {
    const toastProps: ToastProps = { message, type };
    const toastElement = <Toast key={Date.now()} {...toastProps} />;

    setToasts((prevToasts) => [...prevToasts, toastElement]);

    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.key !== toastElement.key));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="toast-container">{toasts}</div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
