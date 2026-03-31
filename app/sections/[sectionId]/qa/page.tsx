import { notFound } from "next/navigation";

import { QaPractice } from "@/src/components/qa/qa-practice";
import { isSectionId } from "@/src/lib/utils";
import { SECTION_IDS } from "@/src/types/learning";

export function generateStaticParams() {
  return SECTION_IDS.map((sectionId) => ({ sectionId }));
}

export default async function QaPage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = await params;

  if (!isSectionId(sectionId)) {
    notFound();
  }

  return <QaPractice sectionId={sectionId} />;
}
