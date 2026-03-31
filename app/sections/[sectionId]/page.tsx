import { notFound } from "next/navigation";

import { SectionDetail } from "@/src/components/sections/section-detail";
import { isSectionId } from "@/src/lib/utils";
import { SECTION_IDS } from "@/src/types/learning";

export function generateStaticParams() {
  return SECTION_IDS.map((sectionId) => ({ sectionId }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = await params;

  if (!isSectionId(sectionId)) {
    notFound();
  }

  return <SectionDetail sectionId={sectionId} />;
}
