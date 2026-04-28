// "use client";

// import { useState } from "react";
// import { ShoppingCart, Search, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useLogout } from "@/hooks/auth/useLogout";

// type NavIconsProps = Readonly<{
//   cartCount?: number;
//   loggedIn?: boolean; // true if user is logged in
// }>;

// export default function NavIcons({ cartCount = 0, loggedIn }: NavIconsProps) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const logout = useLogout();

//   const handleLogout = () => {
//     setDropdownOpen(false);
//     logout();
//   };

//   return (
//     <div className="flex items-center gap-2 relative">
//       {/* Search */}
//       <Button variant="ghost" size="icon" aria-label="Search">
//         <Search size={20} />
//       </Button>

//       {/* Profile / Account */}
//       <div className="relative">
//         <Button
//           variant="ghost"
//           size="icon"
//           aria-label="User account"
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//         >
//           <User size={20} />
//         </Button>

//         {/* Dropdown */}
//         {dropdownOpen && (
//           <div className="absolute right-0 mt-4 w-48 bg-card border border-border rounded-md shadow-lg z-50">
//             {loggedIn ? (
//               <>
//                 <Link
//                   href="/user/dashboard"
//                   className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/login"
//                   className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Cart */}
//       <div className="relative">
//         <Button variant="ghost" size="icon" aria-label="Shopping cart">
//           <ShoppingCart size={20} />
//         </Button>

//         {cartCount > 0 && (
//           <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full px-1.5">
//             {cartCount}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Search,
  User,
  LogOut,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLogout } from "@/hooks/auth/useLogout";
import { CartDrawer } from "../product-browsing/CartDrawer";
import { useCartStore } from "@/store/useCartStore";
import { NavNotificationIcon } from "../newsletter/NavNotificationIcon";

type NavIconsProps = Readonly<{
  loggedIn?: boolean;
}>;

export default function NavIcons({ loggedIn }: NavIconsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Refs for outside click detection
  const dropdownRef = useRef<HTMLDivElement>(null);

  const logout = useLogout();
  const { items } = useCartStore();
  const cartCount = items?.length || 0;

  // Handle Hydration & Outside Click
  useEffect(() => {
    setIsMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };

  const dropdownItemClass =
    "flex items-center gap-3 w-full px-4 py-3 text-[11px] font-black uppercase italic tracking-widest text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl";

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-3 relative">
      {/* 🔍 Search Button */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          document.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "k",
              ctrlKey: true,
              bubbles: true,
            }),
          );
        }}
        className="rounded-xl hover:bg-slate-100 text-slate-600"
      >
        <Search size={20} />
      </Button>

      {/* 🟢 🔔 Notification Icon (Placed here for high visibility) */}
      <NavNotificationIcon />

      {/* 👤 Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`rounded-xl transition-all ${
            dropdownOpen
              ? "bg-slate-900 text-white shadow-lg"
              : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <User size={20} />
        </Button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-4 w-56 bg-white border border-slate-100 rounded-[1.5rem] shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-1">
              {loggedIn ? (
                <>
                  <Link
                    href="/user/dashboard"
                    className={dropdownItemClass}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LayoutDashboard size={14} className="opacity-50" />
                    Dashboard
                  </Link>
                  <button
                    className={`${dropdownItemClass} text-red-500 hover:!text-red-600 hover:bg-red-50`}
                    onClick={handleLogout}
                  >
                    <LogOut size={14} className="opacity-50" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className={dropdownItemClass}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LogIn size={14} className="opacity-50" />
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={dropdownItemClass}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <UserPlus size={14} className="opacity-50" />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 🛍️ Cart Section */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Shopping cart"
          onClick={() => setIsCartOpen(true)}
          className={`rounded-xl transition-all ${
            isCartOpen
              ? "bg-indigo-600 text-white shadow-lg"
              : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <ShoppingCart size={20} />
        </Button>

        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-indigo-600 text-white border-2 border-white rounded-full flex items-center justify-center text-[9px] font-black italic shadow-md animate-in zoom-in duration-300 pointer-events-none">
            {cartCount}
          </span>
        )}
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
