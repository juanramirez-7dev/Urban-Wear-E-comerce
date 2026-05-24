import { useSearchParams, Link } from "react-router";
import { productCatalog } from "../data/mockData";

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const product = productCatalog.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="px-margin-mobile md:px-margin-desktop py-stack-lg">
        <p className="text-primary">Product not found.</p>
        <Link to="/" className="text-primary underline">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-stack-lg container mx-auto px-margin-mobile md:px-margin-desktop">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter md:gap-stack-lg">
        <div className="md:col-span-7 lg:col-span-8">
          <div className="w-full bg-surface-container-low overflow-hidden">
            <img alt={product.imageAlt} className="w-full h-auto object-cover" src={product.imageUrl} />
          </div>
          <div className="hidden md:grid md:grid-cols-2 md:gap-4 mt-4">
            {product.gallery.map((g, i) => (
              <div key={i} className="aspect-3/4 bg-surface-container-low overflow-hidden">
                <img className="w-full h-full object-cover" src={g.url} alt={g.alt} />
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-5 lg:col-span-4 sticky top-24 self-start">
          <div className="flex flex-col gap-stack-sm">
            <p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">{product.badge}</p>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">{product.title}</h1>
            <p className="font-headline-md text-headline-md text-primary mt-2">{product.price}</p>
            <div className="mt-stack-md">
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{product.description}</p>
            </div>
            <div className="mt-stack-md">
              <div className="flex justify-between items-end mb-4">
                <span className="font-label-md text-label-md uppercase text-primary">Select Size</span>
                <span className="font-label-sm text-label-sm text-secondary underline cursor-pointer">{product.sizeGuideLabel}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button key={s} className={`border ${s === product.selectedSize ? "border-primary bg-primary text-on-primary" : "border-outline"} h-12 flex items-center justify-center font-label-md`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="mt-stack-md flex flex-col gap-4">
              <button className="bg-primary text-on-primary font-label-md uppercase tracking-widest py-5 px-8 hover:opacity-90 active:scale-[0.98] transition-all">
                {product.ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
