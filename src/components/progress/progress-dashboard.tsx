"use client";

import Link from "next/link";

import { sections } from "@/src/data/sections";
import {
  getMistakeItems,
  getOverallProgress,
  getSectionProgress,
  getStarredItems,
} from "@/src/lib/progress";
import { cn } from "@/src/lib/utils";
import { useProgressState } from "@/src/hooks/use-progress-state";

export function ProgressDashboard() {
  const { state, toggleStarredItem } = useProgressState();
  const overview = getOverallProgress(state);
  const mistakes = getMistakeItems(state);
  const starredItems = getStarredItems(state);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Progress
        </p>
        <h1 className="mt-3 font-heading text-3xl sm:text-4xl">進捗画面</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          セクション別の正答率、完了数、録音提出数、やり直し導線をまとめています。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-[28px] bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">総合正答率</p>
          <p className="mt-2 text-4xl font-bold text-ink">{Math.round(overview.percent)}%</p>
        </div>
        <div className="rounded-[28px] bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">完了数</p>
          <p className="mt-2 text-4xl font-bold text-ink">
            {overview.correct} / {overview.total}
          </p>
        </div>
        <div className="rounded-[28px] bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">録音提出数</p>
          <p className="mt-2 text-4xl font-bold text-ink">
            {overview.submittedRecordings} / {overview.totalRecordings}
          </p>
        </div>
        <div className="rounded-[28px] bg-white p-5 shadow-card">
          <p className="text-sm text-slate-500">Starred問題</p>
          <p className="mt-2 text-4xl font-bold text-ink">{starredItems.length}</p>
        </div>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-2xl">REVIEWモード</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Star を付けた問題だけを連続で回せます。
            </p>
          </div>
          <Link
            href="/review"
            className={cn(
              "rounded-full px-4 py-3 text-sm font-semibold",
              starredItems.length > 0
                ? "bg-ink text-white"
                : "bg-slate-200 text-slate-400",
            )}
            aria-disabled={starredItems.length === 0}
          >
            REVIEWを開く
          </Link>
        </div>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <h2 className="font-heading text-2xl">セクション別正答率</h2>
        <div className="mt-5 grid gap-3">
          {sections.map((section) => {
            const stats = getSectionProgress(section.id, state);

            return (
              <div key={section.id} className="rounded-3xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{section.title}</p>
                    <p className="text-sm text-slate-500">
                      {stats.correct} / {stats.total} 問 正解
                    </p>
                  </div>
                  <Link
                    href={`/sections/${section.id}/drill`}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    学習する
                  </Link>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${stats.percent}%`, backgroundColor: section.accent }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-2xl">間違えた問題を再挑戦</h2>
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
            {mistakes.length} 問
          </span>
        </div>
        <div className="mt-5 space-y-3">
          {mistakes.length > 0 ? (
            mistakes.map((item) => (
              <div key={item.id} className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {item.type.replaceAll("_", " ")}
                </p>
                <p className="mt-2 font-semibold">{item.promptEn}</p>
                <p className="mt-1 text-sm text-slate-600">{item.promptJa}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/sections/${item.section}/drill`}
                    className="inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                  >
                    このセクションをやり直す
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleStarredItem(item.id)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold",
                      state.starredItemIds.includes(item.id)
                        ? "bg-amber-100 text-amber-900"
                        : "border border-slate-300 text-slate-700",
                    )}
                  >
                    {state.starredItemIds.includes(item.id) ? "Starred" : "Star"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl bg-mint p-4 text-ocean">
              まだ間違い履歴はありません。最初のセクションから始めましょう。
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
