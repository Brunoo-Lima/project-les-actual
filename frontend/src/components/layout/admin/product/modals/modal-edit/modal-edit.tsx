/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IProduct } from "@/@types/IProduct";
import { Modal } from "@/components/modal";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { Input } from "@/components/ui/input/input";
import {
  IProductSchemaForm,
  ProductSchemaForm,
} from "@/components/validation/product-schema-form";
import { toast } from "sonner";

interface IModalEditProps {
  product: IProduct | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
  onClose: () => void;
}

export function ModalEdit({
  product,
  onClose,
  setSelectedProduct,
}: IModalEditProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IProductSchemaForm>({
    resolver: yupResolver(ProductSchemaForm),
  });

  useEffect(() => {
    if (product?.image) {
      setPreviewImage(product.image as any);
    }
  }, [product]);

  useEffect(() => {
    setValue("anime", product?.anime || "");
    setValue("name", product?.name || "");
    setValue("category", product?.category || "");
    setValue("price", product?.price.toString() || "");
    setValue("stock", product?.stock.toString() || "");
  }, [setValue, product]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setValue("image", file);
      setSelectedFile(file);
      setFilename(file.name);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPreviewImage(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //Nao ta funcionando corretamente
  const onSubmit: SubmitHandler<IProductSchemaForm> = (
    data: IProductSchemaForm
  ) => {
    const updatedData: Partial<IProduct> = {
      ...data,
      id: Math.ceil(Math.random() * 10000),
      price: +data.price,
      stock: +data.stock,
    };

    console.log(updatedData);

    setSelectedProduct(updatedData);
    toast.success("Produto editado com sucesso!");

    onClose();
  };

  if (!product) return;

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[600px] h-[600px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Editar Produto" onClick={onClose} />

      <Modal.Content>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <div className="mb-2 flex gap-3 ">
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
              id="inputFile"
              accept="image/*"
              {...register("image", {
                onChange: handleImageUpload,
              })}
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
              label="Nome do produto"
              placeholder="Digite o nome do produto"
              {...register("name")}
              error={errors.name}
            />
            <Input
              label="Nome do anime"
              placeholder="Digite o nome do anime"
              {...register("anime")}
              error={errors.anime}
            />
          </div>

          <div className="flex flex-row">
            <Input
              label="Preço"
              placeholder="Digite o preço"
              {...register("price")}
              error={errors.price}
              className="w-32"
            />

            <Input
              label="Estoque"
              placeholder="'2'"
              {...register("stock")}
              className="w-16"
              error={errors.stock}
            />

            <Input
              label="Categoria"
              placeholder="Digite a categoria"
              {...register("category")}
              error={errors.category}
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
