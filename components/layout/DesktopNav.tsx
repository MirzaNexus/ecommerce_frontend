import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

type NavLink = {
  name: string;
  href: string;
};

const links: NavLink[] = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "New", href: "/new" },
  { name: "Products", href: "/products" },
];

export default function DesktopNav() {
  const { user, isAuthenticated } = useAuthStore();
  const isAdmin = isAuthenticated && user?.role === "admin";
  return (
    <nav
      className="hidden md:flex items-center gap-8"
      aria-label="Main navigation"
    >
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-sm font-medium hover:opacity-70 transition"
        >
          {link.name}
        </Link>
      ))}
      {isAdmin && (
        <Link href="/admin/dashboard" className="font-medium text-primary">
          Dashboard
        </Link>
      )}
    </nav>
  );
}
