import { PRACTICE_ROLES, PracticeRole, SECTION_IDS, SectionId } from "@/src/types/learning";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.?!]+$/g, "");
}

export function isSectionId(value: string): value is SectionId {
  return SECTION_IDS.includes(value as SectionId);
}

export function isPracticeRole(value: string): value is PracticeRole {
  return PRACTICE_ROLES.includes(value as PracticeRole);
}

export function formatPercentage(value: number) {
  return `${Math.round(value)}%`;
}
