import { productList } from '@/mocks/product-list';
import { Card } from './card/card';

export function Products() {
  return (
    <section className="container mx-auto py-10">
      <div className="flex flex-wrap gap-4 justify-center">
        {productList.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
