## ディレクトリ構成

```
src/
  app/              # ページコンポーネント
  components/       # 再利用可能なUIコンポーネント
  styles/           # グローバルスタイルやTailwind設定
public/             # 静的ファイル
prettier.config.ts  # Prettier設定
...
```

## 開発・ビルド・Lint コマンド

- 開発サーバー起動

  ```bash
  yarn dev
  ```

- 本番ビルド

  ```bash
  yarn build
  ```

- Lint（ESLint）

  ```bash
  yarn lint
  ```

- コード整形（Prettier）
  ```bash
  yarn format
  ```

## 環境変数

必要に応じて `.env.local` ファイルを作成し、APIキーや環境ごとの設定を記述してください。

例:

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

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
