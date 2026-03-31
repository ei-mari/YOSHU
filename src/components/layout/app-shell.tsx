import Link from "next/link";
import { ReactNode } from "react";

import { MainNav } from "@/src/components/layout/main-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(249,115,96,0.18),_transparent_35%),linear-gradient(180deg,_#fffdf8_0%,_#f7f2e8_100%)] text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-6 pt-5 sm:px-6">
        <header className="mb-6 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Roleplay HW
            </span>
            <span className="font-heading text-sm text-slate-600 sm:text-base">
              English Detective Practice
            </span>
          </Link>
          <Link
            href="/review"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5"
          >
            REVIEW
          </Link>
        </header>

        <main className="flex-1">{children}</main>
        <MainNav />
      </div>
    </div>
  );
}
