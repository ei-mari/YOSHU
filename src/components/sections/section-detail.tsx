"use client";

import Link from "next/link";
import { useEffect } from "react";

import { drillItems } from "@/src/data/drills";
import { sections } from "@/src/data/sections";
import { getSectionProgress } from "@/src/lib/progress";
import { SectionId } from "@/src/types/learning";
import { useProgressState } from "@/src/hooks/use-progress-state";

export function SectionDetail({ sectionId }: { sectionId: SectionId }) {
  const section = sections.find((item) => item.id === sectionId)!;
  const { state, setLastVisitedPath } = useProgressState();
  const progress = getSectionProgress(sectionId, state);
  const relatedItems = drillItems.filter((item) => item.section === sectionId);

  useEffect(() => {
    setLastVisitedPath(`/sections/${sectionId}`);
  }, [sectionId, setLastVisitedPath]);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div
          className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: section.accent }}
        >
          {section.focus}
        </div>
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl">{section.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          {section.description}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">正解数</p>
            <p className="mt-1 text-2xl font-bold">{progress.correct}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">挑戦済み</p>
            <p className="mt-1 text-2xl font-bold">{progress.attempted}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">全問題</p>
            <p className="mt-1 text-2xl font-bold">{progress.total}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] bg-white p-5 shadow-card">
          <h2 className="font-heading text-2xl">このセクションでやること</h2>
          <div className="mt-5 grid gap-3">
            <Link
              href={`/sections/${sectionId}/drill`}
              className="rounded-3xl bg-ink px-5 py-5 text-white transition hover:-translate-y-0.5"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">Drill</p>
              <p className="mt-2 text-xl font-semibold">1問ずつドリル練習</p>
            </Link>
            <Link
              href={`/sections/${sectionId}/qa`}
              className="rounded-3xl bg-mint px-5 py-5 text-ocean transition hover:-translate-y-0.5"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-ocean/60">Q&A</p>
              <p className="mt-2 text-xl font-semibold">短く答える → 1文で答える</p>
            </Link>
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-5 shadow-card">
          <h2 className="font-heading text-2xl">問題例</h2>
          <div className="mt-5 space-y-3">
            {relatedItems.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {item.type.replaceAll("_", " ")}
                </p>
                <p className="mt-2 font-semibold">{item.promptEn}</p>
                <p className="mt-1 text-sm text-slate-600">{item.promptJa}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
