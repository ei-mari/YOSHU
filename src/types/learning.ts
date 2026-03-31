export const SECTION_IDS = [
  "be-past-noun",
  "be-past-place",
  "be-past-adjective",
  "past-verb",
  "wh-review",
  "follow-up",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export type DrillType =
  | "ja_to_en"
  | "statement_to_question"
  | "question_to_short"
  | "question_to_full";

export type Role = "detective" | "suspect" | "neutral";
export const PRACTICE_ROLES = ["detective", "suspect"] as const;
export type PracticeRole = (typeof PRACTICE_ROLES)[number];
export type PracticeMode = "instant" | "mission";
export type StoryStage = "opening" | "timeline" | "pressure";

export type RecordingTaskType =
  | "sentence_reading"
  | "question_answer"
  | "mini_roleplay";

export type HomeworkStepKey = "drill" | "qa" | "phrases" | "recording";

export interface SectionMeta {
  id: SectionId;
  title: string;
  description: string;
  focus: string;
  accent: string;
}

export interface LearningItem {
  id: string;
  section: SectionId;
  type: DrillType;
  promptJa: string;
  promptEn: string;
  answerShort: string;
  answerFull: string;
  acceptedAnswers: string[];
  role: Role;
  note?: string;
}

export interface ExpressionItem {
  id: string;
  english: string;
  japanese: string;
  role: Role;
  note?: string;
}

export interface HomeworkPhrase {
  english: string;
  japanese: string;
  role: Role;
}

export interface SectionHomeworkPlan {
  sectionId: SectionId;
  goal: string;
  coachingTip: string;
  recordingTaskId: string;
  phraseSet: HomeworkPhrase[];
}

export interface RecordingLine {
  role: Role;
  text: string;
  translation?: string;
}

export interface RecordingTask {
  id: string;
  type: RecordingTaskType;
  title: string;
  description: string;
  targetSection: SectionId | "mixed";
  lines: RecordingLine[];
}

export interface AttemptRecord {
  attempts: number;
  correctCount: number;
  lastResult: boolean;
  lastAnswer: string;
  updatedAt: string;
}

export interface RecordingSubmission {
  taskId: string;
  status: "submitted";
  savedAt: string;
  durationSeconds?: number;
}

export interface SectionHomeworkStatus {
  qaDone?: boolean;
  phrasesDone?: boolean;
  updatedAt?: string;
}

export interface ProgressState {
  attempts: Record<string, AttemptRecord>;
  recordings: Record<string, RecordingSubmission>;
  homework: Partial<Record<SectionId, SectionHomeworkStatus>>;
  starredItemIds: string[];
  lastVisitedPath?: string;
}

export interface DialogueRoleLine {
  text: string;
  japanese: string;
  coaching: string;
  acceptedAnswers?: string[];
}

export interface DialogueScene {
  id: string;
  order: number;
  stage: StoryStage;
  detective: DialogueRoleLine;
  suspect: DialogueRoleLine;
}

export interface PracticeItem {
  id: string;
  starId: string;
  sceneId: string;
  order: number;
  role: PracticeRole;
  mode: PracticeMode;
  stage: StoryStage;
  stageLabel: string;
  answer: string;
  acceptedAnswers: string[];
  learnerPromptJa: string;
  partnerEnglish: string;
  partnerLabel: "Detective" | "Suspect";
  learnerLabel: "刑事" | "容疑者";
}
