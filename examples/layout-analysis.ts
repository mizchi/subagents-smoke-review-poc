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

// 各レイアウトのコンテンツエリアを比較
console.log('レイアウト間のコンテンツエリア面積差:');
console.log('=====================================');

const mobileMainContent = layouts.mobile[1];
const tabletMainContent = layouts.tablet[2];
const desktopMainContent = layouts.desktop[2];

console.log(`モバイル vs タブレット: ${calculateAreaDifference(mobileMainContent, tabletMainContent).toLocaleString()} px²`);
console.log(`タブレット vs デスクトップ: ${calculateAreaDifference(tabletMainContent, desktopMainContent).toLocaleString()} px²`);
console.log(`モバイル vs デスクトップ: ${calculateAreaDifference(mobileMainContent, desktopMainContent).toLocaleString()} px²`);

// 同じデバイス内での要素の類似度分析
console.log('\nデスクトップレイアウトの要素類似度:');
console.log('===================================');

const desktopSimilarities = calculatePairwiseSimilarities(layouts.desktop);
const elementNames = ['ヘッダー', '左サイドバー', 'メインコンテンツ', '右サイドバー'];

desktopSimilarities.forEach(result => {
  const elem1 = elementNames[result.firstIndex];
  const elem2 = elementNames[result.secondIndex];
  
  if (result.similarity > 0.3) {
    console.log(`${elem1} と ${elem2}: ${(result.similarity * 100).toFixed(1)}% の類似度`);
  }
});

// 対称性のあるレイアウト要素を検出
console.log('\n対称的な要素（類似度60%以上）:');
const symmetricElements = desktopSimilarities.filter(s => s.similarity >= 0.6);
if (symmetricElements.length > 0) {
  symmetricElements.forEach(result => {
    console.log(`- ${elementNames[result.rect1]} と ${elementNames[result.rect2]}`);
  });
} else {
  console.log('- 対称的な要素は見つかりませんでした');
}