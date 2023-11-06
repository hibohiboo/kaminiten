---
title: 'ChatGpt'
description: 'チャットGPT 2023-11-07'
pubDate: '2023-11-07'
heroImage: '/blog-placeholder-1.jpg'
---

## ノード名を英語で定義して、ラベルを日本語にしたうえで、アーキテクチャ図を書きなおしてください。ノード名には空白は含めず、_に置き換えて表現してください

```
graph TD

subgraph "User"
  User[ユーザー] --> Character_Creation[キャラクター作成]
  User --> Game_Selection[ゲーム選択]
  User --> Scenario_Play[シナリオプレイ]
  User --> Scenario_Proposal[シナリオ提案]
end

subgraph "Frontend"
  Character_Creation[キャラクター作成] -->|REST API| Backend
  Game_Selection[ゲーム選択] -->|REST API| Backend
  Scenario_Play[シナリオプレイ] -->|REST API| Backend
  Scenario_Proposal[シナリオ提案] -->|REST API| Backend
end

subgraph "Backend"
  Backend[バックエンド] --> Database[データベース]
  Backend --> REST_API[REST API]
  REST_API -->|データ操作| Database
end

subgraph "Database"
  Database[データベース] --> Character_Data[キャラデータ]
  Database --> Scenario_Data[シナリオデータ]
end
```

なお、これは使えなかった。

下記のように書き直し。(subgraphのUserとSubgraph内のUserがかぶっていた)

```
flowchart TD

subgraph u[User]
  User[ユーザー] --> Character_Creation[キャラクター作成]
  User --> Game_Selection[ゲーム選択]
  User --> Scenario_Play[シナリオプレイ]
  User --> Scenario_Proposal[シナリオ提案]
end

subgraph "Frontend"
  Character_Creation[キャラクター作成] -->|REST API| Backend
  Game_Selection[ゲーム選択] -->|REST API| Backend
  Scenario_Play[シナリオプレイ] -->|REST API| Backend
  Scenario_Proposal[シナリオ提案] -->|REST API| Backend
end

subgraph "Backend"
  Backend[バックエンド] --> Database[データベース]
  Backend --> REST_API[REST API]
  REST_API -->|データ操作| Database
end

subgraph "Database"
  Database[データベース] --> Character_Data[キャラデータ]
  Database --> Scenario_Data[シナリオデータ]
end
```