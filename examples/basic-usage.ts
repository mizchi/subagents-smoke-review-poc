import { Rect, calculateAreaDifference } from '../dist/index.js';

// 基本的な長方形の定義
const rect1: Rect = { x: 0, y: 0, width: 10, height: 5 };
const rect2: Rect = { x: 5, y: 5, width: 8, height: 4 };

// 面積の差を計算
const difference = calculateAreaDifference(rect1, rect2);

console.log(`Rectangle 1: ${rect1.width}x${rect1.height} (area: ${rect1.width * rect1.height})`);
console.log(`Rectangle 2: ${rect2.width}x${rect2.height} (area: ${rect2.width * rect2.height})`);
console.log(`Area difference: ${difference}`);