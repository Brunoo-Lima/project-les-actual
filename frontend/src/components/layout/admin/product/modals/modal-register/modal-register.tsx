"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "@/components/modal";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { Input } from "@/components/ui/input/input";
import {
  IProductSchemaForm,
  ProductSchemaForm,
} from "@/components/validation/product-schema-form";
import { IProduct } from "@/@types/IProduct";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea/textarea";
import { createProduct } from "@/services/product";
import { SelectComponent } from "@/components/ui/select/select";
import { selectCategoryIsAvailable } from "@/mocks/select/select";
import axios from "axios";

interface IModalRegisterProps {
  onClose: () => void;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[] | []>>;
}

export function ModalRegister({ onClose, setProducts }: IModalRegisterProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    setValue,
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    reset,
  } = useForm<IProductSchemaForm>({
    resolver: yupResolver(ProductSchemaForm),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setValue("image", file as any);
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPreviewImage(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (!selectedFile) {
        toast.error("Por favor, selecione uma imagem");
        return;
      }

      const formData = new FormData();

      formData.append("image", selectedFile);

      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("brand", data.brand);
      formData.append("description", data.description);
      formData.append("material", data.material);
      formData.append("universe", data.universe);
      if (data.inactiveReason)
        formData.append("inactiveReason", data.inactiveReason);
      formData.append("depth", data.depth?.toString() || "");
      formData.append("height", data.height?.toString() || "");
      formData.append("weight", data.weight?.toString() || "");
      formData.append("width", data.width?.toString() || "");
      formData.append(
        "categoryIsAvailable",
        data.categoryIsAvailable?.toString() || "true"
      );
      formData.append(
        "stock.quantity",
        data.stock?.quantity?.toString() || "1"
      );

      const response = await axios.post(
        "http://localhost:3333/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts((prev) => [...prev, response.data]);
      toast.success("Produto cadastrado com sucesso!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Erro ao criar produto:");
    }
  };

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[600px] h-[600px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Novo Produto" onClick={onClose} />

      <Modal.Content>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="mb-2 flex gap-3 space-y-2">
            <label
              htmlFor="inputFile"
              className="w-[200px] h-[250px] inline-block px-3 py-5 border border-primary-light rounded-md cursor-pointer"
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Image Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span className="text-primary-light">Escolher arquivo</span>
              )}
            </label>

            <input
              type="file"
              accept="image/*"
              id="inputFile"
              {...register("image")}
              onChange={handleImageUpload}
              className="hidden"
            />

            <div>
              <p className="text-base text-primary-light">
                {selectedFile?.name}
              </p>

              {errors.image && (
                <span className="text-sm text-error">
                  {errors.image.message}
                </span>
              )}
            </div>
          </div>

          <div className="row">
            <input type="hidden" />
            <Input
              className="border border-gray-600"
              label="Nome do produto"
              placeholder="Digite o nome do produto"
              {...register("name")}
              error={errors.name}
            />
            <Input
              className="border border-gray-600"
              label="Nome do universo"
              placeholder="Digite o nome do universo"
              {...register("universe")}
              error={errors.universe}
            />
          </div>

          <div className="row">
            <Input
              className="border border-gray-600"
              label="Material"
              placeholder="Digite o nome do material"
              {...register("material")}
              error={errors.material}
            />

            <Input
              className="border border-gray-600"
              label="Marca"
              placeholder="Digite o nome da marca"
              {...register("brand")}
              error={errors.brand}
            />
          </div>

          <div className="row">
            <div className="row">
              <Input
                label="Preço"
                placeholder="Digite o preço"
                {...register("price")}
                error={errors.price}
                className="w-32 border border-gray-600"
              />

              <Input
                className="w-16 border border-gray-600"
                label="Estoque"
                placeholder="0"
                {...register("stock.quantity")}
                error={errors?.stock?.quantity}
              />
            </div>
          </div>

          <div className="grid grid-cols-4">
            <Input
              className="w-20 border border-gray-600"
              label="Peso"
              placeholder="5"
              {...register("weight")}
              error={errors.weight}
            />

            <Input
              className="w-20 border border-gray-600"
              label="Altura"
              placeholder="5"
              {...register("height")}
              error={errors.height}
            />

            <Input
              className="w-20 border border-gray-600"
              label="Largura"
              placeholder="5"
              {...register("width")}
              error={errors.width}
            />

            <Input
              className="w-20 border border-gray-600"
              label="Profundidade"
              placeholder="5"
              {...register("depth")}
              error={errors.depth}
            />
          </div>

          <div>
            <Controller
              name="categoryIsAvailable"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  placeholder="Categoria"
                  onChange={field.onChange}
                  options={selectCategoryIsAvailable}
                  label="Categoria de disponibilidade"
                />
              )}
            />
          </div>

          <Textarea
            label="Descrição"
            {...register("description")}
            error={errors.description}
          />

          <div className="flex justify-center items-center gap-4 mt-3">
            <ButtonGeneral
              type="submit"
              text={isSubmitting ? "Enviando..." : "Cadastrar"}
              disabled={isSubmitting}
              className="w-48"
            />
            <ButtonCancel text="Cancelar" onClick={onClose} />
          </div>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
