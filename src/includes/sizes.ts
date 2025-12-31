export type Px = number & {readonly __unit: 'px'};
export type Percent = number & {readonly __unit: '%'};

export const px = (value: number): Px => value as Px;
export const percent = (value: number): Percent => value as Percent;

export const toPercent = (px: Px, container: Px): Percent =>
  percent((px / container) * 100);

export const toPx = (p: Percent, container: Px): Px =>
  px((p / 100) * container);

type Parser = {
  test: (value: string) => boolean;
  parse: (value: string, base: number) => number;
};

const parsers: Parser[] = [
  {
    test: (v) => /^-?\d+(\.\d+)?%$/.test(v),
    parse: (v) => Number(v.slice(0, -1)),
  },
  {
    test: (v) => /^-?\d+(\.\d+)?px$/.test(v),
    parse: (v, base) => (Number(v.slice(0, -2)) / base) * 100,
  },
  {
    test: (v) => /^-?\d+(\.\d+)?$/.test(v),
    parse: (v, base) => (Number(v) / base) * 100,
  },
];

export const parseSizeAttributeToPercent = (
  raw: string | number,
  base: number
): Percent | null => {
  if (!Number.isFinite(base) || base === 0) {
    return null;
  }

  if (typeof raw === 'number') {
    return Number.isFinite(raw) ? percent((raw / base) * 100) : null;
  }

  const value = raw.trim();
  const parser = parsers.find((p) => p.test(value));

  return parser ? percent(parser.parse(value, base)) : null;
};
