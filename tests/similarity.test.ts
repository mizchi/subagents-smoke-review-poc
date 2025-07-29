import { describe, it, expect } from 'vitest';
import { Rect, calculatePairwiseSimilarities, type SimilarityResult } from '../src/index';

describe('Rectangle Similarity Calculation', () => {
  it('should calculate similarity between all pairs of rectangles', () => {
    const rects: Rect[] = [
      { x: 0, y: 0, width: 100, height: 100 },
      { x: 50, y: 50, width: 100, height: 100 },
      { x: 200, y: 200, width: 50, height: 50 }
    ];
    
    const results = calculatePairwiseSimilarities(rects);
    
    expect(results).toHaveLength(3); // 3つのRectから3ペア
    expect(results[0]).toHaveProperty('firstIndex');
    expect(results[0]).toHaveProperty('secondIndex');
    expect(results[0]).toHaveProperty('similarity');
    
    // 近似度は0-1の範囲
    results.forEach(result => {
      expect(result.similarity).toBeGreaterThanOrEqual(0);
      expect(result.similarity).toBeLessThanOrEqual(1);
    });
    
    // 降順にソートされている
    for (let i = 1; i < results.length; i++) {
      expect(results[i-1].similarity).toBeGreaterThanOrEqual(results[i].similarity);
    }
  });
  
  it('should return similarity of 1 for identical rectangles', () => {
    const rects: Rect[] = [
      { x: 10, y: 10, width: 50, height: 50 },
      { x: 10, y: 10, width: 50, height: 50 }
    ];
    
    const results = calculatePairwiseSimilarities(rects);
    
    expect(results).toHaveLength(1);
    expect(results[0].similarity).toBe(1);
  });
  
  it('should handle empty array', () => {
    const results = calculatePairwiseSimilarities([]);
    
    expect(results).toHaveLength(0);
  });
  
  it('should handle single rectangle', () => {
    const rects: Rect[] = [
      { x: 0, y: 0, width: 100, height: 100 }
    ];
    
    const results = calculatePairwiseSimilarities(rects);
    
    expect(results).toHaveLength(0);
  });
  
  it('should calculate higher similarity for overlapping rectangles', () => {
    const rects: Rect[] = [
      { x: 0, y: 0, width: 100, height: 100 },
      { x: 50, y: 50, width: 100, height: 100 }, // 重なりあり
      { x: 200, y: 200, width: 100, height: 100 } // 重なりなし
    ];
    
    const results = calculatePairwiseSimilarities(rects);
    
    const overlap = results.find(r => 
      (r.firstIndex === 0 && r.secondIndex === 1) || (r.firstIndex === 1 && r.secondIndex === 0)
    );
    const noOverlap = results.find(r => 
      (r.firstIndex === 0 && r.secondIndex === 2) || (r.firstIndex === 2 && r.secondIndex === 0)
    );
    
    expect(overlap!.similarity).toBeGreaterThan(noOverlap!.similarity);
  });
});