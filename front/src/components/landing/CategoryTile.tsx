export interface CategoryTileProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel?: string;
  size: "large" | "small";
  className?: string;
}

export function CategoryTile({
  title,
  imageUrl,
  imageAlt,
  ctaLabel,
  size,
  className
}: Readonly<CategoryTileProps>) {
  const titleClassName =
    size === "large"
      ? "font-headline-md text-headline-md"
      : "font-headline-sm text-headline-sm";
  const positionClassName = size === "large" ? "bottom-8 left-8" : "bottom-6 left-6";

  return (
    <div
      className={`relative group overflow-hidden cursor-pointer h-full ${className ?? ""}`.trim()}
    >
      <img
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        alt={imageAlt}
        src={imageUrl}
      />
      <div className={`absolute ${positionClassName} text-on-primary`}>
        <h3 className={`${titleClassName} uppercase tracking-widest mb-2`}>
          {title}
        </h3>
        {ctaLabel ? (
          <p className="font-label-sm text-label-sm uppercase tracking-widest border-b border-on-primary inline-block pb-1">
            {ctaLabel}
          </p>
        ) : null}
      </div>
    </div>
  );
}
