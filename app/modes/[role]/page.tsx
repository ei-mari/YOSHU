import { notFound } from "next/navigation";

import { ModeHub } from "@/src/components/modes/mode-hub";
import { isPracticeRole } from "@/src/lib/utils";
import { PRACTICE_ROLES } from "@/src/types/learning";

export function generateStaticParams() {
  return PRACTICE_ROLES.map((role) => ({ role }));
}

export default async function RoleModePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  if (!isPracticeRole(role)) {
    notFound();
  }

  return <ModeHub role={role} />;
}
