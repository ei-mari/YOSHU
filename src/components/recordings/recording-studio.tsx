"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { recordingTasks } from "@/src/data/recordings";
import { deleteAudioClip, getAudioClip, saveAudioClip } from "@/src/lib/audio-store";
import { getSectionHomeworkPlan } from "@/src/lib/progress";
import { useProgressState } from "@/src/hooks/use-progress-state";

type RecorderStatus = "idle" | "recording" | "ready" | "error";

export function RecordingStudio({ initialTaskId }: { initialTaskId?: string }) {
  const searchParams = useSearchParams();
  const taskFromQuery = searchParams.get("task");
  const resolvedInitialTaskId = initialTaskId ?? taskFromQuery ?? undefined;
  const validInitialTaskId = recordingTasks.some((task) => task.id === resolvedInitialTaskId)
    ? resolvedInitialTaskId
    : recordingTasks[0].id;
  const [selectedTaskId, setSelectedTaskId] = useState(validInitialTaskId);
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [durationSeconds, setDurationSeconds] = useState<number | undefined>(undefined);

  const chunksRef = useRef<Blob[]>([]);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const startedAtRef = useRef<number>(0);

  const {
    state,
    setLastVisitedPath,
    markRecordingSubmitted,
    clearRecordingSubmission,
  } = useProgressState();
  const selectedTask = recordingTasks.find((task) => task.id === selectedTaskId)!;
  const submission = state.recordings[selectedTask.id];
  const linkedSection =
    selectedTask.targetSection === "mixed" ? null : selectedTask.targetSection;
  const linkedPlan = linkedSection ? getSectionHomeworkPlan(linkedSection) : null;

  useEffect(() => {
    setLastVisitedPath(
      resolvedInitialTaskId && validInitialTaskId === resolvedInitialTaskId
        ? `/recordings?task=${resolvedInitialTaskId}`
        : "/recordings",
    );
  }, [resolvedInitialTaskId, setLastVisitedPath, validInitialTaskId]);

  useEffect(() => {
    if (validInitialTaskId) {
      setSelectedTaskId(validInitialTaskId);
    }
  }, [validInitialTaskId]);

  useEffect(() => {
    let nextUrl: string | null = null;

    async function loadClip() {
      const clip = await getAudioClip(selectedTask.id);
      if (!clip) {
        setAudioUrl(null);
        setStatus("idle");
        return;
      }

      nextUrl = URL.createObjectURL(clip);
      setAudioUrl(nextUrl);
      setStatus("ready");
    }

    void loadClip();

    return () => {
      if (nextUrl) {
        URL.revokeObjectURL(nextUrl);
      }
    };
  }, [selectedTask.id]);

  async function startRecording() {
    try {
      setErrorMessage(null);

      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus("error");
        setErrorMessage("このブラウザでは録音に対応していません。");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorderRef.current = recorder;
      startedAtRef.current = Date.now();

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        await saveAudioClip(selectedTask.id, blob);

        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }

        const nextUrl = URL.createObjectURL(blob);
        setAudioUrl(nextUrl);
        setStatus("ready");
        setDurationSeconds(Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000)));

        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setStatus("recording");
    } catch {
      setStatus("error");
      setErrorMessage("マイクを使えませんでした。ブラウザ権限を確認してください。");
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
  }

  async function resetRecording() {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    await deleteAudioClip(selectedTask.id);
    clearRecordingSubmission(selectedTask.id);
    setAudioUrl(null);
    setDurationSeconds(undefined);
    setStatus("idle");
  }

  function downloadRecording() {
    if (!audioUrl) {
      return;
    }

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${selectedTask.id}.webm`;
    link.click();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Recording
        </p>
        <h1 className="mt-3 font-heading text-3xl sm:text-4xl">録音提出</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          MediaRecorder API でブラウザ録音します。音声はローカルに保存し、提出済みの見た目だけ先に再現しています。
        </p>
        {linkedPlan ? (
          <p className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            宿題フローの最後のステップです。{linkedPlan.sectionId === "follow-up" ? "定型表現" : "このセクション"}の練習が終わったら録音を提出します。
          </p>
        ) : null}
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          {recordingTasks.map((task) => {
            const active = task.id === selectedTaskId;
            const submitted = state.recordings[task.id];

            return (
              <button
                key={task.id}
                type="button"
                onClick={() => setSelectedTaskId(task.id)}
                className={`w-full rounded-[28px] border p-5 text-left shadow-card transition ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-white/70 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-heading text-xl">{task.title}</p>
                  {submitted ? (
                    <span className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-ocean">
                      提出済み
                    </span>
                  ) : null}
                </div>
                <p className={`mt-2 text-sm ${active ? "text-white/70" : "text-slate-600"}`}>
                  {task.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                {selectedTask.type.replaceAll("_", " ")}
              </p>
              <h2 className="mt-2 font-heading text-3xl">{selectedTask.title}</h2>
            </div>
            {submission ? (
              <span className="rounded-full bg-mint px-4 py-2 text-sm font-semibold text-ocean">
                提出済み
              </span>
            ) : (
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">
                未提出
              </span>
            )}
          </div>

          <div className="mt-6 rounded-[28px] bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Script
            </p>
            <div className="mt-4 space-y-3">
              {selectedTask.lines.map((line, index) => (
                <div key={`${selectedTask.id}-${index}`} className="rounded-3xl bg-white p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    <span>{line.role}</span>
                  </div>
                  <p className="mt-2 text-xl font-semibold leading-relaxed">{line.text}</p>
                  {line.translation ? (
                    <p className="mt-1 text-sm text-slate-500">{line.translation}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[28px] bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Recorder
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={startRecording}
                disabled={status === "recording"}
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                録音開始
              </button>
              <button
                type="button"
                onClick={stopRecording}
                disabled={status !== "recording"}
                className="rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                停止
              </button>
              <button
                type="button"
                onClick={resetRecording}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                録り直し
              </button>
            </div>

            {audioUrl ? (
              <div className="mt-5 space-y-4">
                <audio controls src={audioUrl} className="w-full" />
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={downloadRecording}
                    className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    ローカル保存
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      markRecordingSubmitted(selectedTask.id, durationSeconds)
                    }
                    className="rounded-full bg-mint px-4 py-3 text-sm font-semibold text-ocean"
                  >
                    提出済みにする
                  </button>
                  <Link
                    href="/homework"
                    className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    宿題フローへ戻る
                  </Link>
                </div>
              </div>
            ) : (
              <p className="mt-5 text-sm text-slate-500">
                録音するとここで再生できます。
              </p>
            )}

            {durationSeconds ? (
              <p className="mt-4 text-sm text-slate-500">録音時間: 約 {durationSeconds} 秒</p>
            ) : null}
            {errorMessage ? (
              <p className="mt-4 text-sm text-rose-700">{errorMessage}</p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
