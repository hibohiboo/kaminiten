

https://d2k9ctsweqhomg.cloudfront.net/docs/

project-root/
│
├── backend/              (バックエンドアプリケーションのソースコード)
├── frontend/             (フロントエンドアプリケーションのソースコード)
│   ├── src/              (フロントエンドのソースコード)
├── infrastructure/       (AWSインフラストラクチャコード)
│   ├── lib/    (AWS CloudFormationテンプレート)
│   ├── bin/           (デプロイスクリプトやAWS CLIコマンド)
│   ├── package.json   (デプロイ用npm scripts)
│
├── docs/                  (プロジェクト全体のドキュメント)
│   ├── src
│     ├── contents 
│       ├── backend-api.md    (バックエンドAPIの仕様)
│       ├── frontend-doc.md   (フロントエンドの仕様)
│       ├── deployment.md     (AWSデプロイの手順)
│       ├── overall-doc.md    (プロジェクト全体の説明とガイド)
│
├── README.md             (プロジェクト全体の説明と導入ガイド)
├── package.json          (ルートの依存関係と設定)
