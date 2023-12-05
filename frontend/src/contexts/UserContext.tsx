// contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { localStorageUtils } from '../utils/localStorage';
import { getToken } from '../utils/cookie';

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
    const user = localStorageUtils.getItem('user');
    const token = getToken();

    if (user && token) {
      setCurrentUser(user);
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
