"use client";

import { useEffect, useMemo, useState } from "react";

import { HomeworkStepKey, ProgressState, SectionId } from "@/src/types/learning";
import { initialProgressState, STORAGE_KEY } from "@/src/lib/progress";

function readProgressState(): ProgressState {
  if (typeof window === "undefined") {
    return initialProgressState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return initialProgressState;
  }

  try {
    return {
      ...initialProgressState,
      ...JSON.parse(raw),
    } as ProgressState;
  } catch {
    return initialProgressState;
  }
}

export function useProgressState() {
  const [state, setState] = useState<ProgressState>(initialProgressState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setState(readProgressState());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isReady, state]);

  const actions = useMemo(
    () => ({
      recordAttempt: (itemId: string, answer: string, isCorrect: boolean) => {
        setState((current) => {
          const previous = current.attempts[itemId];

          return {
            ...current,
            attempts: {
              ...current.attempts,
              [itemId]: {
                attempts: (previous?.attempts ?? 0) + 1,
                correctCount: (previous?.correctCount ?? 0) + (isCorrect ? 1 : 0),
                lastResult: isCorrect,
                lastAnswer: answer,
                updatedAt: new Date().toISOString(),
              },
            },
          };
        });
      },
      setLastVisitedPath: (path: string) => {
        setState((current) => ({
          ...current,
          lastVisitedPath: path,
        }));
      },
      markRecordingSubmitted: (taskId: string, durationSeconds?: number) => {
        setState((current) => ({
          ...current,
          recordings: {
            ...current.recordings,
            [taskId]: {
              taskId,
              status: "submitted",
              savedAt: new Date().toISOString(),
              durationSeconds,
            },
          },
        }));
      },
      markHomeworkStepDone: (sectionId: SectionId, step: Exclude<HomeworkStepKey, "drill" | "recording">) => {
        setState((current) => ({
          ...current,
          homework: {
            ...current.homework,
            [sectionId]: {
              ...current.homework[sectionId],
              ...(step === "qa" ? { qaDone: true } : {}),
              ...(step === "phrases" ? { phrasesDone: true } : {}),
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },
      clearHomeworkStepDone: (sectionId: SectionId, step: Exclude<HomeworkStepKey, "drill" | "recording">) => {
        setState((current) => ({
          ...current,
          homework: {
            ...current.homework,
            [sectionId]: {
              ...current.homework[sectionId],
              ...(step === "qa" ? { qaDone: false } : {}),
              ...(step === "phrases" ? { phrasesDone: false } : {}),
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },
      toggleStarredItem: (itemId: string) => {
        setState((current) => {
          const exists = current.starredItemIds.includes(itemId);

          return {
            ...current,
            starredItemIds: exists
              ? current.starredItemIds.filter((id) => id !== itemId)
              : [...current.starredItemIds, itemId],
          };
        });
      },
      clearRecordingSubmission: (taskId: string) => {
        setState((current) => {
          const nextRecordings = { ...current.recordings };
          delete nextRecordings[taskId];

          return {
            ...current,
            recordings: nextRecordings,
          };
        });
      },
    }),
    [],
  );

  return {
    state,
    isReady,
    ...actions,
  };
}
