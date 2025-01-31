'use client';

import { Card } from './card/card';
import { useData } from '@/hooks/useData';

export function Products() {
  const { products } = useData();
  return (
    <section className="container mx-auto py-10 ">
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
