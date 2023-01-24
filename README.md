# Single-Board

シンプルな掲示板  
[動作を確認できます](https://single-board-4fdff.web.app/)

## 起動方法

プロジェクトディレクトリ直下に.env.local ファイルを作成し、Firebase から取得した以下の項目を記入する。

```yml
REACT_APP_APIKEY=xxxxxx
REACT_APP_AUTHDOMAIN=xxxxxx
REACT_APP_PROJECTID=xxxxxx
REACT_APP_STORAGEBUCKET=xxxxxx
REACT_APP_MESSAGINGSENDERID=xxxxxx
REACT_APP_APPID=xxxxxx
REACT_APP_MEASUREMENTID=xxxxxx
```

以下のコマンドを実行する。

```bash
yarn start
```

## オリジナルからの変更点

✅ React,Firebase 関連パッケージの最新バージョン(2023/01/21)に対応  
✅ 投稿削除ボタンの追加  
✅ いいねの実装  
✅ 文中 URL のリンク化 　　
✅ 各動作でのトーストの表示

## 注意

新たなバージョンがデプロイされているにも関わらず古いページが表示される場合はキャッシュをクリアしてください。

## 参考

参考サイト: [React + TypeScript + Firebase で認証付きの簡単な掲示板を作ろう](https://shuent.github.io/blog/first-react-app-single-board/)
