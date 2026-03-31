"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useProgressState } from "@/src/hooks/use-progress-state";
import { isAcceptedAnswer } from "@/src/lib/progress";
import { getModeLabel, getRoleLabel } from "@/src/lib/roleplay";
import { cn } from "@/src/lib/utils";
import { PracticeItem, PracticeMode, PracticeRole } from "@/src/types/learning";

export function PracticeSession({
  role,
  mode,
  items,
  path,
  headerRoleLabel,
  emptyTitle,
  emptyBody,
  backHref,
  backLabel,
}: {
  role: PracticeRole;
  mode: PracticeMode;
  items: PracticeItem[];
  path: string;
  headerRoleLabel?: string;
  emptyTitle?: string;
  emptyBody?: string;
  backHref: string;
  backLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<null | { correct: boolean }>(null);
  const { state, setLastVisitedPath, recordAttempt, toggleStarredItem } = useProgressState();

  useEffect(() => {
    setLastVisitedPath(path);
  }, [path, setLastVisitedPath]);

  useEffect(() => {
    if (items.length > 0 && index >= items.length) {
      setIndex(0);
    }
  }, [index, items.length]);

  if (items.length === 0) {
    return (
      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          {headerRoleLabel ?? getRoleLabel(role)}
        </p>
        <h1 className="mt-3 font-heading text-3xl">{emptyTitle ?? "問題がありません"}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {emptyBody ?? "表示できる問題がありません。"}
        </p>
        <Link
          href={backHref}
          className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
        >
          {backLabel}
        </Link>
      </section>
    );
  }

  const current = items[index];
  const isStarred = state.starredItemIds.includes(current.starId);

  function handleCheck() {
    const correct = isAcceptedAnswer(answer, current.acceptedAnswers);
    recordAttempt(current.id, answer, correct);
    setResult({ correct });
  }

  function handleNext() {
    setResult(null);
    setAnswer("");
    setIndex((value) => (value + 1) % items.length);
  }

  function handleReset() {
    setResult(null);
    setAnswer("");
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              {headerRoleLabel ?? getRoleLabel(role)}
            </p>
            <h1 className="mt-3 font-heading text-3xl sm:text-4xl">{getModeLabel(mode)}</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {mode === "instant"
                ? "日本語のヒントから、自分の英語を瞬間的に出します。"
                : "日本語の指示から、自分の英語を組み立てます。"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">{index + 1} / {items.length}</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">{current.stageLabel}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Scene {current.order}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">{current.stageLabel}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toggleStarredItem(current.starId)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold",
                isStarred ? "bg-amber-100 text-amber-900" : "border border-slate-300 text-slate-700",
              )}
            >
              {isStarred ? "Starred" : "Star"}
            </button>
            <Link
              href={backHref}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              {backLabel}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <div className="rounded-[28px] bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {current.partnerLabel}
            </p>
            <p className="mt-3 text-2xl font-bold leading-relaxed sm:text-3xl">
              {current.partnerEnglish}
            </p>
          </div>
          <div className="rounded-[28px] border-2 border-dashed border-slate-300 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {current.learnerLabel}
            </p>
            <p className="mt-3 text-xl font-semibold leading-relaxed sm:text-2xl">
              {current.learnerPromptJa}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            あなたの英語
          </label>
          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="ここに英語を入力"
            className="min-h-32 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-lg outline-none transition focus:border-slate-400"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCheck}
            disabled={result !== null || answer.trim().length === 0}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            答え合わせ
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
          >
            もう一度
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white"
          >
            次へ
          </button>
        </div>

        {result ? (
          <div
            className={cn(
              "mt-6 rounded-[28px] p-5",
              result.correct ? "bg-mint text-ocean" : "bg-rose-50 text-rose-900",
            )}
          >
            <p className="text-lg font-semibold">
              {result.correct ? "そのままでOKです。" : "正解を確認して次に進みましょう。"}
            </p>
            <p className="mt-4 text-sm">
              <span className="font-semibold">正解:</span> {current.answer}
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
