import { sectionHomeworkPlans } from "@/src/data/homework";
import { drillItems } from "@/src/data/drills";
import { recordingTasks } from "@/src/data/recordings";
import { sections } from "@/src/data/sections";
import {
  HomeworkStepKey,
  LearningItem,
  ProgressState,
  RecordingTask,
  SectionId,
} from "@/src/types/learning";
import { normalizeAnswer } from "@/src/lib/utils";

export const STORAGE_KEY = "english-roleplay-progress-v1";

export const initialProgressState: ProgressState = {
  attempts: {},
  recordings: {},
  homework: {},
  starredItemIds: [],
  lastVisitedPath: "/",
};

export const HOMEWORK_STEPS: Array<{
  key: HomeworkStepKey;
  title: string;
  description: string;
}> = [
  {
    key: "drill",
    title: "ドリル",
    description: "まずは文型を1問ずつ確認します。",
  },
  {
    key: "qa",
    title: "Q&A",
    description: "短く答えてから、必要なら1文で返します。",
  },
  {
    key: "phrases",
    title: "音読",
    description: "定型表現や返答例を声に出して確認します。",
  },
  {
    key: "recording",
    title: "録音提出",
    description: "最後に録音して提出済みにします。",
  },
];

export function isAcceptedAnswer(input: string, acceptedAnswers: string[]) {
  const normalized = normalizeAnswer(input);
  return acceptedAnswers.some((answer) => normalizeAnswer(answer) === normalized);
}

export function getSectionItems(sectionId: SectionId) {
  return drillItems.filter((item) => item.section === sectionId);
}

export function getSectionProgress(sectionId: SectionId, state: ProgressState) {
  const items = getSectionItems(sectionId);
  const correct = items.filter((item) => state.attempts[item.id]?.lastResult).length;
  const attempted = items.filter((item) => state.attempts[item.id]).length;

  return {
    total: items.length,
    correct,
    attempted,
    percent: items.length === 0 ? 0 : (correct / items.length) * 100,
  };
}

export function getSectionHomeworkPlan(sectionId: SectionId) {
  return sectionHomeworkPlans.find((plan) => plan.sectionId === sectionId)!;
}

export function getDrillCompletion(sectionId: SectionId, state: ProgressState) {
  const items = getSectionItems(sectionId);
  const attempted = items.filter((item) => state.attempts[item.id]).length;
  const correct = items.filter((item) => state.attempts[item.id]?.lastResult).length;

  return {
    total: items.length,
    attempted,
    correct,
    isComplete: items.length > 0 && attempted === items.length,
  };
}

export function getRecordingTaskForSection(sectionId: SectionId) {
  const plan = getSectionHomeworkPlan(sectionId);
  return recordingTasks.find((task) => task.id === plan.recordingTaskId)!;
}

export function getSectionHomeworkStatus(sectionId: SectionId, state: ProgressState) {
  const drill = getDrillCompletion(sectionId, state);
  const manualState = state.homework[sectionId];
  const recordingTask = getRecordingTaskForSection(sectionId);
  const recordingDone = Boolean(state.recordings[recordingTask.id]);

  return {
    drillDone: drill.isComplete,
    qaDone: Boolean(manualState?.qaDone),
    phrasesDone: Boolean(manualState?.phrasesDone),
    recordingDone,
  };
}

export function getNextHomeworkStep(sectionId: SectionId, state: ProgressState): HomeworkStepKey {
  const status = getSectionHomeworkStatus(sectionId, state);

  if (!status.drillDone) {
    return "drill";
  }

  if (!status.qaDone) {
    return "qa";
  }

  if (!status.phrasesDone) {
    return "phrases";
  }

  if (!status.recordingDone) {
    return "recording";
  }

  return "recording";
}

export function getOverallProgress(state: ProgressState) {
  const total = drillItems.length;
  const correct = drillItems.filter((item) => state.attempts[item.id]?.lastResult).length;
  const submittedRecordings = Object.keys(state.recordings).length;

  return {
    total,
    correct,
    percent: total === 0 ? 0 : (correct / total) * 100,
    submittedRecordings,
    totalRecordings: recordingTasks.length,
  };
}

export function getMistakeItems(state: ProgressState): LearningItem[] {
  return drillItems.filter((item) => {
    const record = state.attempts[item.id];
    return record && !record.lastResult;
  });
}

export function getNextSection(state: ProgressState) {
  return (
    sections.find((section) => {
      const status = getSectionHomeworkStatus(section.id, state);
      return !status.drillDone || !status.qaDone || !status.phrasesDone || !status.recordingDone;
    }) ??
    sections[0]
  );
}

export function getDailyTaskCards(state: ProgressState) {
  const nextSection = getNextSection(state);
  const nextStep = getNextHomeworkStep(nextSection.id, state);
  const recordingTask = getRecordingTaskForSection(nextSection.id);

  return [
    {
      id: "daily-homework",
      title: "今日の宿題",
      description: nextSection.title,
      href: "/homework",
    },
    {
      id: "daily-next-step",
      title: "次にやること",
      description: HOMEWORK_STEPS.find((step) => step.key === nextStep)?.title ?? "ドリル",
      href:
        nextStep === "drill"
          ? `/sections/${nextSection.id}/drill`
          : nextStep === "qa"
            ? `/sections/${nextSection.id}/qa`
            : nextStep === "phrases"
              ? `/expressions?section=${nextSection.id}`
              : `/recordings?task=${recordingTask.id}`,
    },
    {
      id: "daily-recording",
      title: "提出する録音",
      description: recordingTask.title,
      href: `/recordings?task=${recordingTask.id}`,
    },
  ];
}

export function getUnsubmittedRecordings(state: ProgressState): RecordingTask[] {
  return recordingTasks.filter((task) => !state.recordings[task.id]);
}

export function getCompletedHomeworkCount(state: ProgressState) {
  return sections.filter((section) => {
    const status = getSectionHomeworkStatus(section.id, state);
    return status.drillDone && status.qaDone && status.phrasesDone && status.recordingDone;
  }).length;
}

export function getStarredItems(state: ProgressState) {
  return drillItems.filter((item) => state.starredItemIds.includes(item.id));
}
