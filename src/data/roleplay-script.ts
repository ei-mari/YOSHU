import { DialogueScene } from "@/src/types/learning";

export const roleplayScript: DialogueScene[] = [
  {
    id: "scene-01",
    order: 1,
    stage: "opening",
    detective: {
      text: "Thanks for coming in, (相手の名前). Have a seat.",
      japanese: "来てくれてありがとう、（相手の名前）。座ってください。",
      coaching: "①来てくれたお礼を言う ② seat を使って座るよう促す",
    },
    suspect: {
      text: "Okay.",
      japanese: "了解する。",
      coaching: "了解したことを短く伝える。",
    },
  },
  {
    id: "scene-02",
    order: 2,
    stage: "opening",
    detective: {
      text: "This interview is being recorded. Do you understand?",
      japanese: "この取調べは録音されます。分かりますね。",
      coaching: "1. 録音されることを伝える 2. 理解したかを聞く",
    },
    suspect: {
      text: "Yes.",
      japanese: "はい。",
      coaching: "理解したことを短く伝える。",
    },
  },
  {
    id: "scene-03",
    order: 3,
    stage: "opening",
    detective: {
      text: "State your full name for the record.",
      japanese: "記録のため、フルネームを言ってください。",
      coaching: "フルネームを聞く。",
    },
    suspect: {
      text: "Alex Parker.",
      japanese: "アレックス・パーカーです。",
      coaching: "フルネームを伝える。",
    },
  },
  {
    id: "scene-04",
    order: 4,
    stage: "opening",
    detective: {
      text: "How do you know Maria O’Brian?",
      japanese: "Maria O’Brian とはどういう関係ですか。",
      coaching: "Maria O’Brian とはどういう関係かを聞く",
    },
    suspect: {
      text: "We were friends. We worked together.",
      japanese: "友人です。以前一緒に働きました。",
      coaching: "1. 友人だと答える 2. 一緒に働いたことも伝える",
    },
  },
  {
    id: "scene-05",
    order: 5,
    stage: "timeline",
    detective: {
      text: "When was the last time you saw Jordan?",
      japanese: "最後に Jordan に会ったのはいつですか。",
      coaching: "Maria と最後に会ったのがいつかを聞く",
    },
    suspect: {
      text: "Yesterday evening.",
      japanese: "昨日の夕方です。",
      coaching: "昨日の夕方だと答える。",
    },
  },
  {
    id: "scene-06",
    order: 6,
    stage: "timeline",
    detective: {
      text: "Where?",
      japanese: "どこでですか。",
      coaching: "どこで会ったかを聞く",
    },
    suspect: {
      text: "A cafe on Main Street.",
      japanese: "メインストリートのカフェです。",
      coaching: "Main Street にあるカフェだと答える。",
    },
  },
  {
    id: "scene-07",
    order: 7,
    stage: "timeline",
    detective: {
      text: "Start from the beginning. What time did you get there?",
      japanese: "最初から話してください。何時に着きましたか。",
      coaching: "何時にそこへ着いたのかを聞く",
    },
    suspect: {
      text: "Around seven ten.",
      japanese: "7時10分くらいです。",
      coaching: "大体 7:10 だと答える。",
    },
  },
  {
    id: "scene-08",
    order: 8,
    stage: "timeline",
    detective: {
      text: "What did you two talk about?",
      japanese: "2人で何を話しましたか。",
      coaching: "何を話したかを聞く",
    },
    suspect: {
      text: "Work stuff. Life stuff. Nothing big.",
      japanese: "仕事のこと、生活のこと。大した話はしていません。",
      coaching: "1. 仕事のこと 2. 生活のこと 3. 大した話ではないと伝える",
    },
  },
  {
    id: "scene-09",
    order: 9,
    stage: "timeline",
    detective: {
      text: "Any argument? Any tension?",
      japanese: "口論はありましたか。ピリついた感じはありましたか。",
      coaching: "口論はあったかを聞く",
    },
    suspect: {
      text: "No.",
      japanese: "ないです。",
      coaching: "なかったと短く答える。",
    },
  },
  {
    id: "scene-10",
    order: 10,
    stage: "timeline",
    detective: {
      text: "Did Jordan mention meeting someone later?",
      japanese: "Jordan は後で誰かに会うと言っていましたか。",
      coaching: "Maria は後で誰かと会うって言っていたかを聞く。",
    },
    suspect: {
      text: "Jordan said they were waiting for someone.",
      japanese: "誰かを待っていると言っていました。",
      coaching: "Jordan は誰かを待っていると言っていたと答える。",
    },
  },
  {
    id: "scene-11",
    order: 11,
    stage: "timeline",
    detective: {
      text: "Did Jordan say who?",
      japanese: "誰だと言っていましたか。",
      coaching: "Maria は誰を待っていたのかを聞く",
    },
    suspect: {
      text: "No.",
      japanese: "言っていません。",
      coaching: "誰かは言っていなかったと答える。",
    },
  },
  {
    id: "scene-12",
    order: 12,
    stage: "timeline",
    detective: {
      text: "What time did you leave the cafe?",
      japanese: "何時にカフェを出ましたか。",
      coaching: "何時にカフェを出たかを聞く",
    },
    suspect: {
      text: "Around eight twenty-five.",
      japanese: "8時25分くらいです。",
      coaching: "大体 8:25 だと答える。",
    },
  },
  {
    id: "scene-13",
    order: 13,
    stage: "timeline",
    detective: {
      text: "Did Jordan leave with you?",
      japanese: "Jordan はあなたと一緒に出ましたか。",
      coaching: "Maria も一緒に出たのかを聞く",
    },
    suspect: {
      text: "No. Jordan stayed.",
      japanese: "いいえ。ジョーダンは残りました。",
      coaching: "1. 否定する 2. Jordan は残ったと伝える",
    },
  },
  {
    id: "scene-14",
    order: 14,
    stage: "timeline",
    detective: {
      text: "After you left, what did you do?",
      japanese: "出た後、何をしましたか。",
      coaching: "カフェを出た後に何をしたかを聞く",
    },
    suspect: {
      text: "I drove straight home.",
      japanese: "まっすぐ車で帰宅しました。",
      coaching: "まっすぐ車で帰宅したと答える。",
    },
  },
  {
    id: "scene-15",
    order: 15,
    stage: "timeline",
    detective: {
      text: "Did you stop anywhere? Gas station, store, anything?",
      japanese: "どこかに寄りましたか。ガソリンスタンドでも店でも、どこでも。",
      coaching: "どこかに寄ったか聞く。ガソリンスタンドや店なども含めて確認する",
    },
    suspect: {
      text: "No.",
      japanese: "いいえ。",
      coaching: "寄っていないと否定する。",
    },
  },
  {
    id: "scene-16",
    order: 16,
    stage: "timeline",
    detective: {
      text: "What time did you get home?",
      japanese: "何時に家に着きましたか。",
      coaching: "何時に家に着いたか聞く",
    },
    suspect: {
      text: "Around eight forty-five.",
      japanese: "8時45分くらいです。",
      coaching: "およそ 8:45 だと答える。",
    },
  },
  {
    id: "scene-17",
    order: 17,
    stage: "timeline",
    detective: {
      text: "Who was home with you?",
      japanese: "家には誰がいましたか。",
      coaching: "誰と家にいたの？と聞く",
    },
    suspect: {
      text: "My husband.",
      japanese: "夫です。",
      coaching: "夫だと答える。",
    },
  },
  {
    id: "scene-18",
    order: 18,
    stage: "timeline",
    detective: {
      text: "Did you text Jordan after you left?",
      japanese: "出た後、Jordan にメッセージを送りましたか。",
      coaching: "カフェを出た後、Maria にメッセージをしたか聞く。",
    },
    suspect: {
      text: "Yes. Just one text.",
      japanese: "はい。1回だけです。",
      coaching: "1回だけ送ったと答える。",
    },
  },
  {
    id: "scene-19",
    order: 19,
    stage: "timeline",
    detective: {
      text: "What did you say?",
      japanese: "何と送りましたか。",
      coaching: "何て送ったかを聞く",
    },
    suspect: {
      text: "I asked if they got home safe.",
      japanese: "無事に帰れたか確認しました。",
      coaching: "無事に帰れたかを聞いたと答える。",
    },
  },
  {
    id: "scene-20",
    order: 20,
    stage: "timeline",
    detective: {
      text: "Did Jordan reply?",
      japanese: "Jordan から返信はありましたか。",
      coaching: "Maria から返信があったか聞く",
    },
    suspect: {
      text: "No.",
      japanese: "ありません。",
      coaching: "返信はなかったと答える。",
    },
  },
  {
    id: "scene-21",
    order: 21,
    stage: "timeline",
    detective: {
      text: "Okay. That gives me a timeline.",
      japanese: "分かった。タイムラインは一応できた。",
      coaching: "ここまでで時系列が見えたことを伝える。",
    },
    suspect: {
      text: "Okay.",
      japanese: "はい。",
      coaching: "了解する。",
    },
  },
  {
    id: "scene-22",
    order: 22,
    stage: "pressure",
    detective: {
      text: "Alex, I need you to listen carefully. We have a record of an outgoing call to Maria at 9:12 from your phone.",
      japanese: "Alex、よく聞いてください。あなたの携帯から9時12分に Maria へ発信した記録があります。",
      coaching: "①相手の名前を呼んで、よく聞くように言う ②相手の携帯から9時12分に Maria へ発信した記録があると伝える",
    },
    suspect: {
      text: "What? No. I did not call.",
      japanese: "え？ いいえ。私はかけていません。",
      coaching: "自分は電話していないと否定する。",
      acceptedAnswers: ["What? No. I did not call.", "What? No, I did not call."],
    },
  },
  {
    id: "scene-23",
    order: 23,
    stage: "pressure",
    detective: {
      text: "Then explain the call.",
      japanese: "では、その通話を説明してください。",
      coaching: "その通話を説明するように言う",
    },
    suspect: {
      text: "Maybe it was an accident.",
      japanese: "事故発信かも。",
      coaching: "事故で発信したかもしれないと伝える。",
    },
  },
  {
    id: "scene-24",
    order: 24,
    stage: "pressure",
    detective: {
      text: "An accident call that lasts forty seconds?",
      japanese: "事故発信で40秒も続いたのですか。",
      coaching: "事故発信で40秒も続いたのかと疑う",
    },
    suspect: {
      text: "I do not know.",
      japanese: "分かりません。",
      coaching: "分からないと答える。",
      acceptedAnswers: ["I do not know.", "I don't know."],
    },
  },
  {
    id: "scene-25",
    order: 25,
    stage: "pressure",
    detective: {
      text: "Let's tighten this up. After you got home, what did you do?",
      japanese: "では細かく確認します。帰宅後、何をしましたか。",
      coaching: "①もう一度細かく確認すると伝える ②帰宅後に何をしたかを聞く",
      acceptedAnswers: [
        "Let's tighten this up. After you got home, what did you do?",
        "Lets tighten this up. After you got home, what did you do?"
      ],
    },
    suspect: {
      text: "I changed. I ate something. I watched TV.",
      japanese: "着替えて、少し食べて、テレビを見ました。",
      coaching: "帰宅後の行動を3つ並べて伝える。",
    },
  },
  {
    id: "scene-26",
    order: 26,
    stage: "pressure",
    detective: {
      text: "What did you eat?",
      japanese: "何を食べましたか。",
      coaching: "何を食べたかを聞く。",
    },
    suspect: {
      text: "Leftovers.",
      japanese: "残り物です。",
      coaching: "leftovers と答える。",
    },
  },
  {
    id: "scene-27",
    order: 27,
    stage: "pressure",
    detective: {
      text: "What show did you watch?",
      japanese: "何の番組を見ましたか。",
      coaching: "何の番組を見たか聞く",
    },
    suspect: {
      text: "I do not remember.",
      japanese: "覚えていません。",
      coaching: "覚えていないと答える。",
      acceptedAnswers: ["I do not remember.", "I don't remember."],
    },
  },
  {
    id: "scene-28",
    order: 28,
    stage: "pressure",
    detective: {
      text: "A witness saw someone who looked like you near the cafe at nine.",
      japanese: "9時ごろ、目撃者がカフェの近くであなたに似た人物を見たと言っています。",
      coaching: "目撃者がカフェ付近であなたに似た人物を見たと言っていると伝える",
    },
    suspect: {
      text: "That was not me.",
      japanese: "私じゃありません。",
      coaching: "それは自分ではないと否定する。",
    },
  },
  {
    id: "scene-29",
    order: 29,
    stage: "pressure",
    detective: {
      text: "Tell me the truth. Did you kill Maria?",
      japanese: "本当のことを言ってください。Maria を殺しましたか。",
      coaching: "①真実を言うよう促す ②Maria を殺したか聞く",
    },
    suspect: {
      text: "No, I did not hurt Maria.",
      japanese: "いいえ。私は Maria を傷つけていません。",
      coaching: "Maria を傷つけていないと伝える。",
    },
  },
  {
    id: "scene-30",
    order: 30,
    stage: "pressure",
    detective: {
      text: "Did you meet Jordan again after you left?",
      japanese: "あなたが出た後、ジョーダンと再度会った？",
      coaching: "カフェを去った後に再会したかを聞く。",
    },
    suspect: {
      text: "No. I went back to the cafe area. I just drove by.",
      japanese: "いいえ。カフェの近くには戻りましたが、車で通っただけです。",
      coaching: "①カフェに戻ったことを認める ②車で通っただけだと伝える。",
      acceptedAnswers: [
        "No. I went back to the cafe area. I just drove by.",
        "I went back to the cafe area. I just drove by."
      ],
    },
  },
  {
    id: "scene-31",
    order: 31,
    stage: "pressure",
    detective: {
      text: "Did you see Jordan?",
      japanese: "Jordan を見ましたか。",
      coaching: "Maria を見たか聞きましょう。",
    },
    suspect: {
      text: "No. I did not stop.",
      japanese: "いいえ。止まりませんでした。",
      coaching: "1. 見ていないと否定する 2. 止まっていないと伝える",
    },
  },
  {
    id: "scene-32",
    order: 32,
    stage: "pressure",
    detective: {
      text: "Then why did you call Jordan at 9:12?",
      japanese: "では、なぜ9時12分に Jordan に電話したのですか。",
      coaching: "なぜ9時12分に Maria に電話したのか聞く",
    },
    suspect: {
      text: "I called to check in on her. Jordan did not answer.",
      japanese: "心配で確認の電話をしました。出ませんでした。",
      coaching: "①心配で確認の電話をしたと伝える ②Maria は電話に出なかったと伝える。",
    },
  },
  {
    id: "scene-33",
    order: 33,
    stage: "pressure",
    detective: {
      text: "That is different from what you told me earlier.",
      japanese: "それは、あなたが最初に話していた内容と違います。",
      coaching: "最初に言っていた話と違うことを伝える",
    },
    suspect: {
      text: "I know. I panicked.",
      japanese: "分かっています。パニックでした。",
      coaching: "分かっていることと、パニックだったことを伝える。",
    },
  },
  {
    id: "scene-34",
    order: 34,
    stage: "pressure",
    detective: {
      text: "One last question. Did you see anyone with Jordan that night?",
      japanese: "最後に1つ質問です。その夜、Jordan と一緒にいた人物を見ましたか。",
      coaching: "①最後の質問だと伝える ②その夜、誰か Maria と一緒にいたかを聞く",
    },
    suspect: {
      text: "No.",
      japanese: "いいえ。",
      coaching: "見ていないと答える。",
    },
  },
];
