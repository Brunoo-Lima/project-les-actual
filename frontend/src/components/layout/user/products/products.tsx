import { productList } from '@/mocks/product-list';
import { Card } from './card/card';

export function Products() {
  return (
    <section className="container mx-auto py-10">
      <div className="grid grid-cols-3 gap-4 place-items-center">
        {productList.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
