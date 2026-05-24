import { premiumLoadingContent } from "../../data/mockData";
import { useLoadingExperience } from "../../hooks/useLoadingExperience";

export interface PremiumLoadingContent {
  readonly brand: string;
  readonly label: string;
  readonly estLabel: string;
  readonly progressLabel: string;
  readonly backgroundImageUrl?: string;
  readonly backgroundImageAlt?: string;
}

export interface PremiumLoadingScreenProps {
  readonly className?: string;
  readonly content?: PremiumLoadingContent;
  readonly durationMs?: number;
  readonly onComplete?: () => void;
}

export function PremiumLoadingScreen({
  className = "",
  content = premiumLoadingContent,
  durationMs,
  onComplete
}: Readonly<PremiumLoadingScreenProps>) {
  useLoadingExperience({ durationMs, onComplete });

  const brandLetters = Array.from(content.brand);

  return (
    <main
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface-container-lowest ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex w-full max-w-[320px] flex-col items-center gap-stack-lg px-margin-mobile">
        <h1 className="letter-stagger font-display-lg text-display-lg tracking-tighter text-primary">
          {brandLetters.map((letter, index) => (
            <span key={`${letter}-${index}`}>{letter}</span>
          ))}
        </h1>
        <div
          className="relative mt-4 h-[1px] w-full overflow-hidden bg-surface-container-high"
          role="progressbar"
          aria-label={content.progressLabel}
        >
          <div className="absolute inset-0 h-full w-full scale-x-0 bg-primary animate-progress" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="animate-label-pulse font-label-sm text-label-sm uppercase tracking-[0.4em] text-secondary opacity-60">
            {content.label}
          </span>
        </div>
      </div>
      <div
        className="animate-fade-up absolute bottom-margin-desktop left-0 flex w-full justify-center text-secondary opacity-30"
        style={{ animationDelay: "1.5s" }}
      >
        <p className="font-label-sm text-label-sm uppercase tracking-widest">
          {content.estLabel}
        </p>
      </div>
      {content.backgroundImageUrl ? (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0">
          <img
            alt={content.backgroundImageAlt ?? ""}
            src={content.backgroundImageUrl}
          />
        </div>
      ) : null}
    </main>
  );
}
