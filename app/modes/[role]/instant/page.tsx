import { notFound } from "next/navigation";

import { PracticePage } from "@/src/components/practice/practice-page";
import { isPracticeRole } from "@/src/lib/utils";
import { PRACTICE_ROLES } from "@/src/types/learning";

export function generateStaticParams() {
  return PRACTICE_ROLES.map((role) => ({ role }));
}

export default async function InstantPracticePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  if (!isPracticeRole(role)) {
    notFound();
  }

  return <PracticePage role={role} mode="instant" />;
}
