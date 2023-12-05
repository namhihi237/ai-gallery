// contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getToken } from '../app/utils/cookie';

interface UserContextProps {
  currentUser: any | null;
  updateCurrentUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  const checkLogin = () => {
    const token = getToken();

    if (token) {
      setCurrentUser({ id: 1 });
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const updateCurrentUser = () => {
    checkLogin();
  };

  return (
    <UserContext.Provider value={{ currentUser, updateCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
