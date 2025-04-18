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
import {
  createOrder,
  decrementItemFromCart,
  removeItemFromCart,
} from "@/services/order";
import { IAddress } from "@/@types/IAddress";
import { ICreditCard } from "@/@types/ICreditCard";
import { IOrder, IOrderRequest, IPaymentMethodItem } from "@/@types/IOrder";
import { IProduct } from "@/@types/IProduct";
import {
  addItemToCart,
  createCart,
  decreaseItem,
  increaseItem,
} from "@/services/cart";
import { FormatValue } from "@/utils/format-value";

interface ICheckoutContextProps {
  cart: ICart;
  setCart: React.Dispatch<React.SetStateAction<ICart>>;
  addresses: IAddress[];
  setAddresses: React.Dispatch<React.SetStateAction<IAddress[]>>;
  selectedAddress: IAddress | null;
  cards: ICreditCard[];
  setCards: React.Dispatch<React.SetStateAction<ICreditCard[]>>;
  selectedCreditCard: ICreditCard | null;
  order: IOrder;
  setOrder: React.Dispatch<React.SetStateAction<IOrder>>;
  addProductToCart: (productId: string, quantity: number) => void;
  decrementItemCart: (productId: string) => void;
  incrementItemCart: (productId: string) => void;
  removeItemCart: (productId: string) => void;

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
  handleAddCouponPayment: (couponCode: string, value: number) => void;
  clearCart: () => void;
  createNewOrder: () => Promise<void>;
}

interface ICheckoutProvider {
  children: ReactNode;
}

interface ICart {
  id: string;
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
    id: "",
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
          setCart({ id: "", userId: userData.id, items: [] });
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

  console.log("carttt", cart);
  console.log("order", order);

  const addProductToCart = async (productId: string, quantity: number) => {
    if (!userToken || !userToken.id) {
      toast.error("Usuário não autenticado");
      return;
    }

    // await createCart(userToken.id);

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

      const response = await addItemToCart(userToken.id, productId, quantity);

      if (response) {
        setCart({
          id: response.id,
          userId: userToken.id,
          items: response.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            product: item.product,
          })),
        });

        setOrder((prevOrder) => ({
          ...prevOrder,
          items: response.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            product: item.product,
          })),
        }));

        toast.success("Produto adicionado ao carrinho");
      }

      // Atualiza o estado local primeiro para uma resposta mais rápida

      // if (response.cartData) {
      //   setCart({
      //     userId: userToken.id,
      //     items: response.cartData.items.map((item: any) => ({
      //       productId: item.productId,
      //       quantity: item.quantity,
      //       product: item.product,
      //     })),
      //   });
      // }

      // toast.success("Produto adicionado ao carrinho");
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

  const incrementItemCart = async (productId: string) => {
    if (!userToken?.id) {
      toast.error("Usuário não autenticado");
      return;
    }

    try {
      // Atualização otimista primeiro
      setCart((prev) => {
        const existingItem = prev.items.find(
          (item) => item.product?.id === productId
        );

        if (!existingItem) {
          toast.error("Produto não encontrado no carrinho");
          return prev;
        }

        // Verificação de estoque
        if (
          existingItem.product?.stock &&
          existingItem.quantity >= existingItem.product.stock.quantity
        ) {
          toast.error("Quantidade máxima disponível atingida");
          return prev;
        }

        return {
          ...prev,
          items: prev.items.map((item) =>
            item.product?.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      });

      // Sincroniza com o backend
      await increaseItem(userToken.id, productId);

      toast.success("Quantidade aumentada com sucesso");
    } catch (error: any) {
      console.error("Erro ao incrementar produto:", error);

      // Reverte em caso de erro
      setCart((prev) => ({
        ...prev,
        items: cart.items,
      }));

      toast.error(
        error.response?.data?.error || "Erro ao aumentar quantidade do produto"
      );
    }
  };

  const decrementItemCart = async (productId: string) => {
    if (!userToken?.id) {
      toast.error("Usuário não autenticado");
      return;
    }

    try {
      // Atualização otimista primeiro
      setCart((prev) => {
        const existingItemIndex = prev.items.findIndex(
          (item) => item.product?.id === productId
        );

        if (existingItemIndex === -1) {
          toast.error("Produto não encontrado no carrinho");
          return prev;
        }

        const currentItem = prev.items[existingItemIndex];
        const newQuantity = currentItem.quantity - 1;

        // Se for a última unidade, remove o item
        if (newQuantity < 1) {
          return {
            ...prev,
            items: prev.items.filter((item) => item.product?.id !== productId),
          };
        }

        // Apenas decrementa
        return {
          ...prev,
          items: prev.items.map((item) =>
            item.product?.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          ),
        };
      });

      // Chama a API
      await decreaseItem(userToken.id, productId);

      toast.success("Quantidade diminuída com sucesso");
    } catch (error: any) {
      console.error("Erro ao decrementar produto:", error);

      // Reverte a alteração local em caso de erro
      setCart((prev) => ({
        ...prev,
        items: cart.items,
      }));

      toast.error(error.response?.data?.error || "Erro ao diminuir quantidade");
    }
  };

  const removeItemCart = async (productId: string) => {
    if (!userToken || !userToken.id) {
      toast.error("Usuário não autenticado");
      return;
    }

    try {
      const itemToRemove = cart.items.find(
        (item) => item.product?.id === productId
      );
      if (!itemToRemove) {
        toast.error("Produto não encontrado no carrinho");
        return;
      }

      // Remove localmente primeiro
      const updatedItems = cart.items.filter(
        (item) => item.product?.id !== productId
      );

      setCart((prev) => ({
        ...prev,
        items: updatedItems,
      }));

      await removeItemFromCart(userToken.id, [
        { productId, quantity: itemToRemove.quantity },
      ]);

      toast.success("Produto removido do carrinho");
    } catch (error: any) {
      console.error("Erro ao remover produto:", error);
      // Reverte a alteração local
      setCart((prev) => ({
        ...prev,
        items: cart.items,
      }));
      toast.error(error.message || "Erro ao remover produto do carrinho");
    }
  };

  //adicionar endereço
  const handleSelectAddress = (address: IAddress) => {
    setSelectedAddress(address);
    setOrder((prev) => ({ ...prev, address }));
  };

  const handleAddAddressOnOrder = (address: IAddress) => {
    setAddresses((prev) => [...prev, address]);
  };

  //pagamento
  const handleSelectCreditCard = (
    card: ICreditCard,
    value: number,
    installments: number
  ) => {
    setOrder((prev) => {
      // Verifica se já existe pagamento com cartão de crédito
      const existingPaymentIndex = prev.payment.findIndex(
        (p) => p.methodId === "credit_card" && p.creditCardId === card.id
      );

      const newPayment: IPaymentMethodItem = {
        methodId: "credit_card_1", // Ou obtenha do seu sistema de métodos
        creditCardId: card.id,
        amount: value,
        installments,
      };

      return {
        ...prev,
        payment:
          existingPaymentIndex >= 0
            ? prev.payment.map((p, i) =>
                i === existingPaymentIndex ? newPayment : p
              )
            : [...prev.payment, newPayment],
      };
    });
  };

  const handleRemoveCreditCardFromOrder = (cardId: string) => {
    setOrder((prev) => ({
      ...prev,
      payment: prev.payment.filter((p) => p.creditCardId !== cardId),
    }));
  };

  const handleAddCreditCardOnOrder = (card: ICreditCard) => {
    setCards((prev) => [...prev, card]);
  };

  // const validatePayment = () => {
  //   const totalPaid = order.payment.reduce((acc, p) => acc + p.amount, 0);
  //   const isValid = totalPaid === order.total;
  //   if (!isValid) toast.error("Valor dos cartões não confere com o total");
  //   return isValid;
  // };

  const validatePayment = (): boolean => {
    // Verifica se há pelo menos um método de pagamento
    if (order.payment.length === 0) {
      toast.error("Selecione pelo menos um método de pagamento");
      return false;
    }

    // Calcula o total pago
    const totalPaid = order.payment.reduce(
      (sum, p) => sum + (p.amount || 0),
      0
    );
    const orderTotal = order.total;

    // Verifica se o valor total foi coberto (com margem para arredondamento)
    if (Math.abs(totalPaid - orderTotal) > 0.01) {
      toast.error(
        `A soma dos pagamentos (${FormatValue(
          totalPaid
        )}) não corresponde ao total do pedido (${FormatValue(orderTotal)})`
      );
      return false;
    }

    // Validações específicas por método
    for (const payment of order.payment) {
      if (payment.methodId === "credit_card" && !payment.creditCardId) {
        toast.error("Pagamento com cartão requer seleção de um cartão");
        return false;
      }

      if (payment.methodId === "coupon" && !payment.couponCode) {
        toast.error("Pagamento com cupom requer código do cupom");
        return false;
      }
    }

    return true;
  };

  const handleAddCouponPayment = (couponCode: string, value: number) => {
    setOrder((prev) => ({
      ...prev,
      payment: [
        ...prev.payment,
        {
          methodId: "coupon",
          couponCode,
          amount: value,
        },
      ],
    }));
  };

  const clearCart = () => {
    setCart({
      ...cart,
      items: [],
      userId: userToken!.id,
    });
    setOrder((prev) => ({ ...prev, items: [], total: 0 }));
  };

  const createNewOrder = async () => {
    if (!userToken?.id || !selectedAddress || !selectedCreditCard) {
      toast.error("Dados incompletos para criar o pedido");
      return;
    }

    try {
      // Primeiro valida o pagamento
      if (!validatePayment()) {
        return;
      }

      // Prepara os dados do pedido conforme o backend espera
      const orderData: IOrderRequest = {
        userId: userToken.id,
        addressId: selectedAddress.id,
        paymentMethods: order.payment.map((p) => ({
          methodId: p.methodId,
          creditCardId: p.creditCardId,
          couponCode: p.couponCode,
          amount: p.amount,
          installments: p.installments,
        })),
        cartId: cart.id || "", // Você precisa ter o cartId no seu estado de carrinho
        freight: order.freight,
        discountValue: order.discountValue,
      };

      const createdOrder = await createOrder(orderData);

      // Limpa o carrinho após sucesso
      clearCart();

      return createdOrder;
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      toast.error("Erro ao finalizar pedido");
      throw error;
    }
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
      handleAddCouponPayment,
      clearCart,
      createNewOrder,
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
