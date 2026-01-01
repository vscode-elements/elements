import {Percent, percent} from '../includes/sizes.js';

export function calculateColumnWidths(
  widths: Percent[],
  splitterIndex: number,
  delta: Percent,
  minWidths: Map<number, Percent>
): Percent[] {
  const result = [...widths];

  // No-op for invalid splitter position or zero delta
  if (delta === 0 || splitterIndex < 0 || splitterIndex >= widths.length - 1) {
    return result;
  }

  const absDelta = Math.abs(delta);
  let remaining: Percent = percent(absDelta);

  const leftIndices: number[] = [];
  const rightIndices: number[] = [];

  // Collect column indices to the left of the splitter (inclusive)
  for (let i = splitterIndex; i >= 0; i--) {
    leftIndices.push(i);
  }

  // Collect column indices to the right of the splitter
  for (let i = splitterIndex + 1; i < widths.length; i++) {
    rightIndices.push(i);
  }

  // One side shrinks, the other grows depending on drag direction
  const shrinkingSide = delta > 0 ? rightIndices : leftIndices;
  const growingSide = delta > 0 ? leftIndices : rightIndices;

  // Calculate total shrinkable space respecting minWidth
  let totalAvailable: Percent = percent(0);

  for (const i of shrinkingSide) {
    const available = Math.max(0, result[i] - (minWidths.get(i) ?? 0));
    totalAvailable = percent(totalAvailable + available);
  }

  // Abort if the requested delta cannot be fully satisfied
  if (totalAvailable < remaining) {
    return result;
  }

  // Shrink columns sequentially until the delta is fully consumed
  for (const i of shrinkingSide) {
    if (remaining === 0) {
      break;
    }

    const available = Math.max(0, result[i] - (minWidths.get(i) ?? 0));
    const take = Math.min(available, remaining);

    result[i] = percent(result[i] - take);
    remaining = percent(remaining - take);
  }

  // Apply the exact opposite delta to the growing side
  let toAdd: Percent = percent(absDelta);

  for (const i of growingSide) {
    if (toAdd === 0) {
      break;
    }

    result[i] = percent(result[i] + toAdd);
    toAdd = percent(0); // all growth is applied to the nearest column
  }

  return result;
}
