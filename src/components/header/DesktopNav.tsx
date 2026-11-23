"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, isActive } from "./NavItems";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden flex-1 justify-center gap-8 md:flex"
      aria-label="Main"
    >
      {navItems
        .filter((i) => !i.mobileOnly)
        .map((i) => {
          const active = isActive(pathname, i.href);
          return (
            <Link
              key={i.id}
              href={i.href}
              aria-current={active ? "page" : undefined}
              className={`border-b-2 py-5 text-sm font-semibold ${
                active
                  ? "border-[#4c2fce] text-[#4c2fce]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {i.label}
            </Link>
          );
        })}
    </nav>
  );
}
