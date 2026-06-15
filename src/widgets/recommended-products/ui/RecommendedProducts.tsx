import { PRODUCTS } from "@/shared/api/mock-data";
import { ProductCard } from "@/entities/product/ui/ProductCard";

const RECOMMENDED_COUNT = 2;

export function RecommendedProducts() {
  const items = PRODUCTS.slice(0, RECOMMENDED_COUNT);

  return (
    <section className="mx-auto  px-4 pt-12 sm:px-6 lg:px-8">
      <p className="text-[10px] font-bold font-golos tracking-[1px]  uppercase text-pink-main">Our selection</p>

      <h2 className="mb-4 text-xl font-extrabold uppercase tracking-[1px] sm:text-4xl">
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
