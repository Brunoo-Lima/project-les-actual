import { TitlePage } from '@/components/ui/title/title-page/title-page';
import { Table } from './table/table';
import { productListRegister } from '@/mocks/product-list-register';
import { PlusIcon } from 'lucide-react';
import { ButtonGeneral } from '@/components/ui/button/button-general';

export function Product() {
  return (
    <section className="flex flex-col">
      <TitlePage title="Lista de produto" />

      <ButtonGeneral
        className="self-end"
        icon={<PlusIcon size={16} color="#000000" />}
        text="Cadastrar novo produto"
      />

      <div>
        <Table data={productListRegister} />
      </div>
    </section>
  );
}
