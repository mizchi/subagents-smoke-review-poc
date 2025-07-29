import { Rect, calculateAreaDifference, calculatePairwiseSimilarities } from '../dist/index.js';

// 位置情報を活用した例：グリッドレイアウトの分析
const gridItems: Rect[] = [
  // 3x3グリッドの要素
  { x: 0, y: 0, width: 100, height: 100 },     // 左上
  { x: 110, y: 0, width: 100, height: 100 },   // 中央上
  { x: 220, y: 0, width: 100, height: 100 },   // 右上
  { x: 0, y: 110, width: 100, height: 100 },   // 左中
  { x: 110, y: 110, width: 100, height: 100 }, // 中央
  { x: 220, y: 110, width: 100, height: 100 }, // 右中
];

console.log('グリッドレイアウトの分析:');
console.log('======================');

// すべて同じサイズの場合、面積差は0
const firstItem = gridItems[0];
const lastItem = gridItems[gridItems.length - 1];
console.log(`最初の要素と最後の要素の面積差: ${calculateAreaDifference(firstItem, lastItem)}`);

// 位置が異なっても類似度は計算される
const similarities = calculatePairwiseSimilarities(gridItems);
const highSimilarities = similarities.filter(s => s.similarity > 0.9);
console.log(`\n類似度90%以上のペア数: ${highSimilarities.length}`);

// 実用例：重なりの検出（同じ位置・サイズ）
const overlappingRects: Rect[] = [
  { x: 50, y: 50, width: 200, height: 150 },  // モーダル1
  { x: 50, y: 50, width: 200, height: 150 },  // モーダル2（重複）
  { x: 100, y: 100, width: 200, height: 150 }, // モーダル3（位置が異なる）
];

console.log('\n重複要素の検出:');
const modalSimilarities = calculatePairwiseSimilarities(overlappingRects);
modalSimilarities.forEach(result => {
  if (result.similarity === 1.0) {
    console.log(`要素${result.firstIndex}と要素${result.secondIndex}は完全に一致（重複の可能性）`);
  }
});