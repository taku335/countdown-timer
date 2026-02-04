# AGENTS.md

このリポジトリに対してコード生成・修正を行うエージェント（人間/AI/自動化）は、**GitHub Pages に公開される**ことを前提に、以下の制約・規約を必ず守ってください。

## 思考と出力
- PRやIssueのやりとりは日本語で実施する。思考は英語で実施する。

## モード選択（重要）
このリポジトリは用途に応じて **2つの運用モード**を許可します。
どちらで作業するかを最初に決め、混在させないでください。

- **Static Mode（従来）**: ビルドなし。リポジトリ直下 `.` をそのまま公開
- **Build Mode（追加）**: ビルドあり。`dist/` などの成果物のみを公開（`build/` や `docs/` も可）

## 前提（このリポジトリのデプロイ方式）
- GitHub Actions: `.github/workflows/deploy-pages.yml`
- デプロイ対象:
  - **Static Mode**: `actions/upload-pages-artifact@v3` の `path: .`
  - **Build Mode**: `actions/upload-pages-artifact@v3` の `path: dist`（または `build/`・`docs/` 等の成果物ディレクトリ）

Static Mode では、リポジトリ内のファイルは **公開物そのもの**です。
Build Mode では、`src/` と `dist/`（または `build/`・`docs/`）の分離、およびビルド結果の公開を許可します。

---

## 1. GitHub Pages 制約（静的ホスティング）
GitHub Pages は静的ホスティングです。サーバーサイド実行はできません。

### 1.1 このリポジトリで許可する構成
- **Static Mode**: `index.html` を中心とした静的サイト
- **Build Mode**: React/Vite などのビルドを伴う静的サイト
- HTML / CSS / JavaScript / 画像等の静的アセットのみ
- 外部 API 連携: 原則しない（例外として公開APIの読み取りのみ可。秘密情報・認証は不可。埋め込みSDKは可）

### 1.2 禁止事項
- サーバーサイドコード前提（Node/Express、Python、PHP、CGI、SSR 必須など）
- Build Mode を選んでいないのに、ビルドが必須になる構成を導入すること
- Build Mode を選んだ場合に `dist/`・`build/`・`docs/`（または合意した成果物）以外を公開対象にすること
- 秘密情報のコミット（APIキー、トークン、個人情報、社内URL、認証情報など）

---

## 2. パス設計（GitHub Pages の base path 対応）
GitHub Pages は多くの場合 `https://<user>.github.io/<repo>/` 配下で動きます。
よって **サイトルートが `/` ではありません**。

### 2.1 必須ルール
- アセット参照は **相対パス**を基本とする
  - ✅ `./assets/app.css`, `assets/app.js`, `./img/logo.png`
  - ❌ `/assets/app.css`（リポジトリ名配下では壊れる可能性が高い）
- `<a href>` も相対パスを基本にする
- Build Mode で `<base href>` を使う場合は例外として許可する

---

## 3. ルーティング方針（重要）
Build Mode では `404.html` フォールバックを用意する場合に限り、SPA の `history.pushState` を許可します。
Static Mode では、**SPA の pushState ルーティングは原則使えません**（直叩きで 404 になります）。

### 3.1 許可するルーティング
- 静的ページ（例: `about.html` を作り、`./about.html` にリンクする）
- もしくはハッシュルーティング（例: `/#/about`）※必要な場合のみ
- Build Mode で `404.html` がある場合はパスベース SPA を許可

### 3.2 禁止/非推奨
- `history.pushState` を前提にした “パスベース SPA” (`/about` など)
  - `404.html` フォールバックが無い場合は壊れます

---

## 4. デプロイワークフローの維持
`deploy-pages.yml` は以下の前提で動いています：

- **Static Mode**: `Upload artifact` の `path: .` で **リポジトリの内容を丸ごと公開**
- **Build Mode**: `Upload artifact` の `path: dist`（または `build/`・`docs/`）で **ビルド成果物のみ公開**
  - Build Mode を選ぶ場合は、`.github/workflows/deploy-pages.yml` にビルド工程を追加し、`Upload artifact` の `path` を成果物ディレクトリに変更すること

### 4.1 変更ルール
- **Static Mode**: `.github/workflows/deploy-pages.yml` は原則変更しない
- **Build Mode**: `.github/workflows/deploy-pages.yml` の変更を許可する。変更時は次を明記する（事後記録でも可）
  1) 何が壊れるか（公開パス・公開物・URL）
  2) 移行方法
  3) ロールバック方法

---

## 5. 静的サイトとしての品質ルール
- ライブラリ導入は目的に応じて許可（サイズや数の上限は設けない）
- 画像等のサイズは常識的な範囲を意識する
- ブラウザ標準で動く実装を優先するが、最新機能の利用も可
- JavaScript 依存でも可（可能ならプログレッシブ強化を意識する）

---

## 6. 変更時チェックリスト（エージェント用）
変更後、必ず以下を満たしてください。

- [ ] `index.html` を起点にサイトが成立している
- [ ] 参照パスが相対パス中心で、`/<repo>/` 配下でも壊れない
- [ ] 外部 API 呼び出しは公開APIの読み取りに限定している（秘密情報・認証は使わない）
- [ ] サーバーサイド前提の実装がない
- [ ] Static Mode の場合: SPA のパスベースルーティングを導入していない
- [ ] Build Mode の場合: `404.html` フォールバックがある場合のみパスベース SPA を許可
- [ ] 秘密情報を含むファイルを追加・変更していない
- [ ] Static Mode の場合: Actions の `path: .` 前提を壊していない
- [ ] Build Mode の場合: Actions の `path: dist` または `build/`・`docs/` 前提を守っている
