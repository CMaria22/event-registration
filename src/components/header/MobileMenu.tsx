"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, isActive } from "./NavItems";

export default function MobileMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-panel"
        onClick={() => setOpen((o) => !o)}
        className="grid h-11 w-11 place-items-center rounded-lg text-2xl md:hidden"
      >
        ☰
      </button>

      {open && (
        <div
          id="mobile-panel"
          className="absolute inset-x-0 top-full border-b border-t border-slate-200 bg-white px-4 py-4 text-sm md:hidden"
        >
          {children}

          <nav aria-label="Mobile" className="mt-4 flex flex-col gap-1">
            {navItems.map((i) => {
              const active = isActive(pathname, i.href);
              return (
                <Link
                  key={i.id}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 font-semibold ${
                    active
                      ? "bg-violet-100 text-[#4c2fce]"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {i.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
