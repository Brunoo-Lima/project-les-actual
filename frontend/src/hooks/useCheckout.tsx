'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { IAddress } from '@/@types/IAddress';
import { ICreditCard } from '@/@types/ICreditCard';
import { IProduct } from '@/@types/IProduct';
import { IOrder } from '@/@types/IOrder';
import { toast } from 'sonner';

interface ICheckoutContextProps {
  cart: IProduct[];
  setCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
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
  order: IOrder;
  setOrder: React.Dispatch<React.SetStateAction<IOrder>>;
  applyCoupon: (coupon: string) => void;
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
  const [order, setOrder] = useState<IOrder>({
    items: [],
    total: 0,
    address: null,
    payment: null,
    status: 'Pendente',
    freight: 20,
    coupon: null,
    discountValue: 0,
  });

  const addProductToCart = (product: IProduct) => {
    setCart((prevItems) => {
      const updatedCart = prevItems.some((item) => item.id === product.id)
        ? prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...product, quantity: 1 }];

      const newTotal = updatedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // Atualiza a ordem com o novo carrinho
      setOrder((prevOrder) => ({
        ...prevOrder,
        items: updatedCart,
        total: newTotal + prevOrder.freight,
      }));

      return updatedCart;
    });
  };

  const applyCoupon = (coupon: string) => {
    let discount = 0;

    if (coupon === 'PROMO10') {
      discount = 10;
    } else if (coupon === 'DESCONTO20') {
      discount =
        cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.2;
    } else {
      toast.warning('Cupom inválido!');
      return;
    }

    setOrder((prevOrder) => ({
      ...prevOrder,
      coupon,
      discountValue: discount,
      total:
        prevOrder.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ) +
        prevOrder.freight -
        discount,
    }));
  };

  const decrementItemCart = (id: number) => {
    setCart((prev) => {
      const updatedCart = prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      setOrder((prevOrder) => ({
        ...prevOrder,
        items: updatedCart,
        total: updatedCart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      }));

      return updatedCart;
    });
  };

  const incrementItemCart = (id: number) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      setOrder((prevOrder) => ({
        ...prevOrder,
        items: updatedCart,
        total: updatedCart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      }));

      return updatedCart;
    });
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

  const contextValue = useMemo(
    () => ({
      cart,
      setCart,
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
      order,
      setOrder,
      applyCoupon,
    }),
    [
      cart,
      setCart,
      addresses,
      cards,
      order,
      selectedCreditCard,
      selectedAddress,
    ]
  );
  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
