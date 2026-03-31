"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { drillItems } from "@/src/data/drills";
import { sections } from "@/src/data/sections";
import { isAcceptedAnswer } from "@/src/lib/progress";
import { cn } from "@/src/lib/utils";
import { SectionId } from "@/src/types/learning";
import { useProgressState } from "@/src/hooks/use-progress-state";

const promptLabels = {
  ja_to_en: "日本語 → 英語",
  statement_to_question: "肯定文 → 疑問文",
  question_to_short: "質問 → 短い返答",
  question_to_full: "質問 → フルの返答",
} as const;

export function DrillPlayer({ sectionId }: { sectionId: SectionId }) {
  const section = sections.find((item) => item.id === sectionId)!;
  const items = useMemo(
    () => drillItems.filter((item) => item.section === sectionId),
    [sectionId],
  );
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<null | { correct: boolean }>(null);
  const { state, recordAttempt, setLastVisitedPath, toggleStarredItem } = useProgressState();

  const current = items[index];
  const currentLabel = promptLabels[current.type];
  const expectsShort = current.type === "question_to_short";
  const expectsFull = current.type === "question_to_full";
  const isStarred = state.starredItemIds.includes(current.id);

  useEffect(() => {
    setLastVisitedPath(`/sections/${sectionId}/drill`);
  }, [sectionId, setLastVisitedPath]);

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

  function handleRetry() {
    setResult(null);
    setAnswer("");
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: section.accent }}
          >
            {section.title}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            {index + 1} / {items.length}
          </span>
        </div>
        <h1 className="mt-4 font-heading text-3xl">ドリル練習</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          1問ずつ答えて、間違えてもすぐ正解を確認できます。
        </p>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {currentLabel}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {expectsShort
                ? "短く答えてみましょう。"
                : expectsFull
                  ? "必要なら1文で答えましょう。"
                  : "英文を入力してください。"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toggleStarredItem(current.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                isStarred
                  ? "bg-amber-100 text-amber-900"
                  : "border border-slate-300 text-slate-700",
              )}
            >
              {isStarred ? "Starred" : "Star"}
            </button>
            <Link
              href={`/sections/${sectionId}/qa`}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Q&Aへ
            </Link>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {current.type === "ja_to_en" ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                日本語
              </p>
              <p className="text-2xl font-bold leading-relaxed sm:text-4xl">{current.promptJa}</p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                English Prompt
              </p>
              <p className="text-2xl font-bold leading-relaxed sm:text-4xl">{current.promptEn}</p>
              <p className="text-sm text-slate-500">{current.promptJa}</p>
            </>
          )}
        </div>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            あなたの答え
          </label>
          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="ここに英語を入力"
            className="min-h-32 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-lg outline-none ring-0 transition focus:border-slate-400"
          />
          {current.note ? <p className="mt-3 text-sm text-slate-500">{current.note}</p> : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCheck}
            disabled={result !== null || answer.trim().length === 0}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            答え合わせ
          </button>
          <button
            type="button"
            onClick={handleRetry}
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
            className={`mt-6 rounded-[28px] p-5 ${
              result.correct ? "bg-mint text-ocean" : "bg-rose-50 text-rose-900"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">
              {result.correct ? "Correct" : "Check"}
            </p>
            <p className="mt-2 text-lg font-semibold">
              {result.correct ? "そのままでOKです。" : "正解を確認して次に進みましょう。"}
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-semibold">短い答え:</span> {current.answerShort}
              </p>
              <p>
                <span className="font-semibold">1文の例:</span> {current.answerFull}
              </p>
              <p>
                <span className="font-semibold">判定対象:</span>{" "}
                {current.acceptedAnswers.join(" / ")}
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-6 rounded-[28px] bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-700">繰り返したい問題を残す</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            この問題をあとでまとめて復習したいときは `Star` を付けてください。`REVIEW` モードで starred 問題だけを連続で練習できます。
          </p>
        </div>
      </section>
    </div>
  );
}
