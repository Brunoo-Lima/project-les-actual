"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IProduct } from "@/@types/IProduct";
import { IUser } from "@/@types/IUser";
import { listProducts } from "@/services/product";

interface IDataContextProps {
  products: IProduct[] | [];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[] | []>>;
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[] | []>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext({} as IDataContextProps);

export const DataProvider = ({ children }: IDataProviderProps) => {
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [users, setUsers] = useState<IUser[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await listProducts();

        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // if(!isLoading) return <div>Carregando...</div>

  const contextValue = useMemo(
    () => ({
      products,
      setProducts,
      setUsers,
      users,
      isLoading,
      setIsLoading,
    }),
    [products, setProducts, setUsers, users]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
