import {html, TemplateResult} from 'lit';
import {InternalOption, FilterMethod} from './types.js';

export type SearchResult = {
  match: boolean;
  ranges: [number, number][];
};

export const startsWithPerTermSearch = (
  subject: string,
  pattern: string
): SearchResult => {
  const result: SearchResult = {
    match: false,
    ranges: [],
  };
  const lcSubject = subject.toLowerCase();
  const lcPattern = pattern.toLowerCase();
  const terms = lcSubject.split(' ');
  let offset = 0;

  terms.forEach((t, i) => {
    if (i > 0) {
      offset += terms[i - 1].length + 1;
    }

    if (result.match) {
      return;
    }

    const foundIndex = t.indexOf(lcPattern);
    const patternLength = lcPattern.length;

    if (foundIndex === 0) {
      result.match = true;
      result.ranges.push([
        offset + foundIndex,
        Math.min(offset + foundIndex + patternLength, subject.length),
      ]);
    }
  });

  return result;
};

export const startsWithSearch = (
  subject: string,
  pattern: string
): SearchResult => {
  const result: SearchResult = {
    match: false,
    ranges: [],
  };
  const foundIndex = subject.toLowerCase().indexOf(pattern.toLowerCase());

  if (foundIndex === 0) {
    result.match = true;
    result.ranges = [[0, pattern.length]];
  }

  return result;
};

export const containsSearch = (
  subject: string,
  pattern: string
): SearchResult => {
  const result: SearchResult = {
    match: false,
    ranges: [],
  };
  const foundIndex = subject.toLowerCase().indexOf(pattern.toLowerCase());

  if (foundIndex > -1) {
    result.match = true;
    result.ranges = [[foundIndex, foundIndex + pattern.length]];
  }

  return result;
};

export const fuzzySearch = (subject: string, pattern: string): SearchResult => {
  const result: SearchResult = {
    match: false,
    ranges: [],
  };
  let fromIndex = 0;
  let foundIndex = 0;
  const iMax = pattern.length - 1;
  const lcSubject = subject.toLowerCase();
  const lcPattern = pattern.toLowerCase();

  for (let i = 0; i <= iMax; i++) {
    foundIndex = lcSubject.indexOf(lcPattern[i], fromIndex);

    if (foundIndex === -1) {
      return {
        match: false,
        ranges: [],
      };
    }

    result.match = true;
    result.ranges.push([foundIndex, foundIndex + 1]);

    fromIndex = foundIndex + 1;
  }

  return result;
};

export const filterOptionsByPattern = (
  list: InternalOption[],
  pattern: string,
  method: FilterMethod
): InternalOption[] => {
  const filtered: InternalOption[] = [];

  list.forEach((op) => {
    let result: SearchResult;

    switch (method) {
      case 'startsWithPerTerm':
        result = startsWithPerTermSearch(op.label, pattern);
        break;
      case 'startsWith':
        result = startsWithSearch(op.label, pattern);
        break;
      case 'contains':
        result = containsSearch(op.label, pattern);
        break;
      default:
        result = fuzzySearch(op.label, pattern);
    }

    if (result.match) {
      filtered.push({...op, ranges: result.ranges});
    }
  });

  return filtered;
};

const preventSpaces = (text: string): TemplateResult[] => {
  const res: TemplateResult[] = [];

  if (text === ' ') {
    res.push(html`&nbsp;`);

    return res;
  }

  if (text.indexOf(' ') === 0) {
    res.push(html`&nbsp;`);
  }

  res.push(html`${text.trimStart().trimEnd()}`);

  if (text.lastIndexOf(' ') === text.length - 1) {
    res.push(html`&nbsp;`);
  }

  return res;
};

export const highlightRanges = (
  text: string,
  ranges: [number, number][]
): TemplateResult | TemplateResult[] => {
  const res: TemplateResult[] = [];
  const rl = ranges.length;

  if (rl < 1) {
    return html`${text}`;
  }

  ranges.forEach((r, i) => {
    const match = text.substring(r[0], r[1]);

    if (i === 0 && r[0] !== 0) {
      // text before the first range
      res.push(...preventSpaces(text.substring(0, ranges[0][0])));
    }

    if (i > 0 && i < rl && r[0] - ranges[i - 1][1] !== 0) {
      // text before the current range
      res.push(...preventSpaces(text.substring(ranges[i - 1][1], r[0])));
    }

    res.push(html`<b>${preventSpaces(match)}</b>`);

    if (i === rl - 1 && r[1] < text.length) {
      // text after the last range
      res.push(...preventSpaces(text.substring(r[1], text.length)));
    }
  });

  return res;
};

export function findNextSelectableOptionIndex(
  options: InternalOption[],
  fromIndex: number
) {
  let result = 0;

  if (fromIndex < 0 || !options[fromIndex] || !options[fromIndex + 1]) {
    return result;
  }

  for (let i = fromIndex + 1; i < options.length; i++) {
    if (!options[i].disabled) {
      result = i;
      break;
    }
  }

  return result;
}

export function findPrevSelectableOptionIndex(
  options: InternalOption[],
  fromIndex: number
) {
  let result = 0;

  if (fromIndex < 0 || !options[fromIndex] || !options[fromIndex - 1]) {
    return result;
  }

  for (let i = fromIndex - 1; i >= 0; i--) {
    if (!options[i].disabled) {
      result = i;
      break;
    }
  }

  return result;
}
