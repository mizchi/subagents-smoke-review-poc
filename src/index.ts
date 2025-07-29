export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function calculateAreaDifference(a: Rect, b: Rect): number {
  return Math.abs(a.width * a.height - b.width * b.height);
}
