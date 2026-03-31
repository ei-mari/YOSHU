import { notFound } from "next/navigation";

import { DrillPlayer } from "@/src/components/drill/drill-player";
import { isSectionId } from "@/src/lib/utils";
import { SECTION_IDS } from "@/src/types/learning";

export function generateStaticParams() {
  return SECTION_IDS.map((sectionId) => ({ sectionId }));
}

export default async function DrillPage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = await params;

  if (!isSectionId(sectionId)) {
    notFound();
  }

  return <DrillPlayer sectionId={sectionId} />;
}
