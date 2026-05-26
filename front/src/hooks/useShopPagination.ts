import { useCallback, useState } from "react";

export interface UseShopPaginationOptions {
  readonly itemsPerPage: number;
  readonly totalItems: number;
  readonly initialPage?: number;
}

export interface UseShopPaginationResult {
  readonly page: number;
  readonly totalPages: number;
  readonly limit: number;
  readonly offset: number;
  readonly canPrev: boolean;
  readonly canNext: boolean;
  readonly goPrev: () => void;
  readonly goNext: () => void;
  readonly setPage: (page: number) => void;
  readonly resetPage: () => void;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const useShopPagination = ({
  itemsPerPage,
  totalItems,
  initialPage
}: UseShopPaginationOptions): UseShopPaginationResult => {
  const limit = itemsPerPage;
  const [page, setPageState] = useState(() =>
    initialPage && initialPage > 0 ? initialPage : 1
  );
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const safePage = clamp(page, 1, totalPages);
  const safeOffset = (safePage - 1) * limit;

  const setPage = useCallback(
    (nextPage: number) => {
      const nextSafePage = clamp(nextPage, 1, totalPages);
      setPageState(nextSafePage);
    },
    [totalPages]
  );

  const resetPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const goPrev = useCallback(() => {
    setPage(safePage - 1);
  }, [safePage, setPage]);

  const goNext = useCallback(() => {
    setPage(safePage + 1);
  }, [safePage, setPage]);

  return {
    page: safePage,
    totalPages,
    limit,
    offset: safeOffset,
    canPrev: safePage > 1,
    canNext: safePage < totalPages,
    goPrev,
    goNext,
    setPage,
    resetPage
  };
};
