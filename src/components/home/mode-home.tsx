"use client";

import Link from "next/link";
import { useEffect } from "react";

import { useProgressState } from "@/src/hooks/use-progress-state";

const modeCards = [
  {
    href: "/modes/detective",
    title: "刑事モード",
    description: "質問する側として、取調べの流れを英語で出す練習です。",
    accent: "bg-ink text-white",
  },
  {
    href: "/modes/suspect",
    title: "容疑者モード",
    description: "答える側として、短く自然に返答する練習です。",
    accent: "bg-mint text-ocean",
  },
];

export function ModeHome() {
  const { state, setLastVisitedPath } = useProgressState();

  useEffect(() => {
    setLastVisitedPath("/");
  }, [setLastVisitedPath]);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Simple Flow
        </p>
        <h1 className="mt-3 font-heading text-3xl leading-tight sm:text-5xl">
          刑事モード / 容疑者モード
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          まずは役を選びます。各モードの中で `瞬間英作文モード` と `ミッションモード` を切り替え、繰り返したいセリフだけ `Star` で REVIEW に残します。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {modeCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`rounded-[32px] p-6 shadow-card transition hover:-translate-y-1 ${card.accent}`}
          >
            <p className="text-sm uppercase tracking-[0.2em] opacity-70">Mode</p>
            <h2 className="mt-3 font-heading text-3xl">{card.title}</h2>
            <p className="mt-4 text-sm leading-7 opacity-90">{card.description}</p>
            <span className="mt-6 inline-flex rounded-full bg-white/15 px-4 py-3 text-sm font-semibold">
              このモードを開く
            </span>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[32px] bg-white p-6 shadow-card">
          <h2 className="font-heading text-2xl">練習タイプ</h2>
          <div className="mt-5 grid gap-3">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">瞬間英作文モード</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                日本語のヒントを見て、自分のセリフをすぐ英語にします。
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">ミッションモード</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                日本語の指示を見て、自分のセリフを英語で組み立てます。
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-card">
          <h2 className="font-heading text-2xl">REVIEW</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            `Star` を付けたセリフだけをまとめて繰り返せます。
          </p>
          <div className="mt-5 rounded-3xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Starred セリフ</p>
            <p className="mt-1 text-3xl font-bold text-ink">{state.starredItemIds.length}</p>
          </div>
          <Link
            href="/review"
            className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            REVIEW を開く
          </Link>
        </div>
      </section>
    </div>
  );
}
