import { Modal } from '@/components/modal';
import { ButtonCancel } from '@/components/ui/button/button-cancel/button-cancel';
import { ButtonGeneral } from '@/components/ui/button/button-general';
import { Input } from '@/components/ui/input/input';
import { useState } from 'react';

interface IModalRegisterProps {
  onClose: () => void;
}

export function ModalRegister({ onClose }: IModalRegisterProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPreviewImage(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal.Root className="flex flex-col gap-y-4 w-[600px] h-[550px] p-4 rounded-lg overflow-auto container-modal">
      <Modal.Header title="Novo Produto" onClick={onClose} />

      <Modal.Content className="flex flex-col gap-4 ">
        <div>
          <label
            htmlFor="inputFile"
            className="w-[300px] h-[250px] inline-block px-3 py-5 border border-primary-light rounded-md cursor-pointer"
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
              'Escolher arquivo'
            )}
          </label>

          <input
            type="file"
            onChange={handleImageUpload}
            id="inputFile"
            className="hidden"
          />
        </div>

        <div className="row">
          <input type="hidden" />
          <Input
            label="Nome do produto"
            placeholder="Digite o nome do produto"
          />
          <Input label="Nome do anime" placeholder="Digite o nome do anime" />
        </div>

        <div className="row">
          <Input label="Preço" placeholder="Digite o preço" />
          <Input label="Estoque" placeholder="Digite a quantidade no estoque" />
        </div>

        <div className="flex justify-center items-center gap-4 mt-3">
          <ButtonGeneral text="Cadastrar" className="w-48" />
          <ButtonCancel text="Cancelar" />
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
