## 概要
iOSアプリがmicroCMSと安全に通信するためのプロキシサーバー<br>
APIキーをアプリ側に含めず、サーバーサイドで中継することでセキュリティを向上させる

## 役割
* クライアント（アプリ）からのリクエストを安全にmicroCMSへ転送する
* 認証情報（APIキー等）をサーバー側で管理・付与する

## 使用技術
* Node.js
* Vercel Serverless Functions
