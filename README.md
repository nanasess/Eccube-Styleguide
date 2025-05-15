# EC-CUBE 4 スタイルガイド制作

EC-CUBE4デモサイト

[http://demo4.ec-cube.net/](http://demo4.ec-cube.net/)

開発リポジトリ　

[https://github.com/EC-CUBE/Eccube-Styleguide](https://github.com/EC-CUBE/Eccube-Styleguide)

## 確認環境[master]

`master`ブランチにマージされた内容はこちらで確認できます。

master ブランチは最新のタグリリース内容を保持するブランチです。

Styleguide On Heorku 

[http://eccube3-styleguide.herokuapp.com/](http://eccube3-styleguide.herokuapp.com/)

HTML Moc On Heroku 

[http://eccube3-styleguide.herokuapp.com/moc/](http://eccube3-styleguide.herokuapp.com/moc/)

## 確認環境[dev]

`dev`ブランチにマージされた内容はこちらで確認できます。

dev ブランチは開発作業中の内容を取り込む ブランチです。

Styleguide On Heorku 

[http://eccube3-styleguide-dev.herokuapp.com/](http://eccube3-styleguide-dev.herokuapp.com/)

HTML Moc On Heroku 

[http://eccube3-styleguide-dev.herokuapp.com/moc/](http://eccube3-styleguide-dev.herokuapp.com/moc/)

モックページの実装状況等は、Project ページを確認してください。

https://github.com/EC-CUBE/Eccube-Styleguide/projects

## リリース作業の進め方

リリースに関するタスク管理は、全てissueで管理します。

issue は dev等ブランチにマージされたタイミングで close します。

dev / master ブランチにUPされたタイミングで上記確認環境にDeployされますので、確認が可能です。


### タグのリリース

dev 宛のPRは全て Squash マージで行います。

dev -> master へのPR を以てリリースとし、マージとともにリリースタグを発行します。





## 作業環境の構築

必要モジュールのインストール

````
$ npm i 
````

ビルド

````
$ npm run build
````

スタイルガイド制作用開発サーバの起動

````
$ npm start
````

スタイルガイドのpug

````
pugcache.jsonファイルごと削除
````

モック制作用開発サーバの起動

````
$ npm run dev
````

アイコンを表示させる

```
$ npm run build:moc
```

## 環境変数による設定

### appRoot の設定

スタイルガイドをビルドする際、JavaScriptやCSSなどのリソースのパスに接頭辞を付けたい場合は、環境変数 `APP_ROOT` を使用できます。
これは特にサブディレクトリにデプロイする場合に便利です。

例えば、`/styleguide/` というパスにデプロイする場合：

```
$ APP_ROOT=/styleguide/ npm run build:styleguide:generate
```

`APP_ROOT` が指定されない場合、デフォルト値は空文字 (`''`) となります。

GitHub Actions でのデプロイ時にも `APP_ROOT=/Eccube-Styleguide` が設定されており、GitHub Pages 上では適切なパスでリソースが読み込まれます。
