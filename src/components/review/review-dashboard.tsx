"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { PracticeSession } from "@/src/components/practice/practice-session";
import { useProgressState } from "@/src/hooks/use-progress-state";
import { getModeLabel, getRoleLabel, getStarredPracticeItems } from "@/src/lib/roleplay";
import { PracticeMode, PracticeRole } from "@/src/types/learning";

export function ReviewDashboard() {
  const [role, setRole] = useState<PracticeRole | "all">("all");
  const [mode, setMode] = useState<PracticeMode>("instant");
  const { state, setLastVisitedPath } = useProgressState();

  useEffect(() => {
    setLastVisitedPath("/review");
  }, [setLastVisitedPath]);

  const items = useMemo(() => getStarredPracticeItems(state, role, mode), [mode, role, state]);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          REVIEW
        </p>
        <h1 className="mt-3 font-heading text-3xl sm:text-4xl">Starred セリフを復習</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          練習中に `Star` を付けたセリフだけを、好きな役と練習タイプで回せます。
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {(["all", "detective", "suspect"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRole(value)}
              className={`rounded-full px-4 py-3 text-sm font-semibold ${
                role === value ? "bg-ink text-white" : "border border-slate-300 text-slate-700"
              }`}
            >
              {value === "all" ? "両方" : getRoleLabel(value)}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          {(["instant", "mission"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={`rounded-full px-4 py-3 text-sm font-semibold ${
                mode === value ? "bg-coral text-white" : "border border-slate-300 text-slate-700"
              }`}
            >
              {getModeLabel(value)}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-3xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">現在の REVIEW 件数</p>
          <p className="mt-1 text-3xl font-bold text-ink">{items.length}</p>
        </div>
      </section>

      <PracticeSession
        role={role === "all" ? "detective" : role}
        mode={mode}
        items={items}
        path="/review"
        headerRoleLabel="REVIEW"
        emptyTitle="Starred セリフがありません"
        emptyBody="刑事モードまたは容疑者モードで Star を付けると、ここでまとめて復習できます。"
        backHref="/"
        backLabel="ホームへ"
      />

      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-2xl">モードへ戻る</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              新しく Star を付けたいときは、各モードの練習画面に戻れます。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/modes/detective"
              className="rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white"
            >
              刑事モード
            </Link>
            <Link
              href="/modes/suspect"
              className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"
            >
              容疑者モード
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
