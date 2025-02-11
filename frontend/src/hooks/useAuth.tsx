'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useMemo } from 'react';

interface IAuthContextProps {
  handleChangeUser: (selected: 'ADMIN' | 'USER') => void;
}

interface IChildrenProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: IChildrenProps) => {
  const router = useRouter();

  const handleChangeUser = (selected: 'ADMIN' | 'USER') => {
    if (selected === 'ADMIN') {
      router.push('/vendas');
    } else {
      router.push('/produtos');
    }
  };

  const contextValue = useMemo(
    () => ({
      handleChangeUser,
    }),
    []
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useUseAuth = () => useContext(AuthContext);
