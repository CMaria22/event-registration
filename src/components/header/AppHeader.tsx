"use client"; 

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, isActive } from "./NavItems";

type Props = { userName?: string };

export default function AppHeader({ userName = "Alice" }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-slate-900"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#4c2fce] text-white md:h-10 md:w-10">
            ✦
          </span>
          Gatherly
        </Link>

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

        <div className="flex-1 md:hidden" />

        <div className="hidden items-center gap-3 text-sm md:flex">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
            DEMO
          </span>
          <span className="text-slate-500">
            Viewing as <b className="text-slate-900">{userName}</b> ▾
          </span>
        </div>

        <span className="grid h-10 w-10 place-items-center rounded-full bg-violet-100 font-bold text-violet-700">
          {userName[0]}
        </span>

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
      </div>

      {open && (
        <div
          id="mobile-panel"
          className="border-t border-slate-200 px-4 py-4 text-sm md:hidden"
        >
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-[#4c2fce]">
              DEMO
            </span>
            <span className="text-slate-500">
              Viewing as <b className="text-slate-900">{userName}</b>
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
