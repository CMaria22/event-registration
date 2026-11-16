"use client"; // needs usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, isActive } from "./NavItems";
import { Icon } from "./Icon";

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-20 flex border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {navItems.map((i) => {
        const active = isActive(pathname, i.href);
        return (
          <Link
            key={i.id}
            href={i.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold ${
              active ? "text-violet-700" : "text-slate-500"
            }`}
          >
            <Icon name={i.icon} />
            {i.shortLabel}
          </Link>
        );
      })}
    </nav>
  );
}
