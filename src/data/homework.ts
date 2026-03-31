import { SectionHomeworkPlan } from "@/src/types/learning";

export const sectionHomeworkPlans: SectionHomeworkPlan[] = [
  {
    sectionId: "be-past-noun",
    goal: "人物や立場を was / were で答えられるようにする",
    coachingTip: "短く答えてから、余裕があれば1文に広げましょう。",
    recordingTaskId: "record-2",
    phraseSet: [
      {
        english: "He was a suspect.",
        japanese: "彼は容疑者でした。",
        role: "suspect",
      },
      {
        english: "Was she an important witness?",
        japanese: "彼女は重要な目撃者でしたか。",
        role: "detective",
      },
      {
        english: "Yes, I was.",
        japanese: "はい、そうでした。",
        role: "suspect",
      },
    ],
  },
  {
    sectionId: "be-past-place",
    goal: "場所を短く答えて、必要なら1文にもできるようにする",
    coachingTip: "At home. のようにまず短く、次に I was at home. と続けるのが目標です。",
    recordingTaskId: "record-2",
    phraseSet: [
      {
        english: "Where were you?",
        japanese: "どこにいましたか。",
        role: "detective",
      },
      {
        english: "At home.",
        japanese: "家にいました。",
        role: "suspect",
      },
      {
        english: "I was at home.",
        japanese: "私は家にいました。",
        role: "suspect",
      },
    ],
  },
  {
    sectionId: "be-past-adjective",
    goal: "気持ちや状態をシンプルに言えるようにする",
    coachingTip: "Nervous. のような1語返答と、I was nervous. の両方を口に出します。",
    recordingTaskId: "record-2",
    phraseSet: [
      {
        english: "How were you?",
        japanese: "その時どんな気分でしたか。",
        role: "detective",
      },
      {
        english: "Nervous.",
        japanese: "緊張していました。",
        role: "suspect",
      },
      {
        english: "I was nervous.",
        japanese: "私は緊張していました。",
        role: "suspect",
      },
    ],
  },
  {
    sectionId: "past-verb",
    goal: "過去の行動を答え、Did...? の質問にも反応できるようにする",
    coachingTip: "Yes. / Yes, I did. の2段階を声に出して定着させます。",
    recordingTaskId: "record-3",
    phraseSet: [
      {
        english: "Did he call Maria?",
        japanese: "彼はマリアに電話しましたか。",
        role: "detective",
      },
      {
        english: "He called Maria.",
        japanese: "彼はマリアに電話しました。",
        role: "suspect",
      },
      {
        english: "Yes, I did.",
        japanese: "はい、しました。",
        role: "suspect",
      },
    ],
  },
  {
    sectionId: "wh-review",
    goal: "Where / When / What time / Who にすぐ反応できるようにする",
    coachingTip: "時間や人物はまず短く答え、そのあと1文で言えるか試します。",
    recordingTaskId: "record-3",
    phraseSet: [
      {
        english: "What time did you get there?",
        japanese: "何時にそこへ着きましたか。",
        role: "detective",
      },
      {
        english: "Around seven ten.",
        japanese: "7時10分ごろです。",
        role: "suspect",
      },
      {
        english: "My husband was home with me.",
        japanese: "夫が私と一緒に家にいました。",
        role: "suspect",
      },
    ],
  },
  {
    sectionId: "follow-up",
    goal: "後半の追及表現を聞いて、落ち着いて返答できるようにする",
    coachingTip: "刑事の圧のある表現を聞いても、短く返す練習をします。",
    recordingTaskId: "record-1",
    phraseSet: [
      {
        english: "I need you to listen carefully.",
        japanese: "よく聞いてください。",
        role: "detective",
      },
      {
        english: "Tell me the truth.",
        japanese: "本当のことを言ってください。",
        role: "detective",
      },
      {
        english: "I did not hurt Maria.",
        japanese: "私はマリアを傷つけていません。",
        role: "suspect",
      },
    ],
  },
];
