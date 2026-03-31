import { RecordingTask } from "@/src/types/learning";

export const recordingTasks: RecordingTask[] = [
  {
    id: "record-1",
    type: "sentence_reading",
    title: "単文音読",
    description: "刑事の定型表現を1文ずつはっきり読んで録音します。",
    targetSection: "follow-up",
    lines: [
      {
        role: "detective",
        text: "I need you to listen carefully.",
        translation: "よく聞いてください。",
      },
      {
        role: "detective",
        text: "Tell me the truth.",
        translation: "本当のことを言ってください。",
      },
    ],
  },
  {
    id: "record-2",
    type: "question_answer",
    title: "質問 → 返答",
    description: "質問を見て、短く返答したあとに1文でも言ってみます。",
    targetSection: "be-past-place",
    lines: [
      {
        role: "detective",
        text: "Where were you?",
        translation: "どこにいましたか。",
      },
      {
        role: "suspect",
        text: "At home. I was at home.",
        translation: "家にいました。",
      },
    ],
  },
  {
    id: "record-3",
    type: "mini_roleplay",
    title: "ミニロープレ",
    description: "刑事と被疑者の流れを短く通して録音します。",
    targetSection: "mixed",
    lines: [
      {
        role: "detective",
        text: "State your full name for the record.",
        translation: "記録のためにフルネームを言ってください。",
      },
      {
        role: "suspect",
        text: "My name is Ken Sato.",
        translation: "私の名前はケン・サトウです。",
      },
      {
        role: "detective",
        text: "Where were you?",
        translation: "どこにいましたか。",
      },
      {
        role: "suspect",
        text: "At home. I was at home.",
        translation: "家にいました。",
      },
      {
        role: "detective",
        text: "Then explain the call.",
        translation: "その電話について説明してください。",
      },
      {
        role: "suspect",
        text: "I do not know.",
        translation: "わかりません。",
      },
    ],
  },
];
