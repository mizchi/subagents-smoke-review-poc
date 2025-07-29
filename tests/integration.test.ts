import { describe, it, expect } from 'vitest';
import { Rect, calculateAreaDifference } from '../src/index';

describe('Rectangle Library Integration', () => {
  describe('Real-world usage scenarios', () => {
    it('should calculate area difference for UI layout comparison', () => {
      // モバイル画面とデスクトップ画面の比較
      const mobileScreen: Rect = { x: 0, y: 0, width: 375, height: 667 };
      const desktopScreen: Rect = { x: 0, y: 0, width: 1920, height: 1080 };
      
      const areaDifference = calculateAreaDifference(mobileScreen, desktopScreen);
      expect(areaDifference).toBe(1823475); // 2073600 - 250125
    });

    it('should handle game object collision detection preparation', () => {
      // ゲームオブジェクトのバウンディングボックス
      const player: Rect = { x: 100, y: 200, width: 32, height: 64 };
      const enemy: Rect = { x: 150, y: 180, width: 48, height: 48 };
      
      const sizeDifference = calculateAreaDifference(player, enemy);
      expect(sizeDifference).toBe(256); // |2048 - 2304|
    });

    it('should work with responsive design breakpoints', () => {
      // レスポンシブデザインのブレークポイント
      const phoneViewport: Rect = { x: 0, y: 0, width: 320, height: 568 };
      const tabletViewport: Rect = { x: 0, y: 0, width: 768, height: 1024 };
      const laptopViewport: Rect = { x: 0, y: 0, width: 1366, height: 768 };
      
      const phoneTabletDiff = calculateAreaDifference(phoneViewport, tabletViewport);
      const tabletLaptopDiff = calculateAreaDifference(tabletViewport, laptopViewport);
      
      expect(phoneTabletDiff).toBe(604672); // |181760 - 786432|
      expect(tabletLaptopDiff).toBe(262656); // |786432 - 1049088|
    });
  });

  describe('Error handling and edge cases', () => {
    it('should handle floating point rectangles', () => {
      const rect1: Rect = { x: 0.5, y: 0.5, width: 10.5, height: 20.5 };
      const rect2: Rect = { x: 1.5, y: 1.5, width: 15.5, height: 15.5 };
      
      const difference = calculateAreaDifference(rect1, rect2);
      expect(difference).toBe(Math.abs(10.5 * 20.5 - 15.5 * 15.5));
    });

    it('should handle very large rectangles without overflow', () => {
      const largeRect1: Rect = { x: 0, y: 0, width: 100000, height: 100000 };
      const largeRect2: Rect = { x: 0, y: 0, width: 99999, height: 99999 };
      
      const difference = calculateAreaDifference(largeRect1, largeRect2);
      expect(difference).toBe(199999); // 10000000000 - 9999800001
    });
  });

  describe('Library composition', () => {
    it('should work with array of rectangles', () => {
      const rectangles: Rect[] = [
        { x: 0, y: 0, width: 10, height: 10 },
        { x: 10, y: 0, width: 20, height: 20 },
        { x: 30, y: 0, width: 30, height: 30 }
      ];
      
      // 隣接する矩形の面積差を計算
      const differences = rectangles.slice(0, -1).map((rect, i) => 
        calculateAreaDifference(rect, rectangles[i + 1])
      );
      
      expect(differences).toEqual([300, 500]); // [|100-400|, |400-900|]
    });

    it('should support functional programming patterns', () => {
      const baseRect: Rect = { x: 0, y: 0, width: 100, height: 100 };
      const variations: Rect[] = [
        { x: 0, y: 0, width: 90, height: 110 },
        { x: 0, y: 0, width: 110, height: 90 },
        { x: 0, y: 0, width: 100, height: 100 }
      ];
      
      const differences = variations
        .map(rect => calculateAreaDifference(baseRect, rect))
        .filter(diff => diff > 0);
      
      expect(differences).toEqual([100, 100]); // 最後の要素は同じサイズなので0
    });
  });
});