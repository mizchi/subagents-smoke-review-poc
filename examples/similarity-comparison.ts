import { Rect, calculatePairwiseSimilarities } from '../dist/index.js';

// 様々なサイズのUI要素を定義（類似度の違いを示す）
const uiElements: Rect[] = [
  { x: 0, y: 0, width: 100, height: 100 },     // 正方形
  { x: 200, y: 0, width: 100, height: 100 },   // 同じ正方形
  { x: 0, y: 200, width: 100, height: 50 },    // 横長（面積は半分）
  { x: 200, y: 200, width: 50, height: 100 },  // 縦長（面積は半分）
  { x: 0, y: 400, width: 200, height: 200 }    // 大きな正方形（面積は4倍）
];

// すべての組み合わせの類似度を計算
const similarities = calculatePairwiseSimilarities(uiElements);

console.log('UI要素の類似度分析:');
console.log('========================');

const elementNames = ['正方形1', '正方形2', '横長', '縦長', '大正方形'];

// 類似度でグループ化して表示
console.log('\n完全一致（類似度 100%）:');
similarities.filter(s => s.similarity === 1.0).forEach(result => {
  console.log(`- ${elementNames[result.firstIndex]} と ${elementNames[result.secondIndex]}`);
});

console.log('\n中程度の類似（類似度 25-75%）:');
similarities.filter(s => s.similarity > 0.25 && s.similarity < 0.75).forEach(result => {
  console.log(`- ${elementNames[result.firstIndex]} と ${elementNames[result.secondIndex]}: ${(result.similarity * 100).toFixed(0)}%`);
});

console.log('\n低い類似（類似度 25%以下）:');
similarities.filter(s => s.similarity <= 0.25).forEach(result => {
  console.log(`- ${elementNames[result.firstIndex]} と ${elementNames[result.secondIndex]}: ${(result.similarity * 100).toFixed(0)}%`);
});