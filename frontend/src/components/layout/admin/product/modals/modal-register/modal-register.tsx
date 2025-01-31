/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@/components/modal';
import { ButtonCancel } from '@/components/ui/button/button-cancel/button-cancel';
import { ButtonGeneral } from '@/components/ui/button/button-general';
import { Input } from '@/components/ui/input/input';
import {
  IProductSchemaForm,
  ProductSchemaForm,
} from '@/components/validation/product-schema-form';

interface IModalRegisterProps {
  onClose: () => void;
}

export function ModalRegister({ onClose }: IModalRegisterProps) {
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
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPreviewImage(e.target.result as string);
        setFilename(file.name);
        setValue('image', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<IProductSchemaForm> = () => {
    console.log('submit');
    onClose();
  };

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[600px] h-[600px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Novo Produto" onClick={onClose} />

      <Modal.Content>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <span className="text-primary-light">Escolher arquivo</span>
              )}
            </label>

            <input
              type="file"
              accept="image/*"
              {...(register('image'),
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
              label="Nome do produto"
              placeholder="Digite o nome do produto"
              {...register('name')}
              error={errors.name}
            />
            <Input
              label="Nome do anime"
              placeholder="Digite o nome do anime"
              {...register('anime')}
              error={errors.anime}
            />
          </div>

          <div className="flex flex-row">
            <Input
              label="Preço"
              placeholder="Digite o preço"
              {...register('price')}
              error={errors.price}
              className="w-32"
            />

            <Input
              label="Estoque"
              placeholder="'2'"
              {...register('stock')}
              className="w-16"
              error={errors.stock}
            />

            <Input
              label="Categoria"
              placeholder="Digite a categoria"
              {...register('category')}
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
