/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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

interface IModalRegisterProps {
  onClose: () => void;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[] | []>>;
}

export function ModalRegister({ onClose, setProducts }: IModalRegisterProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IProductSchemaForm>({
    resolver: yupResolver(ProductSchemaForm),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setValue("image", file);
      setFilename(file.name);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPreviewImage(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<IProductSchemaForm> = (
    data: IProductSchemaForm
  ) => {
    const updatedData: IProduct = {
      ...data,
      id: Math.ceil(Math.random() * 10000),
      price: +data.price,
      stock: +data.stock,
      status: "Ativo",
    };

    setProducts((prevProducts) => [...prevProducts, updatedData]);
    toast.success("Produto cadastrado com sucesso!");

    onClose();
  };

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[600px] h-[600px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Novo Produto" onClick={onClose} />

      <Modal.Content>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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
              {...(register("image"),
              {
                onChange: handleImageUpload,
              })}
              id="inputFile"
              className="hidden"
            />

            <div>
              <p className="text-base text-primary-light">{filename}</p>

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

          <div className="row-2">
            <Input
              label="Preço"
              placeholder="Digite o preço"
              {...register("price")}
              error={errors.price}
              className="w-32 border border-gray-600"
            />

            <Input
              label="Estoque"
              placeholder="0"
              {...register("stock.quantity")}
              className="w-16 border border-gray-600"
              error={errors.stock?.quantity}
            />

            <Input
              className="border border-gray-600"
              label="Categoria"
              placeholder="Digite a categoria"
              {...register("category")}
              error={errors.category}
            />
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

          <div className="flex justify-center items-center gap-4 mt-3">
            <ButtonGeneral type="submit" text="Cadastrar" className="w-48" />
            <ButtonCancel text="Cancelar" onClick={onClose} />
          </div>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
