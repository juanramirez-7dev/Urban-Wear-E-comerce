import { useEffect } from "react";

export interface UseLoadingExperienceOptions {
  readonly durationMs?: number;
  readonly onComplete?: () => void;
}

export const useLoadingExperience = ({
  durationMs = 3500,
  onComplete
}: UseLoadingExperienceOptions) => {
  useEffect(() => {
    if (!onComplete) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [durationMs, onComplete]);
};
