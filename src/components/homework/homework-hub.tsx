"use client";

import Link from "next/link";
import { useEffect } from "react";

import { sections } from "@/src/data/sections";
import {
  HOMEWORK_STEPS,
  getDrillCompletion,
  getNextHomeworkStep,
  getNextSection,
  getRecordingTaskForSection,
  getSectionHomeworkPlan,
  getSectionHomeworkStatus,
} from "@/src/lib/progress";
import { cn } from "@/src/lib/utils";
import { useProgressState } from "@/src/hooks/use-progress-state";

function getStepLink(sectionId: string, recordingTaskId: string, stepKey: string) {
  if (stepKey === "drill") {
    return `/sections/${sectionId}/drill`;
  }

  if (stepKey === "qa") {
    return `/sections/${sectionId}/qa`;
  }

  if (stepKey === "phrases") {
    return `/expressions?section=${sectionId}`;
  }

  return `/recordings?task=${recordingTaskId}`;
}

export function HomeworkHub() {
  const { state, setLastVisitedPath } = useProgressState();
  const currentSection = getNextSection(state);
  const plan = getSectionHomeworkPlan(currentSection.id);
  const drill = getDrillCompletion(currentSection.id, state);
  const status = getSectionHomeworkStatus(currentSection.id, state);
  const nextStep = getNextHomeworkStep(currentSection.id, state);
  const recordingTask = getRecordingTaskForSection(currentSection.id);
  const completedCount = sections.filter((section) => {
    const sectionStatus = getSectionHomeworkStatus(section.id, state);
    return (
      sectionStatus.drillDone &&
      sectionStatus.qaDone &&
      sectionStatus.phrasesDone &&
      sectionStatus.recordingDone
    );
  }).length;

  useEffect(() => {
    setLastVisitedPath("/homework");
  }, [setLastVisitedPath]);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Homework Flow
        </p>
        <h1 className="mt-3 font-heading text-3xl sm:text-4xl">やること一覧</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          宿題でやることを一覧で見ながら、各セクションを step by step で進めます。次に押す場所がわかるように、今やるべきステップを自動で前に出しています。
        </p>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Checklist
            </p>
            <h2 className="mt-2 font-heading text-2xl">宿題タスク一覧</h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            {completedCount} / {sections.length} 完了
          </span>
        </div>

        <div className="mt-6 grid gap-3">
          {sections.map((section) => {
            const sectionStatus = getSectionHomeworkStatus(section.id, state);
            const sectionNextStep = getNextHomeworkStep(section.id, state);
            const sectionRecordingTask = getRecordingTaskForSection(section.id);
            const sectionComplete =
              sectionStatus.drillDone &&
              sectionStatus.qaDone &&
              sectionStatus.phrasesDone &&
              sectionStatus.recordingDone;
            const isCurrentSection = section.id === currentSection.id;

            return (
              <article
                key={section.id}
                className={cn(
                  "rounded-[28px] border p-4 transition",
                  isCurrentSection ? "border-ink bg-slate-50" : "border-slate-200 bg-white",
                )}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                        sectionComplete ? "bg-mint text-ocean" : "bg-slate-100 text-slate-500",
                      )}
                    >
                      {sectionComplete ? "OK" : "TODO"}
                    </div>
                    <div>
                      <p className="font-semibold">{section.title}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {sectionComplete
                          ? "このセクションの宿題は完了しています。"
                          : `次は ${HOMEWORK_STEPS.find((step) => step.key === sectionNextStep)?.title} を進めます。`}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={getStepLink(section.id, sectionRecordingTask.id, sectionNextStep)}
                    className={cn(
                      "rounded-full px-4 py-3 text-sm font-semibold",
                      isCurrentSection ? "bg-ink text-white" : "border border-slate-300 text-slate-700",
                    )}
                  >
                    {sectionComplete ? "見直す" : "ここから進める"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] bg-ink p-6 text-white shadow-card">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">Current Section</p>
          <h2 className="mt-3 font-heading text-3xl">{currentSection.title}</h2>
          <p className="mt-4 text-sm leading-7 text-white/80">{plan.goal}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-sm text-white/60">次のステップ</p>
              <p className="mt-1 text-xl font-semibold">
                {HOMEWORK_STEPS.find((step) => step.key === nextStep)?.title}
              </p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-sm text-white/60">完了セクション</p>
              <p className="mt-1 text-xl font-semibold">
                {completedCount} / {sections.length}
              </p>
            </div>
          </div>
          <p className="mt-5 rounded-3xl bg-white/10 p-4 text-sm leading-7 text-white/85">
            {plan.coachingTip}
          </p>
          <Link
            href={getStepLink(currentSection.id, recordingTask.id, nextStep)}
            className="mt-5 inline-flex rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white"
          >
            今のステップを開く
          </Link>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Quick Status
          </p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">ドリル</p>
              <p className="mt-1 text-lg font-semibold">
                {drill.attempted} / {drill.total} 問
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Q&A</p>
              <p className="mt-1 text-lg font-semibold">
                {status.qaDone ? "完了" : "未完了"}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">音読</p>
              <p className="mt-1 text-lg font-semibold">
                {status.phrasesDone ? "完了" : "未完了"}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">録音提出</p>
              <p className="mt-1 text-lg font-semibold">
                {status.recordingDone ? "提出済み" : recordingTask.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Step By Step
            </p>
            <h2 className="mt-2 font-heading text-2xl">宿題の進め方</h2>
          </div>
          <Link href="/review" className="text-sm font-semibold text-slate-500">
            復習はサブ機能へ
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {HOMEWORK_STEPS.map((step, index) => {
            const isDone =
              step.key === "drill"
                ? status.drillDone
                : step.key === "qa"
                  ? status.qaDone
                  : step.key === "phrases"
                    ? status.phrasesDone
                    : status.recordingDone;
            const isCurrent = nextStep === step.key || (isDone && step.key === "recording");

            return (
              <article
                key={step.key}
                className={cn(
                  "rounded-[28px] border p-5 transition",
                  isCurrent ? "border-ink bg-slate-50" : "border-slate-200 bg-white",
                )}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                        isDone ? "bg-mint text-ocean" : "bg-slate-100 text-slate-500",
                      )}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p>
                      {step.key === "drill" ? (
                        <p className="mt-2 text-sm text-slate-500">
                          {drill.attempted} / {drill.total} 問に挑戦済み
                        </p>
                      ) : null}
                      {step.key === "phrases" ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {plan.phraseSet.slice(0, 3).map((phrase) => (
                            <span
                              key={phrase.english}
                              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                            >
                              {phrase.english}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      {step.key === "recording" ? (
                        <p className="mt-2 text-sm text-slate-500">{recordingTask.title}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold",
                        isDone ? "bg-mint text-ocean" : "bg-amber-100 text-amber-900",
                      )}
                    >
                      {isDone ? "完了" : "これから"}
                    </span>
                    <Link
                      href={getStepLink(currentSection.id, recordingTask.id, step.key)}
                      className={cn(
                        "rounded-full px-4 py-3 text-sm font-semibold",
                        isCurrent ? "bg-ink text-white" : "border border-slate-300 text-slate-700",
                      )}
                    >
                      {isDone ? "見直す" : "進む"}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
