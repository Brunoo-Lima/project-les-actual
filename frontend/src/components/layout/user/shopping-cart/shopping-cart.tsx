"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input/input";
import { FormatValue } from "@/utils/format-value";
import { ItemCart } from "./item-cart";
import { useCheckout } from "@/hooks/useCheckout";
import { IProduct } from "@/@types/IProduct";
import { useUseAuth } from "@/hooks/useAuth";
import { listCart } from "@/services/order";

export function ShoppingCart() {
  const [newCoupon, setNewCoupon] = useState<string>("");
  const {
    cart,
    incrementItemCart,
    decrementItemCart,
    removeItemCart,
    // applyCoupon,
    order,
    setCart,
  } = useCheckout();
  const { user } = useUseAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        const cartData = await listCart(user?.id);
        setCart(cartData);

        console.log("cartshop", cart);
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      // Só carrega se o usuário estiver autenticado
      loadCart();
    }
  }, [user?.id]);

  const handleApplyNewCoupon = () => {
    // applyCoupon(newCoupon);
    setNewCoupon("");
  };

  return (
    <div className="grid grid-cols-2 gap-x-16 place-items-start mt-8 container mx-auto">
      <div className="border border-gray-700  rounded-lg flex flex-col gap-4 w-[600px] h-[500px]">
        <div className="flex flex-col gap-4 flex-1 overflow-auto p-6 container-shopping-cart">
          {cart.items &&
            cart.items.map((item, index) => (
              <ItemCart
                key={index}
                item={item.product as IProduct}
                quantity={item.quantity}
                handleIncrement={incrementItemCart}
                handleDecrement={decrementItemCart}
                handleRemoveItem={removeItemCart}
              />
            ))}

          {cart.items.length === 0 && (
            <p className="text-lg font-semibold">Nenhum item no carrinho</p>
          )}
        </div>
      </div>

      <div className="flex flex-col border border-gray-700  rounded-lg p-6 w-[450px] h-max">
        <div className="mb-4 flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Digite o cupom"
            label="Cupom"
            value={newCoupon}
            onChange={(e) => setNewCoupon(e.target.value)}
          />

          <button
            type="button"
            onClick={handleApplyNewCoupon}
            className="bg-primary-dark text-primary-light px-4 py-2 w-64 rounded-md self-end"
          >
            Aplicar Cupom
          </button>
        </div>

        <div className="flex justify-between *:text-base *:font-semibold">
          <p>Subtotal</p>
          <p>
            {FormatValue(
              cart.items.reduce(
                (acc, item) => acc + item.quantity * item?.product!.price,
                0
              )
            ) || 0}
          </p>
        </div>

        <div className="flex justify-between *:text-base *:font-semibold">
          <p>Frete</p>
          <p>{FormatValue(order.freight)}</p>
        </div>

        {order.coupon && (
          <div className="flex justify-between *:text-base *:font-semibold">
            <p>Cupom ({order.coupon})</p>
            <p> -{FormatValue(order.discountValue)}</p>
          </div>
        )}

        <div className="flex justify-between *:text-lg *:font-semibold">
          <p>Total</p>
          <p>{FormatValue(order.total)}</p>
        </div>
      </div>
    </div>
  );
}
