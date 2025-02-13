"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useMemo, useState } from "react";

interface IAuthContextProps {
  handleChangeUser: (selected: "ADMIN" | "USER") => void;
  isOpenChatbot: boolean;
  setIsOpenChatbot: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IChildrenProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: IChildrenProps) => {
  const router = useRouter();
  const [isOpenChatbot, setIsOpenChatbot] = useState<boolean>(false);

  const handleChangeUser = (selected: "ADMIN" | "USER") => {
    if (selected === "ADMIN") {
      router.push("/vendas");
    } else {
      router.push("/produtos");
    }
  };

  const contextValue = useMemo(
    () => ({
      handleChangeUser,
      isOpenChatbot,
      setIsOpenChatbot,
    }),
    [isOpenChatbot, setIsOpenChatbot]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useUseAuth = () => useContext(AuthContext);
