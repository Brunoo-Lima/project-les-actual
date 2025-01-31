'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { IProduct } from '@/@types/IProduct';
import { productListRegister } from '@/mocks/product-list-register';

interface IDataContextProps {
  products: IProduct[] | [];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[] | []>>;
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[] | []>>;
}

interface IDataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext({} as IDataContextProps);

export const DataProvider = ({ children }: IDataProviderProps) => {
  const [products, setProducts] = useState<IProduct[] | []>(
    productListRegister
  );
  const [cartItems, setCartItems] = useState([]);

  const contextValue = useMemo(
    () => ({ products, setProducts, cartItems, setCartItems }),
    [products, setProducts, cartItems, setCartItems]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
