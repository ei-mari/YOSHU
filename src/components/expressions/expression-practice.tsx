"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { expressionItems } from "@/src/data/expressions";
import { sectionHomeworkPlans } from "@/src/data/homework";
import { useProgressState } from "@/src/hooks/use-progress-state";
import { SectionId } from "@/src/types/learning";
import { isSectionId } from "@/src/lib/utils";

export function ExpressionPractice({ sectionId: sectionIdProp }: { sectionId?: SectionId }) {
  const searchParams = useSearchParams();
  const sectionFromQuery = searchParams.get("section");
  const sectionId =
    sectionIdProp ?? (sectionFromQuery && isSectionId(sectionFromQuery) ? sectionFromQuery : undefined);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [spokenIds, setSpokenIds] = useState<string[]>([]);
  const { state, setLastVisitedPath, markHomeworkStepDone } = useProgressState();
  const homeworkPlan = sectionId
    ? sectionHomeworkPlans.find((plan) => plan.sectionId === sectionId)
    : undefined;
  const items = homeworkPlan
    ? homeworkPlan.phraseSet.map((phrase, index) => ({
        id: `${homeworkPlan.sectionId}-${index}`,
        english: phrase.english,
        japanese: phrase.japanese,
        role: phrase.role,
      }))
    : expressionItems;
  const phrasesDone = sectionId ? Boolean(state.homework[sectionId]?.phrasesDone) : false;

  useEffect(() => {
    setLastVisitedPath(sectionId ? `/expressions?section=${sectionId}` : "/expressions");
  }, [sectionId, setLastVisitedPath]);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Phrase Practice
        </p>
        <h1 className="mt-3 font-heading text-3xl sm:text-4xl">定型表現 / 音読</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          {homeworkPlan
            ? `${homeworkPlan.goal} のための音読ステップです。必要なときだけ訳を開けます。`
            : "刑事パートの定型表現を、英文を大きく見ながら音読できる画面です。必要なときだけ訳を開けます。"}
        </p>
      </section>

      <section className="grid gap-4">
        {items.map((item) => {
          const isRevealed = revealed[item.id];
          const practiced = spokenIds.includes(item.id);

          return (
            <article key={item.id} className="rounded-[28px] bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {item.role}
                </span>
                {practiced ? (
                  <span className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-ocean">
                    音読済み
                  </span>
                ) : null}
              </div>
              <p className="mt-5 text-3xl font-bold leading-relaxed sm:text-4xl">
                {item.english}
              </p>
              {isRevealed ? (
                <p className="mt-4 text-base text-slate-600">{item.japanese}</p>
              ) : (
                <p className="mt-4 text-sm text-slate-400">訳は必要なときだけ表示</p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setRevealed((current) => ({
                      ...current,
                      [item.id]: !current[item.id],
                    }))
                  }
                  className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  {isRevealed ? "訳を隠す" : "日本語訳を見る"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSpokenIds((current) =>
                      current.includes(item.id) ? current : [...current, item.id],
                    )
                  }
                  className="rounded-full bg-coral px-4 py-3 text-sm font-semibold text-white"
                >
                  音読練習ボタン
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-[28px] bg-ink px-6 py-6 text-white shadow-card">
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">Next Step</p>
        <h2 className="mt-2 font-heading text-2xl">
          {homeworkPlan ? "音読できたら宿題フローへ戻って録音へ" : "音読できたら、そのまま録音へ"}
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/80">
          {homeworkPlan
            ? "このステップを完了にすると、宿題フローで次の録音提出に進めます。"
            : "単文音読、質問返答、ミニロープレの3種類で提出の見た目まで確認できます。"}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {homeworkPlan ? (
            <button
              type="button"
              onClick={() => markHomeworkStepDone(homeworkPlan.sectionId, "phrases")}
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
            >
              {phrasesDone ? "音読完了済み" : "このステップを完了にする"}
            </button>
          ) : null}
          <Link
            href={homeworkPlan ? "/homework" : "/recordings"}
            className="inline-flex rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white"
          >
            {homeworkPlan ? "宿題フローに戻る" : "録音提出画面へ"}
          </Link>
        </div>
      </section>
    </div>
  );
}
