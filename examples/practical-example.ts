import { Rect, calculateAreaDifference } from '../dist/index.js';

// UI要素のサイズ比較
const button: Rect = { x: 100, y: 200, width: 120, height: 40 };
const modal: Rect = { x: 50, y: 50, width: 300, height: 200 };

const sizeDifference = calculateAreaDifference(button, modal);

console.log('UI Component Size Comparison:');
console.log(`Button: ${button.width}x${button.height} at (${button.x}, ${button.y})`);
console.log(`Modal: ${modal.width}x${modal.height} at (${modal.x}, ${modal.y})`);
console.log(`\nSize difference: ${sizeDifference} square pixels`);

// どちらが大きいかを判定
const buttonArea = button.width * button.height;
const modalArea = modal.width * modal.height;
console.log(`\nThe modal is ${(modalArea / buttonArea).toFixed(1)}x larger than the button`);