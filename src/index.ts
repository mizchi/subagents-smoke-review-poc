export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function calculateAreaDifference(a: Rect, b: Rect): number {
  return Math.abs(a.width * a.height - b.width * b.height);
}

export type SimilarityResult = {
  firstIndex: number;
  secondIndex: number;
  similarity: number;
};

const getCenterDistance = (a: Rect, b: Rect): number => {
  const centerA = { x: a.x + a.width / 2, y: a.y + a.height / 2 };
  const centerB = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  return Math.sqrt(
    Math.pow(centerA.x - centerB.x, 2) + Math.pow(centerA.y - centerB.y, 2)
  );
};

const getSizeSimilarity = (a: Rect, b: Rect): number => {
  const aArea = a.width * a.height;
  const bArea = b.width * b.height;
  return Math.min(aArea, bArea) / Math.max(aArea, bArea);
};

const getOverlapRatio = (a: Rect, b: Rect): number => {
  const xOverlap = Math.max(
    0,
    Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)
  );
  const yOverlap = Math.max(
    0,
    Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y)
  );
  const intersection = xOverlap * yOverlap;

  const aArea = a.width * a.height;
  const bArea = b.width * b.height;
  const union = aArea + bArea - intersection;

  return union > 0 ? intersection / union : 0;
};

const calculateSimilarity = (a: Rect, b: Rect): number => {
  const distance = getCenterDistance(a, b);
  const maxDistance = Math.sqrt(
    Math.pow(a.width + b.width, 2) + Math.pow(a.height + b.height, 2)
  );
  const distanceSimilarity = 1 - distance / maxDistance;

  const sizeSimilarity = getSizeSimilarity(a, b);
  const overlapRatio = getOverlapRatio(a, b);

  return distanceSimilarity * 0.4 + sizeSimilarity * 0.3 + overlapRatio * 0.3;
};

export function calculatePairwiseSimilarities(rects: Rect[]): SimilarityResult[] {
  const results: SimilarityResult[] = [];
  
  for (let i = 0; i < rects.length; i++) {
    for (let j = i + 1; j < rects.length; j++) {
      results.push({
        firstIndex: i,
        secondIndex: j,
        similarity: calculateSimilarity(rects[i], rects[j])
      });
    }
  }
  
  return results.sort((a, b) => b.similarity - a.similarity);
}
