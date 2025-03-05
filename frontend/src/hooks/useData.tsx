"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { IProduct } from "@/@types/IProduct";
import { productList } from "./../mocks/product-list";

interface IDataContextProps {
  products: IProduct[] | [];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[] | []>>;
}

interface IDataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext({} as IDataContextProps);

export const DataProvider = ({ children }: IDataProviderProps) => {
  const [products, setProducts] = useState<IProduct[] | []>(productList);

  const contextValue = useMemo(
    () => ({
      products,
      setProducts,
    }),
    [products, setProducts]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
