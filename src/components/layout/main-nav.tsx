"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/src/lib/utils";

const navItems = [
  { href: "/modes/detective", label: "刑事" },
  { href: "/modes/suspect", label: "容疑者" },
  { href: "/review", label: "REVIEW" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-4 z-20 mx-auto mt-8 w-full max-w-xl rounded-full border border-white/60 bg-white/85 p-2 shadow-card backdrop-blur">
      <ul className="grid grid-cols-3 gap-1 text-center text-xs font-semibold text-slate-500 sm:text-sm">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-full px-2 py-3 transition",
                  active ? "bg-ink text-white" : "hover:bg-slate-100",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
