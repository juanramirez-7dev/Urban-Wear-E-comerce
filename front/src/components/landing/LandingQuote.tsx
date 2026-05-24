export interface LandingQuoteProps {
  text: string;
  label: string;
}

export function LandingQuote({ text, label }: Readonly<LandingQuoteProps>) {
  return (
    <section className="py-32 bg-surface-container-lowest text-center px-margin-mobile">
      <div className="max-w-4xl mx-auto">
        <span className="material-symbols-outlined text-primary text-5xl mb-8">
          format_quote
        </span>
        <p className="font-display-lg text-display-lg-mobile md:text-display-lg italic leading-tight text-primary">
          "{text}"
        </p>
        <div className="mt-12 h-px w-24 bg-primary mx-auto"></div>
        <p className="mt-8 font-label-md text-label-md uppercase tracking-[0.3em] text-secondary">
          {label}
        </p>
      </div>
    </section>
  );
}
