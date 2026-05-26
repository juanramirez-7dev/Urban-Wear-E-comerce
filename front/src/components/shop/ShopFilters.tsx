import { LoadingState } from "../ui/LoadingState";
import type { Category } from "../../types/categoryTypes";

export interface ShopFiltersProps {
  readonly categories: ReadonlyArray<Category>;
  readonly isLoading: boolean;
  readonly selectedCategoryId: string | null;
  readonly minInput: string;
  readonly maxInput: string;
  readonly minPrice: number;
  readonly maxPrice: number;
  readonly showRangeError: boolean;
  readonly canApply: boolean;
  readonly onCategoryToggle: (categoryId: string) => void;
  readonly onMinChange: (value: string) => void;
  readonly onMaxChange: (value: string) => void;
  readonly onApply: () => void;
}

export function ShopFilters({
  categories,
  isLoading,
  selectedCategoryId,
  minInput,
  maxInput,
  minPrice,
  maxPrice,
  showRangeError,
  canApply,
  onCategoryToggle,
  onMinChange,
  onMaxChange,
  onApply
}: Readonly<ShopFiltersProps>) {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-12">
      <div>
        <h3 className="font-label-md text-label-md uppercase tracking-widest mb-6 border-b border-outline-variant pb-2">
          Category
        </h3>
        <div className="space-y-4">
          {isLoading ? (
            <LoadingState
              size="sm"
              label="Loading categories"
              className="items-start py-4"
            />
          ) : categories.length === 0 ? (
            <p className="font-body-md text-secondary">
              No categories available.
            </p>
          ) : (
            categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategoryId === category.id}
                  onChange={() => onCategoryToggle(category.id)}
                  className="w-4 h-4 border-outline rounded-none text-primary focus:ring-0"
                />
                <span className="font-label-md text-label-md uppercase group-hover:text-primary transition-colors">
                  {category.nombre}
                </span>
              </label>
            ))
          )}
        </div>
      </div>
      <div>
        <h3 className="font-label-md text-label-md uppercase tracking-widest mb-6 border-b border-outline-variant pb-2">
          Price Range
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-label-sm text-label-sm uppercase text-secondary">
                Min
              </label>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={minInput}
                onChange={(event) => onMinChange(event.target.value)}
                className="w-full border-b border-outline-variant bg-transparent px-0 py-2 text-body-md outline-none focus:border-primary"
                placeholder={String(minPrice)}
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-sm text-label-sm uppercase text-secondary">
                Max
              </label>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={maxInput}
                onChange={(event) => onMaxChange(event.target.value)}
                className="w-full border-b border-outline-variant bg-transparent px-0 py-2 text-body-md outline-none focus:border-primary"
                placeholder={String(maxPrice)}
              />
            </div>
          </div>
          {showRangeError ? (
            <p className="text-sm text-error">
              El minimo debe ser menor o igual al maximo.
            </p>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        onClick={onApply}
        disabled={!canApply}
        className="w-full border border-outline-variant px-4 py-3 text-label-md uppercase tracking-widest transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        Aplicar cambios
      </button>
    </aside>
  );
}
