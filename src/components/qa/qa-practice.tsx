"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { drillItems } from "@/src/data/drills";
import { sections } from "@/src/data/sections";
import { SectionId } from "@/src/types/learning";
import { useProgressState } from "@/src/hooks/use-progress-state";

export function QaPractice({ sectionId }: { sectionId: SectionId }) {
  const section = sections.find((item) => item.id === sectionId)!;
  const items = useMemo(
    () =>
      drillItems.filter(
        (item) =>
          item.section === sectionId &&
          (item.type === "question_to_short" || item.type === "question_to_full"),
      ),
    [sectionId],
  );
  const [index, setIndex] = useState(0);
  const [showExample, setShowExample] = useState(false);
  const [draft, setDraft] = useState("");
  const { state, setLastVisitedPath, markHomeworkStepDone } = useProgressState();

  useEffect(() => {
    setLastVisitedPath(`/sections/${sectionId}/qa`);
  }, [sectionId, setLastVisitedPath]);

  const current = items[index];
  const qaDone = Boolean(state.homework[sectionId]?.qaDone);

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
            {items.length} 問
          </span>
        </div>
        <h1 className="mt-4 font-heading text-3xl">Q&A練習</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          まず短く答えて、そのあとで1文の答え例も確認できます。
        </p>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Question {index + 1}
          </p>
          <Link
            href={`/sections/${sectionId}/drill`}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            ドリルへ
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            English
          </p>
          <p className="mt-2 text-3xl font-bold sm:text-4xl">{current.promptEn}</p>
          <p className="mt-3 text-sm text-slate-500">{current.promptJa}</p>
        </div>

        <div className="mt-8 rounded-[28px] bg-slate-50 p-5">
          <label className="block text-sm font-semibold text-slate-600">まずは自分で答える</label>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="短く答えてみましょう"
            className="mt-3 min-h-28 w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 text-lg outline-none transition focus:border-slate-400"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowExample((value) => !value)}
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              {showExample ? "答え例を閉じる" : "答え例を見る"}
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft("");
                setShowExample(false);
                setIndex((value) => (value + 1) % items.length);
              }}
              className="rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white"
            >
              次の質問
            </button>
          </div>
        </div>

        {showExample ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] bg-mint p-5 text-ocean">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">Short Answer</p>
              <p className="mt-2 text-2xl font-bold">{current.answerShort}</p>
            </div>
            <div className="rounded-[28px] bg-slate-100 p-5 text-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">Full Sentence</p>
              <p className="mt-2 text-2xl font-bold">{current.answerFull}</p>
            </div>
          </div>
        ) : null}

        <div className="mt-6 rounded-[28px] bg-slate-50 p-5">
          <p className="text-sm leading-7 text-slate-600">
            宿題フローでは、この画面で短く答える練習ができたら完了にします。
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => markHomeworkStepDone(sectionId, "qa")}
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              {qaDone ? "Q&A完了済み" : "このステップを完了にする"}
            </button>
            <Link
              href="/homework"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
            >
              宿題フローに戻る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
