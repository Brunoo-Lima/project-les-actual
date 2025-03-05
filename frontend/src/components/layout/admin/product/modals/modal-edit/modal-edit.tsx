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
import { useData } from "@/hooks/useData";
import { Textarea } from "@/components/ui/textarea/textarea";

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
  const [filename, setFilename] = useState<string | null>(null);
  const { setProducts } = useData();
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
    setValue("brand", product?.brand || "");
    setValue("name", product?.name || "");
    setValue("category", product?.category || "");
    setValue("price", product?.price || 0);
    setValue("quantity", product?.quantity || 0);
    setValue("description", product?.description || "");
    setValue("material", product?.material || "");
    setValue("weight", product?.weight || 0);
    setValue("height", product?.height || 0);
    setValue("width", product?.width || 0);
    setValue("depth", product?.depth || 0);
    setValue("universe", product?.universe || "");
    setValue("inactiveReason", product?.inactiveReason || "");
    setValue("isAvailable", product?.isAvailable || false);
  }, [setValue, product]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setValue("image", file.name);
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
      id: product?.id as string,
      price: +data.price,
      quantity: +data.quantity,
      image: data.image || (filename as string),
      description: data.description || (product?.description as any),
    };

    setSelectedProduct(updatedData);

    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product?.id ? updatedData : p))
    );

    toast.success("Produto editado com sucesso!");

    onClose();
  };

  if (!product) return;

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[600px] h-[600px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Editar produto" onClick={onClose} />

      <Modal.Content>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col  gap-4"
        >
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
                label="Estoque"
                placeholder="0"
                {...register("quantity")}
                className="w-16 border border-gray-600"
                error={errors?.quantity}
              />
            </div>

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

          <Textarea
            label="Descrição"
            {...register("description")}
            error={errors.description}
          />

          <div className="flex justify-center items-center gap-4 mt-3">
            <ButtonGeneral type="submit" text="Salvar" className="w-48" />
            <ButtonCancel text="Cancelar" onClick={onClose} />
          </div>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
