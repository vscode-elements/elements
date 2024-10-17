export interface Option {
  label: string;
  value: string;
  description: string;
  selected: boolean;
  disabled: boolean;
  icon: string;
  iconUrl: string;
}

export interface InternalOption extends Option {
  index: number;
  ranges?: [number, number][];
}

export type SearchMethod =
  | 'startsWithPerTerm'
  | 'startsWith'
  | 'contains'
  | 'fuzzy';
