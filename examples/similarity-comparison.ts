import { Rect, calculatePairwiseSimilarities } from '../dist/index.js';

// 複数のUI要素の配置を定義
const uiElements: Rect[] = [
  { x: 0, y: 0, width: 100, height: 50 },      // ヘッダー
  { x: 0, y: 60, width: 100, height: 200 },    // サイドバー
  { x: 110, y: 60, width: 300, height: 200 },  // メインコンテンツ
  { x: 0, y: 270, width: 410, height: 30 },    // フッター
  { x: 10, y: 70, width: 80, height: 180 }     // サイドバーと重なる要素
];

// すべての組み合わせの類似度を計算
const similarities = calculatePairwiseSimilarities(uiElements);

console.log('UI要素の類似度分析:');
console.log('========================');

// 類似度が高い順に表示
similarities.forEach((result, index) => {
  const elementNames = ['ヘッダー', 'サイドバー', 'メインコンテンツ', 'フッター', '重なり要素'];
  const elem1 = elementNames[result.firstIndex];
  const elem2 = elementNames[result.secondIndex];
  
  console.log(`${index + 1}. ${elem1} と ${elem2}: 類似度 ${(result.similarity * 100).toFixed(1)}%`);
});

// 類似度が高い（50%以上）ペアを抽出
console.log('\n類似度が高い要素ペア（50%以上）:');
const highSimilarity = similarities.filter(s => s.similarity >= 0.5);
highSimilarity.forEach(result => {
  const elementNames = ['ヘッダー', 'サイドバー', 'メインコンテンツ', 'フッター', '重なり要素'];
  console.log(`- ${elementNames[result.firstIndex]} と ${elementNames[result.secondIndex]}`);
});