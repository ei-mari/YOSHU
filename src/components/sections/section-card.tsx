import Link from "next/link";

import { ProgressBar } from "@/src/components/ui/progress-bar";
import { SectionMeta } from "@/src/types/learning";

export function SectionCard({
  section,
  progress,
}: {
  section: SectionMeta;
  progress: number;
}) {
  return (
    <article className="rounded-[28px] border border-white/70 bg-white p-5 shadow-card">
      <div
        className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white"
        style={{ backgroundColor: section.accent }}
      >
        {section.focus}
      </div>
      <h2 className="font-heading text-xl">{section.title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{section.description}</p>
      <div className="mt-5">
        <ProgressBar value={progress} accent={section.accent} />
      </div>
      <div className="mt-5 flex gap-3">
        <Link
          href={`/sections/${section.id}`}
          className="flex-1 rounded-full bg-ink px-4 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          学習する
        </Link>
        <Link
          href={`/sections/${section.id}/qa`}
          className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Q&A
        </Link>
      </div>
    </article>
  );
}
