# Single-Board

シンプルな掲示板  
参考サイト: [https://shuent.github.io/blog/first-react-app-single-board/](https://shuent.github.io/blog/first-react-app-single-board/)

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

## オリジナルからの変更点()

-   React,Firebase 関連パッケージの最新バージョン(2023/01/21)に対応
