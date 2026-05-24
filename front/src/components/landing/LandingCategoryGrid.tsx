import { CategoryTile } from "./CategoryTile";

export interface LandingCategoryItem {
  title: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel?: string;
}

export interface LandingCategoryGridProps {
  primary: LandingCategoryItem;
  secondary: ReadonlyArray<LandingCategoryItem>;
}

export function LandingCategoryGrid({
  primary,
  secondary
}: Readonly<LandingCategoryGridProps>) {
  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:min-h-[700px]">
        <CategoryTile
          className="md:col-span-8 min-h-[360px] md:h-full"
          title={primary.title}
          imageUrl={primary.imageUrl}
          imageAlt={primary.imageAlt}
          ctaLabel={primary.ctaLabel}
          size="large"
        />
        <div className="md:col-span-4 flex flex-col gap-gutter">
          {secondary.map((category) => (
            <CategoryTile
              key={category.title}
              className="flex-1 min-h-[220px] md:min-h-0"
              title={category.title}
              imageUrl={category.imageUrl}
              imageAlt={category.imageAlt}
              size="small"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
