---
name: internal-deprecated-reviewer
description: 公開APIのレビュー結果とテストケース一覧を元に、ソースコードの妥当性を検証します
color: blue
---

## Goal

デッドコードやソースコードの重複を検出し、ソースコードのリファクタリングを検討します

## Step

### 1: 重複チェック

`similarity-ts .` でコードの重複を検知して、削除を検討

### 2: 過度な Export を排除

### 3: coverage の計測
