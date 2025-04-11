"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { createCart } from "@/services/order";
import { IAddress } from "@/@types/IAddress";
import { ICreditCard } from "@/@types/ICreditCard";
import { IOrder } from "@/@types/IOrder";

interface ICheckoutContextProps {
  cart: ICart;
  setCart: React.Dispatch<React.SetStateAction<ICart>>;
  addresses: IAddress[];
  setAddresses: React.Dispatch<React.SetStateAction<IAddress[]>>;
  selectedAddress: IAddress | null;
  cards: ICreditCard[];
  setCards: React.Dispatch<React.SetStateAction<ICreditCard[]>>;
  selectedCreditCard: ICreditCard | null;
  addProductToCart: (productId: string, quantity: number) => void;
  handleSelectAddress: (address: IAddress) => void;
  handleAddAddressOnOrder: (address: IAddress) => void;
  handleSelectCreditCard: (
    card: ICreditCard,
    value: number,
    installments: number
  ) => void;
  handleRemoveCreditCardFromOrder: (id: string) => void;
  handleAddCreditCardOnOrder: (card: ICreditCard) => void;
  validatePayment: () => boolean;
  decrementItemCart: (productId: string) => void;
  incrementItemCart: (productId: string) => void;
  removeItemCart: (productId: string) => void;
  order: IOrder;
  setOrder: React.Dispatch<React.SetStateAction<IOrder>>;
  applyCoupon: (coupon: string) => void;
  clearCart: () => void;
}

interface ICheckoutProvider {
  children: ReactNode;
}

interface ICart {
  userId: string;
  items: ICartItem[];
}

interface ICartItem {
  productId: string;
  quantity: number;
}

export const CheckoutContext = createContext({} as ICheckoutContextProps);

export const CheckoutProvider = ({ children }: ICheckoutProvider) => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [cards, setCards] = useState<ICreditCard[]>([]);
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<ICreditCard | null>(null);
  const [userToken, setUserToken] = useState("");

  const [cart, setCart] = useState<ICart>({
    userId: userToken,
    items: [],
  });

  const [order, setOrder] = useState<IOrder>({
    items: [],
    total: 0,
    address: null,
    payment: [],
    status: "EM PROCESSAMENTO",
    freight: 20,
    coupon: null,
    discountValue: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("@user:data");
    if (token) setUserToken(JSON.parse(token));
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Funções do carrinho (simplificadas)
  const clearCart = () => {
    setCart({ userId: userToken, items: [] });
    setOrder((prev) => ({ ...prev, items: [], total: 0 }));
  };

  console.log(cart, "carttt");

  const addProductToCart = async (productId: string, quantity: number) => {
    try {
      const response = await createCart({
        userId: userToken,
        items: [{ productId, quantity }],
      });

      setCart(response.cartData);

      toast.success("Produto adicionado ao carrinho");
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Falha ao adicionar produto");
    }
  };

  const updateItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItemCart(productId);
      return;
    }

    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ),
    }));
  };

  const decrementItemCart = async (productId: string) => {
    try {
      const currentItem = cart.items.find(
        (item) => item.productId === productId
      );

      if (!currentItem) return;

      const newQuantity = currentItem.quantity - 1;

      // if (newQuantity > 0) {
      //   const response = await updateCartItem(
      //     userToken,
      //     productId,
      //     newQuantity
      //   );
      //   setCart(response.cartData);
      // } else {
      //   const response = await removeCartItem(userToken, productId);
      //   setCart(response.cartData);
      // }
    } catch (error) {}
  };

  const incrementItemCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  };

  const removeItemCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  };

  // Funções de endereço e pagamento (mantidas originais)
  const handleSelectAddress = (address: IAddress) => {
    setSelectedAddress(address);
    setOrder((prev) => ({ ...prev, address }));
  };

  const handleAddAddressOnOrder = (address: IAddress) => {
    setAddresses((prev) => [...prev, address]);
  };

  const handleSelectCreditCard = (
    card: ICreditCard,
    value: number,
    installments: number
  ) => {
    setSelectedCreditCard(card);
    setOrder((prev) => {
      const existingIndex = prev.payment.findIndex(
        (p) => p.card.id === card.id
      );

      return {
        ...prev,
        payment:
          existingIndex >= 0
            ? prev.payment.map((p, i) =>
                i === existingIndex ? { card, value, installments } : p
              )
            : [...prev.payment, { card, value, installments }],
      };
    });
  };

  const handleRemoveCreditCardFromOrder = (cardId: string) => {
    setOrder((prev) => ({
      ...prev,
      payment: prev.payment.filter((p) => p.card.id !== cardId),
    }));
  };

  const handleAddCreditCardOnOrder = (card: ICreditCard) => {
    setCards((prev) => [...prev, card]);
  };

  const validatePayment = () => {
    const totalPaid = order.payment.reduce((acc, p) => acc + p.value, 0);
    const isValid = totalPaid === order.total;
    if (!isValid) toast.error("Valor dos cartões não confere com o total");
    return isValid;
  };

  const applyCoupon = (coupon: string) => {
    // Implementação fictícia - ajuste conforme sua regra de negócio
    const discount = coupon === "PROMO10" ? 10 : 0;
    setOrder((prev) => ({
      ...prev,
      coupon,
      discountValue: discount,
      total: prev.total - discount,
    }));
  };

  const contextValue = useMemo(
    () => ({
      cart,
      setCart,
      addresses,
      setAddresses,
      selectedAddress,
      cards,
      setCards,
      selectedCreditCard,
      addProductToCart,
      handleSelectAddress,
      handleAddAddressOnOrder,
      handleSelectCreditCard,
      handleRemoveCreditCardFromOrder,
      handleAddCreditCardOnOrder,
      validatePayment,
      decrementItemCart,
      incrementItemCart,
      removeItemCart,
      order,
      setOrder,
      applyCoupon,
      clearCart,
    }),
    [cart, addresses, cards, selectedAddress, selectedCreditCard, order]
  );

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
