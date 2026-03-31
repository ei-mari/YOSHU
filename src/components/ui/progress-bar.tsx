import { formatPercentage } from "@/src/lib/utils";

export function ProgressBar({
  value,
  accent = "#1f2937",
}: {
  value: number;
  accent?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
        <span>進捗</span>
        <span>{formatPercentage(value)}</span>
      </div>
      <div className="h-3 rounded-full bg-slate-200">
        <div
          className="h-3 rounded-full transition-all"
          style={{ width: `${Math.min(value, 100)}%`, backgroundColor: accent }}
        />
      </div>
    </div>
  );
}
