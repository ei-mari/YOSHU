import { roleplayScript } from "@/src/data/roleplay-script";
import {
  PracticeItem,
  PracticeMode,
  PracticeRole,
  ProgressState,
  StoryStage,
} from "@/src/types/learning";

const stageLabels: Record<StoryStage, string> = {
  opening: "導入",
  timeline: "時系列確認",
  pressure: "矛盾の追及",
};

function getAcceptedAnswers(text: string, extras?: string[]) {
  return extras && extras.length > 0 ? extras : [text];
}

export function getRoleLabel(role: PracticeRole) {
  return role === "detective" ? "刑事モード" : "容疑者モード";
}

export function getModeLabel(mode: PracticeMode) {
  return mode === "instant" ? "瞬間英作文モード" : "ミッションモード";
}

export function getModeDescription(mode: PracticeMode) {
  return mode === "instant"
    ? "日本語ヒントを見て、自分のセリフを瞬間的に英語にします。"
    : "日本語ミッションを見て、自分のセリフを英語で組み立てます。";
}

export function getRolePracticeItems(role: PracticeRole, mode: PracticeMode): PracticeItem[] {
  return roleplayScript.map((scene) => {
    const line = scene[role];
    const partner = role === "detective" ? scene.suspect : scene.detective;

    return {
      id: `${scene.id}-${role}-${mode}`,
      starId: `${scene.id}-${role}`,
      sceneId: scene.id,
      order: scene.order,
      role,
      mode,
      stage: scene.stage,
      stageLabel: stageLabels[scene.stage],
      answer: line.text,
      acceptedAnswers: getAcceptedAnswers(line.text, line.acceptedAnswers),
      learnerPromptJa: mode === "instant" ? line.japanese : line.coaching,
      partnerEnglish: partner.text,
      partnerLabel: role === "detective" ? "Suspect" : "Detective",
      learnerLabel: role === "detective" ? "刑事" : "容疑者",
    };
  });
}

export function getStarredPracticeItems(
  state: ProgressState,
  role: PracticeRole | "all",
  mode: PracticeMode,
) {
  const roles: PracticeRole[] = role === "all" ? ["detective", "suspect"] : [role];

  return roles.flatMap((currentRole) =>
    getRolePracticeItems(currentRole, mode).filter((item) =>
      state.starredItemIds.includes(item.starId),
    ),
  );
}

export function getScriptOverview() {
  return roleplayScript;
}
