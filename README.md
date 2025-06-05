# It Homepage

私のポートフォリオサイトです。

## 技術スタック

- Next.js 15.3
- TypeScript
- Tailwind CSS
- React Icons

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/your-username/it_homepage.git

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 機能

### 公開ページ

- プロフィール表示
- スキルセット表示
- 経歴表示
- 作品集表示（予定）

### 管理者ページ

- ログイン機能 (/admin/login)
- プロフィール編集（予定）
- 作品集管理（予定）

## ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx           # メインページ
│   └── admin/
│       └── login/        # 管理者ログインページ
├── components/           # 共通コンポーネント
├── styles/              # スタイル関連
└── types/               # 型定義
```

## 環境変数

```env
NEXT_PUBLIC_API_URL=     # API接続先URL
```

## ライセンス

MIT License

---

## Version(2025/04/27)

- Node.js v23.11.0
- yarn 1.22.22

## Package

- react-icons

## Plugin

- prettier

---

## react-icons 設定

本プロジェクトでは、アイコン表示のために [react-icons](https://react-icons.github.io/react-icons/) を利用しています。

### インストール方法

```bash
yarn add react-icons
```

### 使い方

- 必要なアイコンのみを個別にインポートして利用します。

例:

```tsx
import { FaLaptopCode } from "react-icons/fa";
import { RiUser3Fill } from "react-icons/ri";

const Example = () => (
  <div>
    <FaLaptopCode size={30} />
    <RiUser3Fill size={30} />
  </div>
);
```

- 複数のアイコンセット（FontAwesome, Material, RemixIconなど）が利用可能です。

---

## Prettier 設定

本プロジェクトでは、コード整形ツールとして [Prettier](https://prettier.io/) を利用しています。

### 設定ファイル

`.prettierrc`にて以下のように設定しています:

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "jsxSingleQuote": false,
  "bracketSameLine": false
}
```

### 除外設定

`.prettierignore`にて以下のファイルを除外しています:

```plaintext
# dependencies
node_modules
.pnp
.pnp.js

# next.js
.next/
out/
build
dist

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### コマンド

```bash
# フォーマットの実行
yarn format

# フォーマットチェックのみ
yarn format:check

# フォーマットとESLint修正の実行
yarn format:fix
```

---

# Github Rules

## 1. ブランチ運用

- main: 本番環境用のブランチ
- develop: 開発用のブランチ
- feature/\*: 機能追加用のブランチ
- fix/\*: バグ修正用のブランチ

## 2. コミットメッセージ

以下のプレフィックスを使用:

- feat: 新機能
- fix: バグ修正
- docs: ドキュメントのみの変更
- style: コードの動作に影響しない変更（空白、フォーマット等）
- refactor: リファクタリング
- test: テストコード
- chore: ビルドプロセスやツールの変更

## 3. プルリクエスト

- レビュワーを必ず指定
- Prettierによるフォーマットチェックを通過
- ESLintのチェックを通過
- 機能単位での小さな変更を推奨

## 4. Issue管理

- テンプレートに従って記載
- ラベルを適切に設定
- Projectsボードで進捗管理

参考リソース:

- [Issueの詳細な管理方法](https://qiita.com/takahirocook/items/6ac94e5dc6536bd2272c)
- [GitHubのラベル設計について](https://penguin-coffeebreak.com/archives/444)

---

## Auth.js (認証) 設定

本プロジェクトでは、認証機能のために [Auth.js](https://authjs.dev/) を利用しています。

### インストール

```bash
npm install next-auth@beta
```

### 環境変数の設定

`.env.local`に以下の環境変数を設定する必要があります：

```env
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_SECRET=your-secret-key
AUTH_URL=http://localhost:3000
```

### Google Cloud Consoleの設定

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. プロジェクトを作成または選択
3. OAuth同意画面を設定
4. 認証情報でOAuthクライアントIDを作成
5. 承認済みのリダイレクトURIに以下を追加：
   - http://localhost:3000/api/auth/callback/google
   - https://your-domain.com/api/auth/callback/google（本番環境用）

### 主な機能

- Googleアカウントでのログイン
- 管理者専用ページの保護
- セッション管理

### 実装例

```typescript
// ログイン状態の確認
const session = await auth();
if (!session) {
  redirect("/admin/login");
}
```

参考リソース:

- [Auth.js 公式ドキュメント](https://authjs.dev/)
- [Next.js 15 に Auth.js (Next Auth v5) 認証を導入](https://zenn.dev/takna/articles/authjs-and-nextjs15)

---

## Firebase/Firestore 設定

本プロジェクトでは、バックエンドとして [Firebase](https://firebase.google.com/) と Firestore を利用しています。

### インストール

```bash
npm install firebase firebase-admin
```

### 環境変数の設定

`.env.local`に以下の環境変数を追加：

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

### Firebaseの初期設定

```typescript
// firebase.config.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// Firebase初期化
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { app, db };
```

### Firestoreの使用例

```typescript
// データの取得
import { collection, getDocs } from "firebase/firestore";

const fetchWorks = async () => {
  const worksRef = collection(db, "works");
  const snapshot = await getDocs(worksRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// データの追加
import { addDoc } from "firebase/firestore";

const addWork = async (work) => {
  const worksRef = collection(db, "works");
  await addDoc(worksRef, work);
};
```

### セキュリティルール

Firestoreのセキュリティルール例：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // プロフィールデータは読み取り可、書き込みは管理者のみ
    match /profile/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'admin@example.com';
    }

    // 作品データは読み取り可、書き込みは管理者のみ
    match /works/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'admin@example.com';
    }
  }
}
```

### データ構造

主なコレクション：

```
firestore/
├── profile/           # プロフィール情報
├── works/            # 作品情報
└── skills/           # スキル情報
```

参考リソース：

- [Firebase 公式ドキュメント](https://firebase.google.com/docs)
- [Next.js with Firebase](https://firebase.google.com/docs/web/setup)
- [Firestore セキュリティルール](https://firebase.google.com/docs/firestore/security/get-started)
