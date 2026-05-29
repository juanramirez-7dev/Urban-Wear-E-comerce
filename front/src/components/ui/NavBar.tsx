import { NavLink, Link } from "react-router";
import { IconShoppingBag, IconUser } from "@tabler/icons-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import type { MeResponseType } from "../../types/authTypes";
import { Logo } from "./Logo";

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface UserModalProps {
  user: MeResponseType;
  logout: () => void;
}


export function NavBar() {

  const links: Array<NavLink> = [
    { label: "Inicio", href: "/" },
    { label: "Tienda", href: "/shop" },
  ]

  const { user } = useAuth()
  const { carrito } = useCart()
  const cartItemsCount = carrito?.items.reduce(
    (total, item) => total + item.cantidad,
    0
  ) ?? 0

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 bg-surface-container-lowest border-b border-outline-variant">
      <div className="flex items-center gap-12">
        <Logo/>
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <NavLink
              key={link.label}
              className={ ({ isActive }) =>
                  isActive
                  ? "font-label-md text-label-md uppercase tracking-widest text-primary border-b border-primary pb-1 transition-colors duration-300"
                  : "font-label-md text-label-md uppercase tracking-widest text-secondary pb-1 hover:text-primary transition-colors duration-300"
              }
              to={link.href}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/cart"
          className="relative cursor-pointer active:opacity-70"
          aria-label={`Open cart with ${cartItemsCount} items`}
        >
          <IconShoppingBag />
          {cartItemsCount > 0 ? (
            <span className="absolute -right-2 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-bold leading-none text-on-primary">
              {cartItemsCount}
            </span>
          ) : null}
        </Link>
        {
          !user ? (
            <Link to="/login" className="cursor-pointer active:opacity-70" aria-label="Open account">
              <IconUser/>
            </Link>
          ) : (
            <Link to={user.role === "Admin" ? "/admin": "/cliente"} className="font-label-md text-label-md uppercase tracking-widest text-secondary dark:text-secondary-fixed-dim">
              { user.name }
            </Link>
          )
        }
      </div>
    </nav>
  );
}
