import { describe, it, expect } from 'vitest';
import { Rect, calculateSurface } from './index';

describe('Rect type', () => {
  it('should accept valid rectangle properties', () => {
    const rect: Rect = { x: 0, y: 0, width: 10, height: 5 };
    expect(rect.x).toBe(0);
    expect(rect.y).toBe(0);
    expect(rect.width).toBe(10);
    expect(rect.height).toBe(5);
  });
});

describe('calculateSurface', () => {
  it('should calculate absolute difference between two rectangle areas', () => {
    const rect1: Rect = { x: 0, y: 0, width: 10, height: 5 }; // Area: 50
    const rect2: Rect = { x: 5, y: 5, width: 8, height: 4 };  // Area: 32
    
    const result = calculateSurface(rect1, rect2);
    expect(result).toBe(18);
  });

  it('should return same result regardless of parameter order', () => {
    const rect1: Rect = { x: 0, y: 0, width: 10, height: 5 };
    const rect2: Rect = { x: 5, y: 5, width: 8, height: 4 };
    
    const result1 = calculateSurface(rect1, rect2);
    const result2 = calculateSurface(rect2, rect1);
    
    expect(result1).toBe(result2);
  });

  it('should return 0 when both rectangles have same area', () => {
    const rect1: Rect = { x: 0, y: 0, width: 5, height: 4 };
    const rect2: Rect = { x: 10, y: 10, width: 10, height: 2 };
    
    const result = calculateSurface(rect1, rect2);
    expect(result).toBe(0);
  });

  it('should handle rectangles with zero area', () => {
    const rect1: Rect = { x: 0, y: 0, width: 0, height: 10 };
    const rect2: Rect = { x: 0, y: 0, width: 10, height: 5 };
    
    const result = calculateSurface(rect1, rect2);
    expect(result).toBe(50);
  });

  it('should handle negative dimensions (edge case)', () => {
    const rect1: Rect = { x: 0, y: 0, width: -10, height: 5 };
    const rect2: Rect = { x: 0, y: 0, width: 10, height: 5 };
    
    const result = calculateSurface(rect1, rect2);
    expect(result).toBe(100); // rect1: -10 * 5 = -50, rect2: 10 * 5 = 50, |(-50) - 50| = 100
  });

  it('should not be affected by position (x, y)', () => {
    const rect1: Rect = { x: 100, y: 200, width: 10, height: 5 };
    const rect2: Rect = { x: -50, y: -100, width: 10, height: 5 };
    
    const result = calculateSurface(rect1, rect2);
    expect(result).toBe(0);
  });
});