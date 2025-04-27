"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { useUseAuth } from "@/hooks/useAuth";
import { Textarea } from "@/components/ui/textarea/textarea";
import { Button } from "@/components/ui/button/button";
import { createExchangeOrder } from "@/services/return-product";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox/checkbox";

interface IModalExchangeProps {
  onClose: () => void;
  chooseItem: any;
  order: any;
}

export function ModalExchange({
  onClose,
  chooseItem,
  order,
}: IModalExchangeProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [requestType, setRequestType] = useState<"exchange" | "return">(
    "return"
  );
  const { user } = useUseAuth();

  useEffect(() => {
    if (chooseItem === "all") {
      setSelectedItems(order.items.map((item: any) => item.id));
    }
  }, [chooseItem, order.items]);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === order.items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(order.items.map((item: any) => item.id));
    }
  };

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast.error("Por favor, informe o motivo da devolução");
      return;
    }

    if (selectedItems.length === 0) {
      toast.error("Selecione pelo menos um item para devolução");
      return;
    }

    setIsSubmitting(true);

    try {
      const itemsToExchange = order.items
        .filter((item: any) => selectedItems.includes(item.id))
        .map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }));

      if (requestType === "return") {
        await createExchangeOrder(
          order.id,
          user.id,
          itemsToExchange,
          reason,
          "return"
        );
        toast.success("Devolução solicitada com sucesso!");
      } else {
        await createExchangeOrder(
          order.id,
          user.id,
          itemsToExchange,
          reason,
          "exchange"
        );
        toast.success("Troca solicitada com sucesso!");
      }

      onClose();
    } catch (error) {
      console.error("Exchange error:", error);
      toast.error("Erro ao solicitar a operação");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal.Root className="w-[600px] h-[400px] p-4 rounded-md">
      <Modal.Header title="Solicitar troca/devolução" onClick={onClose} />

      <Modal.Content className="flex flex-col gap-2 mt-4">
        <div className="mb-4">
          <label className="font-semibold">Tipo de solicitação:</label>
          <div className="flex gap-4">
            <Button
              className={`${
                requestType === "return" ? "bg-blue-500" : "bg-gray-300"
              } hover:bg-blue-600 text-white w-full`}
              text="Devolução"
              onClick={() => setRequestType("return")}
            />
            <Button
              className={`${
                requestType === "exchange" ? "bg-blue-500" : "bg-gray-300"
              } hover:bg-blue-600 text-white w-full`}
              text="Troca"
              onClick={() => setRequestType("exchange")}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-3">
          <Checkbox
            label="Selecionar todos"
            id="select-all"
            checked={selectedItems.length === order.items.length}
            onChange={toggleSelectAll}
          />
        </div>

        {order.items.map((item: any) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={`item-${item.id}`}
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleItemSelection(item.id)}
            />
            <label
              htmlFor={`item-${item.id}`}
              className="flex items-center gap-2"
            >
              <span>{item.product.name}</span>
              <span>(Qtd: {item.quantity})</span>
            </label>
          </div>
        ))}

        <div className="mb-4">
          <Textarea
            label="Motivo da devolução"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Descreva o motivo da devolução..."
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            text="Cancelar"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
          />

          <Button
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
            text={
              isSubmitting
                ? "Enviando..."
                : `Solicitar ${
                    requestType === "return" ? "devolução" : "troca"
                  }`
            }
            onClick={handleSubmit}
            disabled={
              isSubmitting || !reason.trim() || selectedItems.length === 0
            }
          />
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
