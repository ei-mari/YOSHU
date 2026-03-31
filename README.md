# English Roleplay Homework MVP

英語ロープレ授業の課題用MVPです。  
授業本体の代替ではなく、授業後の反復練習をシンプルに回すための `Next.js + TypeScript + Tailwind CSS` アプリです。

現在の情報設計は次の方針です。

- 主機能: `刑事モード` と `容疑者モード`
- 各モードの練習タイプ: `瞬間英作文モード` と `ミッションモード`
- 復習機能: `Star` を付けたセリフだけを `REVIEW` で反復
- 1画面1目的で、迷わず `役 → 練習タイプ → 復習` に進める

## セットアップ手順

1. Node.js 20 以上を用意します
2. 依存関係をインストールします

```bash
npm install
```

## 起動方法

開発サーバー:

```bash
npm run dev
```

本番ビルド確認:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

デフォルトでは [http://localhost:3000](http://localhost:3000) で起動します。

## GitHub Pages 公開手順

1. このプロジェクトを GitHub リポジトリに push します
2. GitHub の `Settings > Pages` を開きます
3. `Build and deployment` の `Source` を `GitHub Actions` にします
4. `main` ブランチに push すると、`.github/workflows/deploy-pages.yml` が走って公開されます

補足:

- `next.config.ts` で GitHub リポジトリ名から `basePath` を自動設定しています
- ユーザーサイト形式のリポジトリ (`<user>.github.io`) ではルート公開
- プロジェクトサイト形式のリポジトリでは `/<repo-name>/` 配下で公開
- 静的書き出し結果は `out/` に生成され、Actions から GitHub Pages にデプロイされます

## 主な機能

- ホーム画面
- 刑事モード画面
- 容疑者モード画面
- 瞬間英作文画面
- ミッションモード画面
- REVIEW画面
- Star 保存機能

## ディレクトリ構成

```text
.
├── app
│   ├── modes
│   ├── progress
│   ├── review
│   ├── sections
│   ├── globals.css
│   └── layout.tsx
├── src
│   ├── components
│   │   ├── home
│   │   ├── layout
│   │   ├── modes
│   │   ├── practice
│   │   ├── progress
│   │   ├── review
│   │   └── ui
│   ├── data
│   │   └── roleplay-script.ts
│   ├── hooks
│   │   └── use-progress-state.ts
│   ├── lib
│   │   ├── progress.ts
│   │   ├── roleplay.ts
│   │   └── utils.ts
│   └── types
│       └── learning.ts
├── README.md
├── package.json
└── tailwind.config.ts
```

## データ追加方法

### 1. 台本を追加する

`/Users/eight/Documents/YOSHU/src/data/roleplay-script.ts` に `DialogueScene` を追加します。

必要な項目:

- `id`
- `order`
- `stage`
- `detective`
- `suspect`

`detective` と `suspect` の中には次を入れます。

- `text`
- `japanese`
- `coaching`
- `acceptedAnswers` は任意

この1つの台本データから、刑事モード / 容疑者モード / 瞬間英作文モード / ミッションモード / REVIEW をまとめて生成しています。

### 2. 正解ゆれを追加する

完全一致ベースですが、各セリフで `acceptedAnswers` を追加すれば、別表現や句読点違いも受け付けられます。

### 3. Star REVIEW を使う

練習画面で `Star` を付けると、そのセリフが `localStorage` に保存されます。  
`/review` で role と mode を切り替えながら starred セリフだけ練習できます。

## 実装メモ

- 進捗は `localStorage` に保存
- 会話台本 1 つから role 別 / mode 別の問題を生成
- `瞬間英作文` は日本語ヒント中心
- `ミッションモード` は日本語の指示文を表示
- `REVIEW` は starred セリフだけを role / mode 別に反復
- 下部ナビは `刑事 / 容疑者 / REVIEW` の3本に整理
- 認証、DB、管理画面、サーバ保存は未実装
- App Router を利用
- モバイル優先の1画面1目的UI

## 今後の拡張候補

1. 音声再生と録音提出を役別モードに再統合する
2. 正答判定を類似一致や語順ゆれ対応に拡張する
3. REVIEW にランダム出題と苦手順ソートを追加する
4. 台本を JSON 化して編集しやすくする
5. 音声認識で発話チェックを追加する

## README末尾の追加提案

このMVPの次の段階では、以下の3方向が特に有効です。

1. REVIEW の出題ロジックに spaced repetition を入れる
2. 役ごとの音声モデルを使って shadowing モードを足す
3. 台本セットを複数持てるようにして授業単位で切り替えられるようにする
