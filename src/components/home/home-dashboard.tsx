"use client";

import Link from "next/link";

import { sections } from "@/src/data/sections";
import {
  HOMEWORK_STEPS,
  getCompletedHomeworkCount,
  getDailyTaskCards,
  getNextHomeworkStep,
  getOverallProgress,
  getRecordingTaskForSection,
  getSectionProgress,
  getSectionHomeworkStatus,
  getNextSection,
  getStarredItems,
  getUnsubmittedRecordings,
} from "@/src/lib/progress";
import { useProgressState } from "@/src/hooks/use-progress-state";

export function HomeDashboard() {
  const { state, isReady } = useProgressState();
  const overview = getOverallProgress(state);
  const completedHomework = getCompletedHomeworkCount(state);
  const starredItems = getStarredItems(state);
  const dailyTasks = getDailyTaskCards(state);
  const pendingRecordings = getUnsubmittedRecordings(state);
  const nextSection = getNextSection(state);
  const nextStep = getNextHomeworkStep(nextSection.id, state);
  const nextRecording = getRecordingTaskForSection(nextSection.id);
  const nextStatus = getSectionHomeworkStatus(nextSection.id, state);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-ink px-6 py-8 text-white shadow-card">
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">Main Function</p>
        <h1 className="mt-3 font-heading text-3xl leading-tight sm:text-5xl">
          迷わず終えられる
          <br />
          宿題フロー
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
          主機能は「今日の宿題を最後まで進めること」です。復習や進捗確認は必要なときだけ使えるサブ機能として分けています。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/homework"
            className="rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            今日の宿題を始める
          </Link>
          <Link
            href={state.lastVisitedPath && state.lastVisitedPath !== "/" ? state.lastVisitedPath : "/homework"}
            className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white"
          >
            前回の続き
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-white/70 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl">次にやること</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
              {isReady ? "ローカル保存" : "読み込み中"}
            </span>
          </div>
          <div className="mt-5 rounded-[28px] bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              今日のセクション
            </p>
            <p className="mt-2 text-2xl font-bold">{nextSection.title}</p>
            <p className="mt-2 text-sm text-slate-600">
              {HOMEWORK_STEPS.find((step) => step.key === nextStep)?.title} から始めればOKです。
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-4">
                <p className="text-sm text-slate-500">今の状態</p>
                <p className="mt-1 text-lg font-semibold">
                  {nextStatus.drillDone ? "ドリル完了" : "ドリル途中"}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-4">
                <p className="text-sm text-slate-500">提出する録音</p>
                <p className="mt-1 text-lg font-semibold">{nextRecording.title}</p>
              </div>
            </div>
            <Link
              href="/homework"
              className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              宿題フローを開く
            </Link>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white p-5 shadow-card">
          <h2 className="font-heading text-2xl">宿題の進み具合</h2>
          <div className="mt-5 grid gap-3 text-sm">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-slate-500">宿題完了セクション</p>
              <p className="mt-1 text-3xl font-bold text-ink">
                {completedHomework} / {sections.length}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-slate-500">録音提出</p>
              <p className="mt-1 text-3xl font-bold text-ink">
                {overview.submittedRecordings} / {overview.totalRecordings}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-slate-500">Starred問題</p>
              <p className="mt-1 text-3xl font-bold text-ink">{starredItems.length}</p>
            </div>
            <Link
              href="/homework"
              className="rounded-full bg-mint px-4 py-3 text-center font-semibold text-ocean"
            >
              やること一覧を見る
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[28px] border border-white/70 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl">サブ機能: 復習</h2>
            <Link href="/review" className="text-sm font-semibold text-slate-500">
              復習へ
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {sections.map((section) => {
              const progress = getSectionProgress(section.id, state);

              return (
                <div key={section.id} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{section.title}</p>
                      <p className="text-sm text-slate-500">
                        {progress.correct} / {progress.total} 問 正解
                      </p>
                    </div>
                    <Link
                      href={`/review`}
                      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                    >
                      開く
                    </Link>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${progress.percent}%`,
                        backgroundColor: section.accent,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl">サブ機能: 進捗と提出</h2>
            <span className="text-sm text-slate-400">{dailyTasks.length}項目</span>
          </div>
          <div className="mt-5 space-y-3">
            {dailyTasks.map((task) => (
              <Link
                key={task.id}
                href={task.href}
                className="block rounded-3xl bg-slate-50 p-4 transition hover:bg-slate-100"
              >
                <p className="text-sm font-semibold text-slate-500">{task.title}</p>
                <p className="mt-1 text-lg font-semibold">{task.description}</p>
              </Link>
            ))}
            {pendingRecordings.length > 0 ? (
              pendingRecordings.slice(0, 1).map((task) => (
                <div key={task.id} className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">未提出の録音</p>
                  <p className="mt-1 font-semibold">{task.title}</p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl bg-mint p-4 text-sm text-ocean">
                すべての録音課題が提出済みです。次は間違えた問題のやり直しがおすすめです。
              </div>
            )}
          </div>
          <Link
            href="/progress"
            className="mt-5 block rounded-full bg-ink px-4 py-3 text-center text-sm font-semibold text-white"
          >
            進捗を見る
          </Link>
        </div>
      </section>
    </div>
  );
}
