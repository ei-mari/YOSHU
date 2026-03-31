"use client";

import { SectionCard } from "@/src/components/sections/section-card";
import { sections } from "@/src/data/sections";
import { getSectionProgress } from "@/src/lib/progress";
import { useProgressState } from "@/src/hooks/use-progress-state";

export function SectionsOverview() {
  const { state } = useProgressState();

  return (
    <div>
      <section className="mb-6 rounded-[32px] bg-white/80 px-6 py-7 shadow-card backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Sections
        </p>
        <h1 className="mt-3 font-heading text-3xl sm:text-4xl">セクション一覧</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          文法ごとに短く区切って反復できます。各セクションからドリルとQ&A練習に進めます。
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            progress={getSectionProgress(section.id, state).percent}
          />
        ))}
      </section>
    </div>
  );
}
