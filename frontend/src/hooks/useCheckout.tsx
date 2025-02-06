'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { IAddress } from '@/@types/IAddress';
import { ICreditCard } from '@/@types/ICreditCard';
import { IProduct } from '@/@types/IProduct';
import { IOrder } from '@/@types/IOrder';

interface ICheckoutContextProps {
  cart: IProduct[];
  addresses: IAddress[];
  selectedAddress: IAddress | null;
  cards: ICreditCard[];
  selectedCreditCard: ICreditCard | null;
  addProductToCart: (product: IProduct) => void;
  handleSelectAddress: (address: IAddress) => void;
  handleAddAddressOnOrder: (address: IAddress) => void;
  handleSelectCreditCard: (card: ICreditCard) => void;
  handleAddCreditCardOnOrder: (card: ICreditCard) => void;
  decrementItemCart: (id: number) => void;
  incrementItemCart: (id: number) => void;
  removeItemCart: (id: number) => void;
  getOrderSummary: () => IOrder;
  order: IOrder;
  setOrder: React.Dispatch<React.SetStateAction<IOrder>>;
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
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<ICreditCard | null>(null);
  const [order, setOrder] = useState<IOrder>({} as IOrder);

  const addProductToCart = (product: IProduct) => {
    setCart((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    setOrder((prevOrder) => ({
      ...prevOrder,
      items: cart,
    }));
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

  const handleSelectAddress = (address: IAddress) => {
    setSelectedAddress(address);
    setOrder((prevOrder) => ({
      ...prevOrder,
      address: address,
    }));
  };

  const handleAddAddressOnOrder = (address: IAddress) =>
    setAddresses((prevAddresses) => [...prevAddresses, address]);

  const handleSelectCreditCard = (card: ICreditCard) => {
    setSelectedCreditCard(card);
    setOrder((prevOrder) => ({
      ...prevOrder,
      payment: card,
    }));
  };

  const handleAddCreditCardOnOrder = (card: ICreditCard) =>
    setCards((prevCards) => [...prevCards, card]);

  const getOrderSummary = () => ({
    items: cart,
    total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0), // Calcula total
    address: selectedAddress,
    payment: selectedCreditCard,
  });

  const contextValue = useMemo(
    () => ({
      cart,
      addresses,
      setAddresses,
      cards,
      selectedCreditCard,
      selectedAddress,
      addProductToCart,
      handleSelectAddress,
      handleAddAddressOnOrder,
      handleSelectCreditCard,
      handleAddCreditCardOnOrder,
      decrementItemCart,
      incrementItemCart,
      removeItemCart,
      getOrderSummary,
      order,
      setOrder,
    }),
    [cart, addresses, cards, order, selectedCreditCard, selectedAddress]
  );
  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
