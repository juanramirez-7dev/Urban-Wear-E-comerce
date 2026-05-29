import heroImage from '../../assets/heroImage.png'
import { Link } from 'react-router';


export function LandingHero() {
  return (
    <header className="relative min-h-[calc(100svh-5rem)] w-full flex items-center overflow-hidden">
      <img
        alt="Urban Wear clothing store hero background"
        className="absolute inset-0 h-full w-full object-cover object-top"
        src={heroImage}
      />
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl">
          <h1 className="text-on-primary font-display-lg text-display-lg-mobile md:text-display-lg mb-stack-md leading-none">
            URBAN WEAR
          </h1>
          <p className="text-on-primary font-body-lg text-body-lg max-w-lg mb-stack-lg opacity-90">
            Ropa urbana de alta calidad para los amantes del estilo y la comodidad. Descubre las últimas tendencias en moda urbana con nosotros.
          </p>
          <Link to="/shop" className="bg-surface-container-lowest text-primary px-12 py-5 font-label-md text-label-md uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-500">
            Ver Ahora
          </Link>
        </div>
      </div>
    </header>
  );
}
