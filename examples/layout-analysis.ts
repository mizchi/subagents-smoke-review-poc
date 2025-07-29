import { Rect, calculatePairwiseSimilarities, calculateAreaDifference } from '../dist/index.js';

// 実践例: レスポンシブデザインのレイアウト分析

// モバイル、タブレット、デスクトップの主要コンテンツエリア
const layouts = {
  mobile: [
    { x: 0, y: 0, width: 375, height: 60 },      // ヘッダー
    { x: 0, y: 60, width: 375, height: 400 },    // メインコンテンツ
    { x: 0, y: 460, width: 375, height: 100 }    // ナビゲーション
  ],
  tablet: [
    { x: 0, y: 0, width: 768, height: 80 },      // ヘッダー
    { x: 0, y: 80, width: 200, height: 600 },    // サイドバー
    { x: 200, y: 80, width: 568, height: 600 }   // メインコンテンツ
  ],
  desktop: [
    { x: 0, y: 0, width: 1920, height: 100 },     // ヘッダー
    { x: 0, y: 100, width: 300, height: 800 },    // サイドバー
    { x: 300, y: 100, width: 1320, height: 800 }, // メインコンテンツ
    { x: 1620, y: 100, width: 300, height: 800 }  // 右サイドバー
  ]
};

// 各レイアウトのメインコンテンツエリアを比較
console.log('レイアウト間のコンテンツエリア面積差:');

const mobileMain = layouts.mobile[1];
const tabletMain = layouts.tablet[2];
const desktopMain = layouts.desktop[2];

console.log(`モバイル vs タブレット: ${calculateAreaDifference(mobileMain, tabletMain).toLocaleString()} px²`);
console.log(`タブレット vs デスクトップ: ${calculateAreaDifference(tabletMain, desktopMain).toLocaleString()} px²`);

// デスクトップレイアウトの要素類似度分析
console.log('\nデスクトップレイアウトの要素類似度:');

const similarities = calculatePairwiseSimilarities(layouts.desktop);
const elementNames = ['ヘッダー', '左サイドバー', 'メインコンテンツ', '右サイドバー'];

// 対称的な要素を検出（類似度60%以上）
const symmetricPairs = similarities
  .filter(s => s.similarity >= 0.6)
  .map(s => `${elementNames[s.firstIndex]} と ${elementNames[s.secondIndex]}`);

if (symmetricPairs.length > 0) {
  console.log('対称的な要素:', symmetricPairs.join(', '));
} else {
  console.log('対称的な要素は見つかりませんでした');
}