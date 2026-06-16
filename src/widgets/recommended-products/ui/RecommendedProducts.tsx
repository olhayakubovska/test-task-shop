import { PRODUCTS } from "@/shared/api/mock-data";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { SliderProductCard } from "@/entities/product/ui/SliderProductCard";

const MOBILE_COUNT = 2;
const SLIDER_COUNT = 8;
const DESKTOP_COUNT = 6;

export function RecommendedProducts() {
  const mobileItems = PRODUCTS.slice(0, MOBILE_COUNT);
  const sliderItems = PRODUCTS.slice(0, SLIDER_COUNT);
  const desktopItems = PRODUCTS.slice(0, DESKTOP_COUNT);

  return (
    <section className="mx-auto max-w-375 px-4 pt-12 md:px-6 md:pt-14 3xl:px-0 3xl:pt-20">
      <p className="text-xs font-bold font-golos tracking-[1px]  uppercase text-pink-main 3xl:text-sm">Our selection</p>

      <h2 className="mb-4 text-xl font-extrabold uppercase tracking-[1px] sm:text-4xl md:text-2xl md:leading-8 3xl:text-4xl 3xl:mt-1 3xl:mb-7">
        Рекомендовані товари
      </h2>

      <div className="grid grid-cols-2 gap-4 md:hidden">
        {mobileItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="hidden md:flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden md:pb-0 3xl:hidden">
        {sliderItems.map((product) => (
          <div key={product.id} className="snap-start shrink-0 w-40.5">
            <SliderProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="hidden 3xl:grid 3xl:grid-cols-6 3xl:gap-6">
        {desktopItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            imageClassName="3xl:w-[230px] 3xl:h-[289px]"
            infoClassName="3xl:p-3"
            titleClassName="3xl:text-[10px] 3xl:font-medium 3xl:leading-4 3xl:tracking-[0.5px]"
            descriptionClassName="3xl:text-[8px] 3xl:font-normal 3xl:leading-2 3xl:tracking-normal 3xl:whitespace-nowrap "
            priceClassName="3xl:text-xs 3xl:font-medium 3xl:font-golos 3xl:tracking-normal"
            discountClassName="3xl:text-[8px] 3xl:font-golos"
            favoriteClassName="3xl:h-8 3xl:w-8 3xl:top-2 3xl:right-2"
          />
        ))}
      </div>
    </section>
  );
}
