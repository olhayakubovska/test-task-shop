import { PRODUCTS } from "@/shared/api/mock-data";
import { ProductCard } from "@/entities/product/ui/ProductCard";

const RECOMMENDED_COUNT = 6;

export function RecommendedProducts() {
  const items = PRODUCTS.slice(0, RECOMMENDED_COUNT);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-wide text-accent">Our selection</p>
      <h2 className="mb-6 text-3xl font-black uppercase tracking-tight sm:text-4xl">
        Рекомендовані товари
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
