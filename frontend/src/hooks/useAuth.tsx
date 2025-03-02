"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type TypeUser = "ADMIN" | "USER";

interface IAuthContextProps {
  handleChangeUser: () => void;
  user: TypeUser;
  setUser: React.Dispatch<React.SetStateAction<TypeUser>>;
  logout: () => void;
  login: (option: "ADMIN" | "USER") => Promise<void>;
}

interface IChildrenProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: IChildrenProps) => {
  const router = useRouter();
  const [user, setUser] = useState<TypeUser>("USER");

  const logout = useCallback(() => {
    setUser("USER");
    router.push("/");
  }, [router]);

  const login = async (option: "ADMIN" | "USER") => {
    if (option === "ADMIN") {
      setUser("ADMIN");
      router.push("/vendas");
    } else {
      setUser("USER");
      router.push("/produtos");
    }
  };

  const handleChangeUser = () => {
    if (user === "ADMIN") {
      setUser("USER");
      router.replace("/produtos");
    } else {
      setUser("ADMIN");
      router.replace("/vendas");
    }
  };

  const contextValue = useMemo(
    () => ({
      handleChangeUser,
      logout,
      user,
      setUser,
      login,
    }),
    [handleChangeUser, logout, user, setUser, login]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useUseAuth = () => useContext(AuthContext);
