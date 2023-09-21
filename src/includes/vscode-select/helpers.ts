import {InternalOption, SearchMethod} from './types.js';

export const startsWithPerTermMatch = (
  subject: string,
  pattern: string
): boolean => {
  const lcSubject = subject.toLowerCase();
  const lcPattern = pattern.toLowerCase();
  const terms = lcSubject.split(' ');

  return terms.some((t) => t.indexOf(lcPattern) === 0);
};

export const startsWithMatch = (subject: string, pattern: string): boolean =>
  subject.toLowerCase().indexOf(pattern.toLowerCase()) === 0;

export const containsMatch = (subject: string, pattern: string): boolean =>
  subject.toLowerCase().indexOf(pattern.toLowerCase()) > -1;

export const fuzzyMatch = (subject: string, pattern: string): boolean => {
  let iFrom = 0;
  let iFound = 0;
  const iMax = pattern.length - 1;
  const lcSubject = subject.toLowerCase();
  const lcPattern = pattern.toLowerCase();

  for (let i = 0; i <= iMax; i++) {
    iFound = lcSubject.indexOf(lcPattern[i], iFrom);

    if (iFound === -1) {
      return false;
    }

    iFrom = iFound + 1;
  }

  return true;
};

export const filterOptionsByPattern = (
  list: InternalOption[],
  pattern: string,
  method: SearchMethod
): InternalOption[] => {
  return list.filter(({label}) => {
    switch (method) {
      case 'startsWithPerTerm':
        return startsWithPerTermMatch(label, pattern);
      case 'startsWith':
        return startsWithMatch(label, pattern);
      case 'contains':
        return containsMatch(label, pattern);
      default:
        return fuzzyMatch(label, pattern);
    }
  });
};
