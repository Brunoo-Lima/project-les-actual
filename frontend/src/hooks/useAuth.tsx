"use client";

import { fetchLogin } from "@/services/login";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

interface IUserProps {
  id: string;
  role: TypeUser;
}

export type TypeUser = "ADMIN" | "CLIENT";

interface IAuthContextProps {
  handleChangeUser: () => void;
  user: IUserProps;
  setUser: React.Dispatch<React.SetStateAction<IUserProps>>;
  logout: () => void;
  login: (
    email: string,
    password: string,
    option: "ADMIN" | "CLIENT"
  ) => Promise<void>;
  // isAuthenticated: boolean;
}

interface IChildrenProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: IChildrenProps) => {
  const router = useRouter();
  const [user, setUser] = useState<IUserProps>({
    id: "",
    role: "CLIENT",
  });

  const logout = useCallback(() => {
    setUser({ role: "CLIENT", id: "" });
    localStorage.removeItem("@token:access");
    localStorage.removeItem("@user:data");
    router.push("/");
  }, [router]);

  const login = async (
    email: string,
    password: string,
    option: "ADMIN" | "CLIENT"
  ) => {
    try {
      const user = await fetchLogin(email, password, option);

      if (!user) {
        toast.error("Email ou senha incorretos!");
        return;
      }

      if (email && password) {
        toast.success("Logado com sucesso!");
      }

      localStorage.setItem("@user:data", JSON.stringify(user));

      setUser({ role: option, id: user.id });

      if (option === "ADMIN") {
        router.push("/vendas");
        localStorage.setItem("@token:access", "ADMIN");
      } else {
        router.push("/produtos");
        localStorage.setItem("@token:access", "CLIENT");
      }
    } catch (error) {
      toast.error("Algo deu errado");
    }
  };

  const handleChangeUser = () => {
    if (user.role === "ADMIN") {
      setUser({ role: "CLIENT", id: user.id });
      router.replace("/produtos");
    } else {
      setUser({ role: "ADMIN", id: "" });
      router.replace("/vendas");
    }
  };

  console.log("user", user);

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
