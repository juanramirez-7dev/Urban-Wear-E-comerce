import { Logo } from "./Logo";

export interface FooterLink {
  label: string;
  href: string;
}


export function Footer() {

  const links: Array<FooterLink> = [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Contact", href: "#" }
    ]

  return (
    <footer className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8 bg-surface-container-lowest border-t border-outline-variant">
      <div className="flex flex-col items-center md:items-start gap-4">
        <Logo/>
        <p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
          { "(c) 2026 URBAN Wear Shop" }
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
        {links.map((link) => (
          <a
            key={link.label}
            className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary underline decoration-1 underline-offset-4 transition-all duration-300"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
