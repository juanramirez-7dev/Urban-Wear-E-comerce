import { LandingCategoryGrid } from "../components/landing/LandingCategoryGrid";
import { LandingFeaturedProducts } from "../components/landing/LandingFeaturedProducts";
import { LandingHero } from "../components/landing/LandingHero";
import { LandingQuote } from "../components/landing/LandingQuote";

export default function LandingPage() {

  return (
    <div className="bg-surface-container-lowest text-on-background">
      <main className="pt-20">
        <LandingHero/>
        <LandingCategoryGrid/>
        <LandingFeaturedProducts/>
        <LandingQuote />
      </main>
    </div>
  );
}
