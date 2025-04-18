"use client";

import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { ShoppingCart } from "../shopping-cart";
import { Addresses } from "./addresses";

import { Payment } from "./payment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCheckout } from "@/hooks/useCheckout";
import { IOrder } from "@/@types/IOrder";
import { createOrder } from "@/services/order";

export function MultiStepForm() {
  const { cart, order, validatePayment, setCart, clearCart, createNewOrder } =
    useCheckout();
  const router = useRouter();
  const { isFirstStep, currentStep, isLastStep, next, previous } =
    useMultiStepForm({
      steps: [
        <ShoppingCart key={0} />,
        <Addresses key={1} />,
        <Payment key={2} />,
      ],
    });

  const handleOrderFinished = async () => {
    // if (!validatePayment()) {
    //   toast.error("Erro no pagamento. Verifique os valores dos cartões.");
    //   return;
    // }

    // // Valida se um endereço foi selecionado
    // if (!order.address) {
    //   toast.error("Selecione um endereço de entrega.");
    //   return;
    // }

    // // Valida se há itens no carrinho
    // if (cart.items.length === 0) {
    //   toast.error("O carrinho está vazio.");
    //   return;
    // }

    //Logica para enviar para o backend

    // const newOrder: IOrder = {
    //   items: cart,
    //   total: order.total,
    //   address: order.address,
    //   payment: order.payment || [],
    //   status: "Pendente",
    //   freight: order.freight,
    //   discountValue: order.discountValue,
    //   coupon: order.coupon,
    // };

    const newOrder = {
      ...order,
    };

    try {
      await createNewOrder();

      // toast.success("Pedido realizado com sucesso!");
      // router.push("/pedidos");

      // clearCart();
    } catch (error) {
      toast.error("Erro ao realizar pedido.");
    }

    // const existingOrders = JSON.parse(
    //   localStorage.getItem("tempOrders") || "[]"
    // ) as IOrder[];

    // existingOrders.push(newOrder);

    // localStorage.setItem("tempOrders", JSON.stringify(existingOrders));

    // setCart([]);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 pb-8">
      {currentStep}

      <div className="flex justify-center gap-4">
        {!isFirstStep && (
          <button
            type="button"
            onClick={previous}
            className="mt-8 bg-red-700 font-semibold text-primary-light p-2 rounded-md transition duration-300 hover:bg-red-500"
          >
            Voltar
          </button>
        )}
        {!isLastStep ? (
          <button
            type="button"
            disabled={cart.items.length === 0}
            onClick={next}
            className="mt-8 bg-primary text-background p-2 rounded-md font-semibold text-base transition duration-300 hover:bg-primary-dark"
          >
            Próximo
          </button>
        ) : (
          <button
            type="button"
            onClick={handleOrderFinished}
            className="bg-primary text-background p-2 rounded-md font-semibold text-base mt-8 transition duration-300 hover:bg-primary-dark"
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}
