"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
  name: string;
  href: string;
};

export default function DashboardSidebar({ items }: { items: Item[] }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile (Top Tabs) */}
      <div className="md:hidden flex gap-2 overflow-x-auto mb-4">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`px-4 py-2 rounded-md text-sm whitespace-nowrap ${
              pathname === item.href ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-card border border-border rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>

        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm ${
                pathname === item.href
                  ? "bg-primary text-white"
                  : "hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
