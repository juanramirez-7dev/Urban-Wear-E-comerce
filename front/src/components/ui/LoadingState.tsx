export interface LoadingStateProps {
  readonly className?: string;
  readonly label?: string;
  readonly size?: "sm" | "md" | "lg";
}

const sizeClassMap: Record<NonNullable<LoadingStateProps["size"]>, string> = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-2",
  lg: "h-14 w-14 border-4"
};

export function LoadingState({
  className = "",
  label,
  size = "md"
}: Readonly<LoadingStateProps>) {
  const spinnerSizeClass = sizeClassMap[size];

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-10 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`rounded-full border border-outline-variant border-t-primary animate-spin ${spinnerSizeClass}`}
      />
      {label ? (
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
          {label}
        </span>
      ) : null}
    </div>
  );
}
