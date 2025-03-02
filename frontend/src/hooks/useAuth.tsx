"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

export type TypeUser = "ADMIN" | "USER";

interface IAuthContextProps {
  handleChangeUser: () => void;
  user: TypeUser;
  setUser: React.Dispatch<React.SetStateAction<TypeUser>>;
  logout: () => void;
  login: (
    email: string,
    password: string,
    option: "ADMIN" | "USER"
  ) => Promise<void>;
  // isAuthenticated: boolean;
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

  const login = async (
    email: string,
    password: string,
    option: "ADMIN" | "USER"
  ) => {
    try {
      if (!email || !password) {
        toast.error("Email ou senha incorretos!");
      }

      if (email && password) {
        toast.success("Logado com sucesso!");
      }

      if (option === "ADMIN") {
        setUser("ADMIN");
        // router.push("/vendas");
      } else {
        setUser("USER");
        // router.push("/produtos");
      }
    } catch (error) {
      toast.error("Algo deu errado");
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
