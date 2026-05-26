import type { AuthMode } from "../../hooks/useAuthPanel";

export interface AuthTabItem {
  readonly id: AuthMode;
  readonly label: string;
}

export interface AuthTabsProps {
  readonly items: ReadonlyArray<AuthTabItem>;
  readonly activeTab: AuthMode;
  readonly onChange: (tab: AuthMode) => void;
}

export function AuthTabs({
  items,
  activeTab,
  onChange
}: Readonly<AuthTabsProps>) {
  return (
    <div className="flex justify-center gap-10 mb-10">
      {items.map((item) => {
        const isActive = item.id === activeTab;
        const baseClassName =
          "font-label-md text-label-md uppercase tracking-widest pb-2 transition-colors duration-300";
        const stateClassName = isActive
          ? "border-b-2 border-primary text-primary"
          : "text-on-primary-container hover:text-primary";

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`${baseClassName} ${stateClassName}`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
