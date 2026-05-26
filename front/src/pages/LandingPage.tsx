import { landingPageContent } from "../data/mockData";
import { LandingCategoryGrid } from "../components/landing/LandingCategoryGrid";
import { LandingFeaturedProducts } from "../components/landing/LandingFeaturedProducts";
import { LandingHero } from "../components/landing/LandingHero";
import { LandingQuote } from "../components/landing/LandingQuote";

export default function LandingPage() {
  const {   categories, featured, quote } = landingPageContent;

  return (
    <div className="bg-surface-container-lowest text-on-background">
      <main>
        <LandingHero/>
        <LandingCategoryGrid
          primary={categories.primary}
          secondary={categories.secondary}
        />
        <LandingFeaturedProducts
          label={featured.label}
          title={featured.title}
          viewAllLabel={featured.viewAllLabel}
        />
        <LandingQuote text={quote.text} label={quote.label} />
      </main>
    </div>
  );
}
