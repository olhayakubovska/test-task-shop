import { PRODUCTS } from "@/shared/api/mock-data";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { SliderProductCard } from "@/entities/product/ui/SliderProductCard";

const MOBILE_COUNT = 2;
const SLIDER_COUNT = 8;

export function RecommendedProducts() {
  const mobileItems = PRODUCTS.slice(0, MOBILE_COUNT);
  const sliderItems = PRODUCTS.slice(0, SLIDER_COUNT);

  return (
    <section className="mx-auto px-4 pt-12 md:px-6 md:pt-14">
      <p className="text-xs font-bold font-golos tracking-[1px]  uppercase text-pink-main">Our selection</p>

      <h2 className="mb-4 text-xl font-extrabold uppercase tracking-[1px] sm:text-4xl md:text-2xl md:leading-8">
        Рекомендовані товари
      </h2>

      <div className="grid grid-cols-2 gap-4 md:hidden">
        {mobileItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="hidden md:flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-6 lg:overflow-visible md:pb-0">
        {sliderItems.map((product) => (
          <div key={product.id} className="snap-start shrink-0 w-40.5 lg:w-auto">
            <SliderProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
