"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/store/authStore";

type NavLink = {
  name: string;
  href: string;
};

const links: NavLink[] = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "New", href: "/new" },
  { name: "Sale", href: "/sale" },
];

export default function MobileNav() {
  const { user, isAuthenticated } = useAuthStore();
  const isAdmin = isAuthenticated && user?.role === "admin";
  return (
    <div className="md:hidden">
      <Sheet>
        {/* Hamburger Trigger */}
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu size={24} />
          </Button>
        </SheetTrigger>

        {/* Sheet Content */}
        <SheetContent
          side="left"
          className="w-64 p-6 flex flex-col h-full justify-start"
        >
          {/* Sheet Header with Title + Close Button */}
          <SheetHeader className="flex items-center justify-between mb-8">
            <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
          </SheetHeader>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium hover:text-primary transition"
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="font-medium text-primary"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
