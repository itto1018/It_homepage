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

本プロジェクトでは、コード整形ツールとして [Prettier](https://prettier.io/) と [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) を利用しています。  
Tailwind CSSのクラス順序も自動で整形されます。

### インストール方法

```bash
yarn add -D prettier prettier-plugin-tailwindcss
```

### 設定ファイル

`prettier.config.ts` にて以下のように設定しています。

```ts
import { type Config } from "prettier";

const config: Config = {
  trailingComma: "none",
  plugins: ["prettier-plugin-tailwindcss"]
};

export default config;
```

### 使い方

- **コマンドラインで全ファイルを整形**
  ```bash
  npx prettier --write .
  ```
- **VS Code拡張機能**  
  「Prettier - Code formatter」をインストールし、保存時に自動整形できます。

- **npmスクリプト例**
  ```json
  "scripts": {
    "format": "prettier --write ."
  }
  ```
  実行方法:
  ```bash
  npm run format
  # または
  yarn format
  ```
---