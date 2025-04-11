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
import { IProduct } from "@/@types/IProduct";

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
  product?: IProduct;
}

interface IUser {
  id: string;
  name: string;
}

export const CheckoutContext = createContext({} as ICheckoutContextProps);

export const CheckoutProvider = ({ children }: ICheckoutProvider) => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [cards, setCards] = useState<ICreditCard[]>([]);
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<ICreditCard | null>(null);

  const [userToken, setUserToken] = useState<IUser | null>(null);

  const [cart, setCart] = useState<ICart>({
    userId: "",
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
    const loadUserAndCart = async () => {
      const token = localStorage.getItem("@user:data");

      if (token) {
        const userData = JSON.parse(token);
        setUserToken(userData);

        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);

          setCart({ ...parsedCart, userId: userData.id });
        } else {
          setCart({ userId: userData.id, items: [] });
        }
      }
    };

    loadUserAndCart();
  }, []);

  useEffect(() => {
    if (userToken && cart.userId) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, userToken]);

  const clearCart = () => {
    if (userToken) {
      setCart({ userId: userToken.id, items: [] });
      setOrder((prev) => ({ ...prev, items: [], total: 0 }));
    }
  };

  console.log("carttt", cart);

  const addProductToCart = async (productId: string, quantity: number) => {
    if (!userToken || !userToken.id) {
      toast.error("Usuário não autenticado");
      return;
    }

    try {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId === productId
      );

      let updatedItems: ICartItem[];

      if (existingItemIndex >= 0) {
        updatedItems = cart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...cart.items, { productId, quantity }];
      }

      // Atualiza o estado local primeiro para uma resposta mais rápida
      setCart((prev) => ({
        ...prev,
        items: updatedItems,
      }));

      // Sincroniza com o backend
      const response = await createCart({
        userId: userToken.id,
        items: [{ productId, quantity }],
      });

      if (response.cartData) {
        setCart({
          userId: userToken.id,
          items: response.cartData.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            product: item.product,
          })),
        });
      }

      toast.success("Produto adicionado ao carrinho");
    } catch (error: any) {
      console.error("Erro ao adicionar produto:", error);

      // Reverte a alteração local em caso de erro
      setCart((prev) => ({
        ...prev,
        items: cart.items, // Volta para o estado anterior
      }));

      toast.error(error.message || "Erro ao adicionar produto ao carrinho");
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

  const decrementItemCart = (productId: string) => {
    if (
      cart.items.find((item) => item.productId === productId)?.quantity === 0
    ) {
      removeItemCart(productId);
      return;
    }

    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
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
