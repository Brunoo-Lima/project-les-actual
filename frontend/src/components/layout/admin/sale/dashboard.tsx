import { LineChart } from '@/components/graphic/line-chart';
import { TitlePage } from '@/components/ui/title/title-page/title-page';
import { dataGraphic } from '@/mocks/data-graphic';

export function Dashboard() {
  return (
    <section className="container mx-auto">
      <TitlePage title="Relatório de vendas" />

      <div className="w-[600px] h-[400px]">
        <LineChart data={dataGraphic} />
      </div>
    </section>
  );
}
