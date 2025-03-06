"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { IProduct } from "@/@types/IProduct";
import { productList } from "./../mocks/product-list";
import { IUser } from "@/@types/IUser";
import { usersList } from "@/mocks/users-list";

interface IDataContextProps {
  products: IProduct[] | [];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[] | []>>;
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[] | []>>;
}

interface IDataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext({} as IDataContextProps);

export const DataProvider = ({ children }: IDataProviderProps) => {
  const [products, setProducts] = useState<IProduct[] | []>(productList);
  const [users, setUsers] = useState<IUser[] | []>(usersList);

  const contextValue = useMemo(
    () => ({
      products,
      setProducts,
      setUsers,
      users,
    }),
    [products, setProducts, setUsers, users]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
