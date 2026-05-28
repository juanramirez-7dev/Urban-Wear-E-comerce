import { useState } from "react";
import { NavLink, Link } from "react-router";
import { IconShoppingBag, IconUser, IconCircleChevronDown } from "@tabler/icons-react";
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

  const { user, logout } = useAuth()
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
            <UserModal user={user} logout={logout}/>
          )
        }
      </div>
    </nav>
  );
}

function UserModal({ user, logout }: UserModalProps) {

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleToggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev)
  }

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={handleToggleUserMenu}
        className="flex items-center gap-1 cursor-pointer active:opacity-70"
        aria-haspopup="menu"
        aria-expanded={isUserMenuOpen}
      >
        <span className="font-label-md text-label-md uppercase tracking-widest text-secondary dark:text-secondary-fixed-dim">
          { user.name }
        </span>
        <IconCircleChevronDown
          className={`text-secondary dark:text-secondary-fixed-dim transition-transform duration-200 ${
            isUserMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isUserMenuOpen ? (
        <div
          className="absolute right-0 top-full mt-3 w-40 rounded-lg border border-outline-variant bg-surface-container-lowest shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          role="menu"
        >
          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left font-label-md text-label-md uppercase tracking-widest text-secondary transition-colors duration-200 hover:text-primary"
            role="menuitem"
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  )
}