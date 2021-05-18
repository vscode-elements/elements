export interface Option {
  label: string;
  value: string;
  description: string;
  selected: boolean;
}

export interface InternalOption extends Option {
  index: number;
}

export type SearchMethod =
  | 'startsWithPerTerm'
  | 'startsWith'
  | 'contains'
  | 'fuzzy';
