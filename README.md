# TODO アプリ

シンプルで使いやすいWebベースのTODOリスト管理アプリケーションです。

## 概要

このアプリケーションは、HTML、CSS、JavaScriptのみで構築されたシンプルなTODO管理ツールです。LocalStorageを使用してデータを永続化するため、ブラウザを閉じてもタスクが保存されます。

## デモ

このアプリは以下のURLで公開されています：

- **Vercel**: https://todo-2csxj8scm-yoshihiro-kameokas-projects.vercel.app
- **GitHub Pages**: https://yoshihiro-kameoka.github.io/todo/

## 機能

### 基本機能
- **TODOの追加**: テキスト入力でタスクを追加
- **TODOの削除**: 不要なタスクを削除
- **完了マーク**: チェックボックスでタスクの完了/未完了を切り替え

### 拡張機能
- **フィルタリング**: すべて/未完了/完了済みでタスクを絞り込み
- **データ永続化**: LocalStorageで自動保存
- **タスク数表示**: 未完了タスクの件数を表示
- **レスポンシブデザイン**: スマートフォンでも使いやすい
- **アニメーション**: スムーズな操作感

## ファイル構成

```
todo/
├── index.html    # アプリケーションの構造
├── style.css     # デザインとスタイリング
├── app.js        # 機能の実装
├── vercel.json   # Vercelデプロイ設定
└── README.md     # このドキュメント
```

## 使い方

### 起動方法

1. `index.html` をブラウザで開く
   ```bash
   open index.html
   ```
   または、ファイルをダブルクリック

### 基本操作

1. **タスクの追加**
   - 入力欄にタスクを入力
   - 「追加」ボタンをクリック、またはEnterキーを押す

2. **タスクの完了**
   - チェックボックスをクリックして完了/未完了を切り替え
   - 完了したタスクは取り消し線で表示されます

3. **タスクの削除**
   - 各タスクの「削除」ボタンをクリック

4. **フィルタリング**
   - 「すべて」: 全タスクを表示
   - 「未完了」: 未完了タスクのみ表示
   - 「完了済み」: 完了済みタスクのみ表示

## 技術仕様

### HTML構造 (`index.html`)

```html
- container: メインコンテナ
  - h1: タイトル
  - input-container: 入力エリア
    - todoInput: タスク入力フィールド
    - addBtn: 追加ボタン
  - filter-container: フィルタボタン群
  - todoList: タスクリスト
  - stats: 統計情報表示
```

### CSS設計 (`style.css`)

- **カラースキーム**: グラデーション背景（#667eea → #764ba2）
- **レイアウト**: Flexboxを使用した柔軟なレイアウト
- **アニメーション**: `slideIn`アニメーションでタスク追加時の演出
- **レスポンシブ**: モバイル対応（max-width: 600px）

### JavaScript実装 (`app.js`)

#### データ構造

```javascript
todo = {
    id: Number,        // 一意のID（タイムスタンプ）
    text: String,      // タスクの内容
    completed: Boolean // 完了状態
}
```

#### 主要関数

| 関数名 | 説明 |
|--------|------|
| `init()` | アプリケーションの初期化 |
| `loadTodos()` | LocalStorageからデータを読み込み |
| `saveTodos()` | LocalStorageにデータを保存 |
| `addTodo()` | 新しいタスクを追加 |
| `deleteTodo(id)` | 指定IDのタスクを削除 |
| `toggleTodo(id)` | タスクの完了状態を切り替え |
| `renderTodos()` | タスクリストを画面に描画 |
| `getFilteredTodos()` | フィルタに応じたタスクを取得 |
| `updateStats()` | 統計情報を更新 |
| `escapeHtml(text)` | XSS対策のためHTMLエスケープ |

#### データフロー

```
ユーザー操作
    ↓
イベントハンドラ
    ↓
データ更新（todos配列）
    ↓
LocalStorageに保存（saveTodos）
    ↓
画面を再描画（renderTodos）
    ↓
統計情報更新（updateStats）
```

## セキュリティ

- **XSS対策**: `escapeHtml()`関数でユーザー入力をエスケープ
- **入力検証**: 空文字列のチェック

## ブラウザ対応

- Chrome（推奨）
- Firefox
- Safari
- Edge

※ LocalStorageをサポートするモダンブラウザで動作します

## データの保存場所

タスクデータはブラウザのLocalStorageに保存されます。

- **保存キー**: `todos`
- **形式**: JSON文字列
- **永続性**: ブラウザのキャッシュをクリアするまで保持

## カスタマイズ

### 色を変更する

`style.css` の以下の箇所を編集:

```css
/* 背景グラデーション */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* アクセントカラー */
background: #667eea;
```

### アニメーション速度を変更する

```css
@keyframes slideIn {
    /* アニメーション時間: 0.3s */
}
```

## 今後の拡張案

- [ ] タスクの編集機能
- [ ] 優先度の設定
- [ ] 期限の設定とリマインダー
- [ ] カテゴリ・タグ機能
- [ ] ドラッグ&ドロップでの並び替え
- [ ] データのエクスポート/インポート
- [ ] ダークモード対応

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 作成者

Claude Code で生成されたプロジェクトです。

---

最終更新日: 2025-12-09
