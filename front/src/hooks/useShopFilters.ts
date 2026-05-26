import { useState } from "react";

export interface UseShopFiltersOptions {
  readonly minDefault: number;
  readonly maxDefault: number;
  readonly initialCategoryId?: string | null;
  readonly initialMin?: string | null;
  readonly initialMax?: string | null;
  readonly onApply?: () => void;
}

export interface UseShopFiltersResult {
  readonly categoryId?: string;
  readonly selectedCategoryId: string | null;
  readonly minInput: string;
  readonly maxInput: string;
  readonly appliedMinInput: string;
  readonly appliedMaxInput: string;
  readonly minFilter: number;
  readonly maxFilter: number;
  readonly showRangeError: boolean;
  readonly canApply: boolean;
  readonly applyFilters: () => void;
  readonly handleCategoryToggle: (categoryId: string) => void;
  readonly handleMinChange: (value: string) => void;
  readonly handleMaxChange: (value: string) => void;
}

const parsePriceInput = (value: string) => {
  if (!value.trim()) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const useShopFilters = ({
  minDefault,
  maxDefault,
  initialCategoryId,
  initialMin,
  initialMax,
  onApply
}: UseShopFiltersOptions): UseShopFiltersResult => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    initialCategoryId ?? null
  );
  const [minInput, setMinInput] = useState(
    initialMin ?? String(minDefault)
  );
  const [maxInput, setMaxInput] = useState(
    initialMax ?? String(maxDefault)
  );
  const [appliedCategoryId, setAppliedCategoryId] =
    useState<string | null>(initialCategoryId ?? null);
  const [appliedMinInput, setAppliedMinInput] = useState(
    initialMin ?? String(minDefault)
  );
  const [appliedMaxInput, setAppliedMaxInput] = useState(
    initialMax ?? String(maxDefault)
  );

  const minValue = parsePriceInput(minInput);
  const maxValue = parsePriceInput(maxInput);
  const showRangeError =
    minValue !== undefined && maxValue !== undefined && minValue > maxValue;
  const appliedMinValue = parsePriceInput(appliedMinInput);
  const appliedMaxValue = parsePriceInput(appliedMaxInput);
  const appliedRangeInvalid =
    appliedMinValue !== undefined &&
    appliedMaxValue !== undefined &&
    appliedMinValue > appliedMaxValue;
  const minFilter = appliedRangeInvalid
    ? minDefault
    : appliedMinValue ?? minDefault;
  const maxFilter = appliedRangeInvalid
    ? maxDefault
    : appliedMaxValue ?? maxDefault;
  const hasChanges =
    selectedCategoryId !== appliedCategoryId ||
    minInput !== appliedMinInput ||
    maxInput !== appliedMaxInput;
  const canApply = hasChanges && !showRangeError;

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategoryId((current) =>
      current === categoryId ? null : categoryId
    );
  };

  const handleMinChange = (value: string) => {
    setMinInput(value);
  };

  const handleMaxChange = (value: string) => {
    setMaxInput(value);
  };

  const applyFilters = () => {
    if (!canApply) {
      return;
    }

    setAppliedCategoryId(selectedCategoryId);
    setAppliedMinInput(minInput);
    setAppliedMaxInput(maxInput);
    onApply?.();
  };

  return {
    categoryId: appliedCategoryId ?? undefined,
    selectedCategoryId,
    minInput,
    maxInput,
    appliedMinInput,
    appliedMaxInput,
    minFilter,
    maxFilter,
    showRangeError,
    canApply,
    applyFilters,
    handleCategoryToggle,
    handleMinChange,
    handleMaxChange
  };
};
