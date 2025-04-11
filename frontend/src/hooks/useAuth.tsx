"use client";

import { fetchLogin } from "@/services/login";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

interface IUserProps {
  id: string;
  role: "CLIENT";
}

export type TypeUser = "ADMIN" | "CLIENT";

interface IAuthContextProps {
  handleChangeUser: () => void;
  user: IUserProps;
  setUser: React.Dispatch<React.SetStateAction<IUserProps>>;
  logout: () => void;
  login: (email: string, password: string, option: "CLIENT") => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("@token:access");
      const userData = localStorage.getItem("@user:data");

      if (token && userData) {
        try {
          const parsedUserData = JSON.parse(userData);

          if (parsedUserData?.id) {
            setUser({
              role: "CLIENT",
              id: parsedUserData.id,
            });
            setIsAuthenticated(true);
          } else {
            console.error("Dados do usuário inválidos no localStorage");
            logout();
          }
        } catch (error) {
          console.error("Erro ao parsear userData:", error);
          logout();
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const logout = useCallback(() => {
    setUser({ role: "CLIENT", id: "" });
    setIsAuthenticated(false);
    localStorage.removeItem("@token:access");
    localStorage.removeItem("@user:data");
    router.push("/");
  }, [router]);

  const login = async (email: string, password: string, option: "CLIENT") => {
    setIsLoading(true);
    try {
      const user = await fetchLogin(email, password, option);

      if (!user) {
        toast.error("Email ou senha incorretos!");
        return;
      }

      await Promise.all([
        localStorage.setItem("@user:data", JSON.stringify(user)),
        localStorage.setItem("@token:access", option),
      ]);

      setUser({ role: option, id: user.id });
      setIsAuthenticated(true);

      toast.success("Logado com sucesso!");
      router.push("/produtos");
      // const targetRoute = option === "ADMIN" ? "/vendas" : "/produtos";

      // if (email && password) {
      //   toast.success("Logado com sucesso!");
      // }

      // localStorage.setItem("@user:data", JSON.stringify(user));

      // setUser({ role: option, id: user.id });
      // setIsAuthenticated(true);

      // if (option === "ADMIN") {
      //   router.push("/vendas");
      //   localStorage.setItem("@token:access", "ADMIN");
      // } else {
      //   router.push("/produtos");
      //   localStorage.setItem("@token:access", "CLIENT");
      // }
    } catch (error) {
      toast.error("Algo deu errado");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeUser = () => {
    const targetRoute = user.role === "CLIENT" ? "/produtos" : "/vendas";

    router.replace(targetRoute);
  };

  console.log("user", user);

  const contextValue = useMemo(
    () => ({
      handleChangeUser,
      logout,
      user,
      setUser,
      login,
      isAuthenticated,
      isLoading,
    }),
    [handleChangeUser, logout, user, setUser, login, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useUseAuth = () => useContext(AuthContext);
