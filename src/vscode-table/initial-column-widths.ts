import {percent, Percent} from '../includes/sizes.js';

const PERCENT_FULL = percent(100);

export type ColumnWidth = Percent | 'auto';

export interface Column {
  preferredWidth: ColumnWidth;
  minWidth: Percent;
}

export function calculateInitialWidths(columns: Column[]): Percent[] {
  const finalWidths: Percent[] = columns.map(
    (c) =>
      typeof c.preferredWidth === 'number'
        ? percent(Math.max(c.preferredWidth, c.minWidth))
        : percent(0) // auto placeholder
  );

  const autoIndices = columns
    .map((c, i) => (c.preferredWidth === 'auto' ? i : -1))
    .filter((i) => i >= 0);

  const totalMinWidth = columns.reduce(
    (sum, c) => percent(sum + c.minWidth),
    percent(0)
  );

  if (totalMinWidth > PERCENT_FULL) {
    const scale = PERCENT_FULL / totalMinWidth;
    return columns.map((c) => percent(c.minWidth * scale));
  }

  const fixedWidthSum = finalWidths.reduce(
    (sum, w) => percent(sum + w),
    percent(0)
  );
  const remainingSpace = percent(PERCENT_FULL - fixedWidthSum);

  if (remainingSpace > 0 && autoIndices.length > 0) {
    const extraPerAuto = remainingSpace / autoIndices.length;
    for (const i of autoIndices) {
      finalWidths[i] = percent(Math.max(columns[i].minWidth, extraPerAuto));
    }
    return finalWidths;
  }

  if (autoIndices.length > 0) {
    for (const i of autoIndices) {
      finalWidths[i] = columns[i].minWidth;
    }
    return finalWidths;
  }

  if (remainingSpace > 0 && autoIndices.length === 0) {
    const scale = PERCENT_FULL / fixedWidthSum;
    return finalWidths.map((w) => percent(w * scale));
  }

  return finalWidths;
}
