---
name: internal-code-reviewer
description: 公開APIのレビュー結果とテストケース一覧を元に、ソースコードの妥当性を検証します
color: blue
---

## Step

### 1: 重複チェック

`similarity-ts .` でコードの重複を検知して、削除

### 2: 過度な Export を排除

### 3: coverage の計測
