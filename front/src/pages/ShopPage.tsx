import { useState } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categoryService";
import { getProducts } from "../services/productService";
import { ShopFilters } from "../components/shop/ShopFilters";
import { ShopPagination } from "../components/shop/ShopPagination";
import { ShopProductGrid } from "../components/shop/ShopProductGrid";
import { useShopFilters } from "../hooks/useShopFilters";
import type { Category } from "../types/categoryTypes";
import type { ProductPagedResponse } from "../types/productTypes";

const ITEMS_PER_PAGE = 9;
const MIN_PRICE = 0;
const MAX_PRICE = 200000;

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(() => {
    const offsetParam = Number(searchParams.get("offset") ?? 0);
    if (!Number.isFinite(offsetParam) || offsetParam < 0) {
      return 1;
    }

    return Math.floor(offsetParam / ITEMS_PER_PAGE) + 1;
  });
  const limit = ITEMS_PER_PAGE;
  const pageForRequest = Math.max(1, page);
  const offset = (pageForRequest - 1) * limit;

  const filters = useShopFilters({
    minDefault: MIN_PRICE,
    maxDefault: MAX_PRICE,
    initialCategoryId: searchParams.get("categoriaId"),
    initialMin: searchParams.get("min"),
    initialMax: searchParams.get("max")
  });

  const { data: categories = [], isLoading: isLoadingCategories } =
    useQuery<Category[]>({
      queryKey: ["categories"],
      queryFn: getCategories
    });

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isProductsError
  } = useQuery<ProductPagedResponse>({
    queryKey: [
      "products",
      pageForRequest,
      filters.categoryId,
      filters.minFilter,
      filters.maxFilter,
      limit,
      offset
    ],
    queryFn: () =>
      getProducts({
        limit,
        offset,
        categoriaId: filters.categoryId,
        min: filters.minFilter,
        max: filters.maxFilter
      })
  });

  const totalItems = productsData?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const pageForUi = Math.min(pageForRequest, totalPages);
  const canPrev = pageForUi > 1;
  const canNext = pageForUi < totalPages;
  const syncUrl = (
    categoryId: string | null,
    minInput: string,
    maxInput: string,
    nextOffset: number
  ) => {
    const nextParams = new URLSearchParams(searchParams);
    let didChange = false;

    if (categoryId) {
      if (nextParams.get("categoriaId") !== categoryId) {
        nextParams.set("categoriaId", categoryId);
        didChange = true;
      }
    } else if (nextParams.has("categoriaId")) {
      nextParams.delete("categoriaId");
      didChange = true;
    }

    if (nextParams.get("min") !== minInput) {
      nextParams.set("min", minInput);
      didChange = true;
    }

    if (nextParams.get("max") !== maxInput) {
      nextParams.set("max", maxInput);
      didChange = true;
    }

    if (nextParams.get("limit") !== String(limit)) {
      nextParams.set("limit", String(limit));
      didChange = true;
    }

    if (nextParams.get("offset") !== String(nextOffset)) {
      nextParams.set("offset", String(nextOffset));
      didChange = true;
    }

    if (didChange) {
      setSearchParams(nextParams, { replace: true });
    }
  };

  const handleApply = () => {
    if (!filters.canApply) {
      return;
    }

    filters.applyFilters();
    setPage(1);
    syncUrl(
      filters.selectedCategoryId,
      filters.minInput,
      filters.maxInput,
      0
    );
  };

  const setPageAndSync = (nextPage: number) => {
    const nextSafePage = Math.max(1, nextPage);
    const nextOffset = (nextSafePage - 1) * limit;
    setPage(nextSafePage);
    syncUrl(
      filters.categoryId ?? null,
      filters.appliedMinInput,
      filters.appliedMaxInput,
      nextOffset
    );
  };

  const goPrev = () => setPageAndSync(Math.max(1, pageForUi - 1));
  const goNext = () => setPageAndSync(Math.min(totalPages, pageForUi + 1));

  const products = productsData?.items ?? [];

  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-md flex flex-col md:flex-row gap-12">
        <ShopFilters
          categories={categories}
          isLoading={isLoadingCategories}
          selectedCategoryId={filters.selectedCategoryId}
          minInput={filters.minInput}
          maxInput={filters.maxInput}
          minPrice={MIN_PRICE}
          maxPrice={MAX_PRICE}
          showRangeError={filters.showRangeError}
          canApply={filters.canApply}
          onCategoryToggle={filters.handleCategoryToggle}
          onMinChange={filters.handleMinChange}
          onMaxChange={filters.handleMaxChange}
          onApply={handleApply}
        />
        <section className="grow">
          <ShopProductGrid
            title="Collections"
            products={products}
            isLoading={isLoadingProducts}
            isError={isProductsError}
          />
          <ShopPagination
            page={pageForUi}
            totalPages={totalPages}
            canPrev={canPrev}
            canNext={canNext}
            onPrev={goPrev}
            onNext={goNext}
          />
        </section>
      </div>
    </main>
  );
}
