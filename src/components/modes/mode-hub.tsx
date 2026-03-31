"use client";

import Link from "next/link";
import { useEffect } from "react";

import { useProgressState } from "@/src/hooks/use-progress-state";
import { getModeDescription, getRoleLabel } from "@/src/lib/roleplay";
import { PracticeMode, PracticeRole } from "@/src/types/learning";

const modeCards: Array<{ mode: PracticeMode; color: string }> = [
  { mode: "instant", color: "bg-ink text-white" },
  { mode: "mission", color: "bg-mint text-ocean" },
];

export function ModeHub({ role }: { role: PracticeRole }) {
  const { state, setLastVisitedPath } = useProgressState();
  const roleLabel = getRoleLabel(role);

  useEffect(() => {
    setLastVisitedPath(`/modes/${role}`);
  }, [role, setLastVisitedPath]);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Mode</p>
        <h1 className="mt-3 font-heading text-3xl sm:text-4xl">{roleLabel}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          {role === "detective"
            ? "質問する側として、流れを作る英語を練習します。"
            : "答える側として、短く自然な返答を練習します。"}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {modeCards.map((card) => (
          <Link
            key={card.mode}
            href={`/modes/${role}/${card.mode}`}
            className={`rounded-[32px] p-6 shadow-card transition hover:-translate-y-1 ${card.color}`}
          >
            <p className="text-sm uppercase tracking-[0.2em] opacity-70">Practice</p>
            <h2 className="mt-3 font-heading text-3xl">
              {card.mode === "instant" ? "瞬間英作文モード" : "ミッションモード"}
            </h2>
            <p className="mt-4 text-sm leading-7 opacity-90">{getModeDescription(card.mode)}</p>
            <span className="mt-6 inline-flex rounded-full bg-white/15 px-4 py-3 text-sm font-semibold">
              開く
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-2xl">REVIEW への保存</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              練習中に `Star` を押すと、そのセリフだけ REVIEW に残せます。
            </p>
          </div>
          <Link
            href="/review"
            className="rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white"
          >
            REVIEW
          </Link>
        </div>
        <div className="mt-5 rounded-3xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Starred セリフ</p>
          <p className="mt-1 text-2xl font-bold text-ink">{state.starredItemIds.length}</p>
        </div>
      </section>
    </div>
  );
}
