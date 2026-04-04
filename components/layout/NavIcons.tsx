"use client";

import { useState } from "react";
import { ShoppingCart, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLogout } from "@/hooks/auth/useLogout";

type NavIconsProps = Readonly<{
  cartCount?: number;
  loggedIn?: boolean; // true if user is logged in
}>;

export default function NavIcons({ cartCount = 0, loggedIn }: NavIconsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logout = useLogout();

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };

  return (
    <div className="flex items-center gap-2 relative">
      {/* Search */}
      <Button variant="ghost" size="icon" aria-label="Search">
        <Search size={20} />
      </Button>

      {/* Profile / Account */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          aria-label="User account"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <User size={20} />
        </Button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-4 w-48 bg-card border border-border rounded-md shadow-lg z-50">
            {loggedIn ? (
              <>
                <Link
                  href="/user/dashboard"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Cart */}
      <div className="relative">
        <Button variant="ghost" size="icon" aria-label="Shopping cart">
          <ShoppingCart size={20} />
        </Button>

        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full px-1.5">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  );
}
