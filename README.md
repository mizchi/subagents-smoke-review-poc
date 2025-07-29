# Rectangle Calculation Library

A simple TypeScript library for rectangle calculations.

## Installation

```bash
npm install play-agents
```

## API Reference

### Types

#### `Rect`

Represents a rectangle with position and dimensions.

```typescript
type Rect = {
  x: number;      // X coordinate of the rectangle's top-left corner
  y: number;      // Y coordinate of the rectangle's top-left corner
  width: number;  // Width of the rectangle
  height: number; // Height of the rectangle
}
```

### Functions

#### `calculateSurface(a: Rect, b: Rect): number`

Calculates the absolute difference between the areas of two rectangles.

**Parameters:**
- `a`: First rectangle
- `b`: Second rectangle

**Returns:**
- The absolute difference between the areas of the two rectangles

**Example:**

```typescript
import { Rect, calculateSurface } from 'play-agents';

const rect1: Rect = { x: 0, y: 0, width: 10, height: 5 };  // Area: 50
const rect2: Rect = { x: 5, y: 5, width: 8, height: 4 };   // Area: 32

const difference = calculateSurface(rect1, rect2); // Returns: 18
```

## Notes

- The `calculateSurface` function returns the absolute difference, so the order of rectangles doesn't matter
- Negative width or height values are not validated but may produce unexpected results
- The position (x, y) does not affect the area calculation

## License

MIT