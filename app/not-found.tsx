import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-[32px] bg-white p-8 shadow-card">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Not Found</p>
      <h1 className="mt-3 font-heading text-3xl">ページが見つかりません。</h1>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        セクションURLが間違っている可能性があります。ホームからもう一度進んでください。
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
      >
        ホームへ戻る
      </Link>
    </div>
  );
}
