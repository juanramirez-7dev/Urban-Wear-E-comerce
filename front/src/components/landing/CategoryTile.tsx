import { Link } from "react-router";

export interface CategoryTileProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  size: "large" | "small";
  className?: string;
  to?: string;
}

export function CategoryTile({
  title,
  imageUrl,
  imageAlt,
  size,
  className,
  to
}: Readonly<CategoryTileProps>) {
  const titleClassName =
    size === "large"
      ? "font-headline-md text-headline-md"
      : "font-headline-sm text-headline-sm";
  const positionClassName = size === "large" ? "bottom-8 left-8" : "bottom-6 left-6";

  return (
    <Link
    to={to ?? "/shop"}
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
      </div>
    </Link>
  );
}
