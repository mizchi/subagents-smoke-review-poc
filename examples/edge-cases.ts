import { Rect, calculateSurface } from '../dist/index.js';

console.log('Edge Cases Demo:\n');

// 同じサイズの長方形
const square1: Rect = { x: 0, y: 0, width: 10, height: 10 };
const square2: Rect = { x: 50, y: 50, width: 10, height: 10 };
console.log('1. Same size rectangles:');
console.log(`   Square 1: ${square1.width}x${square1.height}`);
console.log(`   Square 2: ${square2.width}x${square2.height}`);
console.log(`   Area difference: ${calculateSurface(square1, square2)}\n`);

// 位置が異なるが同じサイズ
const rect1: Rect = { x: 0, y: 0, width: 20, height: 15 };
const rect2: Rect = { x: 100, y: 100, width: 20, height: 15 };
console.log('2. Different position, same size:');
console.log(`   Rect 1 at (${rect1.x}, ${rect1.y}): ${rect1.width}x${rect1.height}`);
console.log(`   Rect 2 at (${rect2.x}, ${rect2.y}): ${rect2.width}x${rect2.height}`);
console.log(`   Area difference: ${calculateSurface(rect1, rect2)}\n`);

// 順序を入れ替えても同じ結果
const a: Rect = { x: 0, y: 0, width: 5, height: 10 };
const b: Rect = { x: 0, y: 0, width: 10, height: 5 };
console.log('3. Order independence:');
console.log(`   A (${a.width}x${a.height}) vs B (${b.width}x${b.height}): ${calculateSurface(a, b)}`);
console.log(`   B (${b.width}x${b.height}) vs A (${a.width}x${a.height}): ${calculateSurface(b, a)}\n`);

// ゼロ面積
const zeroRect: Rect = { x: 0, y: 0, width: 0, height: 10 };
const normalRect: Rect = { x: 0, y: 0, width: 10, height: 10 };
console.log('4. Zero area rectangle:');
console.log(`   Zero rect: ${zeroRect.width}x${zeroRect.height} (area: ${zeroRect.width * zeroRect.height})`);
console.log(`   Normal rect: ${normalRect.width}x${normalRect.height} (area: ${normalRect.width * normalRect.height})`);
console.log(`   Area difference: ${calculateSurface(zeroRect, normalRect)}`);