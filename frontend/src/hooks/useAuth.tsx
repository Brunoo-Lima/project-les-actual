'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useMemo, useState } from 'react';

interface IUser {
  userLogin: 'ADMIN' | 'USER';
}

interface IAuthContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  handleLoginUser: () => void;
}

interface IChildrenProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const handleLoginUser = () => {
    setUser({} as IUser);
    router.push('/');
  };

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      handleLoginUser,
    }),
    [user, setUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useUseAuth = () => useContext(AuthContext);
