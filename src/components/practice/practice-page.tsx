"use client";

import { PracticeSession } from "@/src/components/practice/practice-session";
import { getRolePracticeItems } from "@/src/lib/roleplay";
import { PracticeMode, PracticeRole } from "@/src/types/learning";

export function PracticePage({ role, mode }: { role: PracticeRole; mode: PracticeMode }) {
  const items = getRolePracticeItems(role, mode);

  return (
    <PracticeSession
      role={role}
      mode={mode}
      items={items}
      path={`/modes/${role}/${mode}`}
      backHref={`/modes/${role}`}
      backLabel={role === "detective" ? "刑事モードへ" : "容疑者モードへ"}
    />
  );
}
