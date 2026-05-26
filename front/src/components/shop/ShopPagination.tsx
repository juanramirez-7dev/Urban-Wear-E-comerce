export interface ShopPaginationProps {
  readonly page: number;
  readonly totalPages: number;
  readonly canPrev: boolean;
  readonly canNext: boolean;
  readonly onPrev: () => void;
  readonly onNext: () => void;
}

export function ShopPagination({
  page,
  totalPages,
  canPrev,
  canNext,
  onPrev,
  onNext
}: Readonly<ShopPaginationProps>) {
  return (
    <div className="mt-12 flex items-center justify-between border-t border-outline-variant pt-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        className="border border-outline-variant px-4 py-2 text-sm font-label-md uppercase tracking-widest text-secondary transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>
      <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className="border border-outline-variant px-4 py-2 text-sm font-label-md uppercase tracking-widest text-secondary transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
