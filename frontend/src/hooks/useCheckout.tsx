'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { IAddress } from '@/@types/IAddress';
import { ICreditCard } from '@/@types/ICreditCard';
import { IProduct } from '@/@types/IProduct';

interface ICheckoutContextProps {
  cart: IProduct[];
  setCart: React.Dispatch<React.SetStateAction<IProduct[] | []>>;
  addresses: IAddress[];
  selectedAddress: IAddress | null;
  cards: ICreditCard[];
  selectedCard: ICreditCard | null;
  addProductToCart: (product: IProduct) => void;
  selectAddress: (address: IAddress) => void;
  addAddress: (address: IAddress) => void;
  selectCard: (card: ICreditCard) => void;
  addCard: (card: ICreditCard) => void;
  decrementItemCart: (id: number) => void;
  incrementItemCart: (id: number) => void;
  removeItemCart: (id: number) => void;
}

interface ICheckoutProvider {
  children: ReactNode;
}

export const CheckoutContext = createContext({} as ICheckoutContextProps);

export const CheckoutProvider = ({ children }: ICheckoutProvider) => {
  const [cart, setCart] = useState<IProduct[]>([]);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [cards, setCards] = useState<ICreditCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<ICreditCard | null>(null);

  const addProductToCart = (product: IProduct) => {
    setCart((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        return prevItems.map((item) => {
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const decrementItemCart = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const incrementItemCart = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const removeItemCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const selectAddress = (address: IAddress) => setSelectedAddress(address);

  const addAddress = (address: IAddress) =>
    setAddresses([...addresses, address]);

  const selectCard = (card: ICreditCard) => setSelectedCard(card);

  const addCard = (card: ICreditCard) => setCards([...cards, card]);

  const contextValue = useMemo(
    () => ({
      cart,
      setCart,
      addresses,
      setAddresses,
      cards,
      setCards,
      selectedCard,
      selectedAddress,
      setSelectedAddress,
      setSelectedCard,
      addProductToCart,
      selectAddress,
      addAddress,
      selectCard,
      addCard,
      decrementItemCart,
      incrementItemCart,
      removeItemCart,
    }),
    [cart, setCart, addresses, setAddresses, cards, setCards]
  );
  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
