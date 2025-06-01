// TODO: Make all property optional
export interface Option {
  label: string;
  value: string;
  description: string;
  selected: boolean;
  disabled: boolean;
}

export interface InternalOption extends Option {
  index: number;
  relativeIndex: number;
  /** The original index of the option in the non-filtered list. */
  absoluteIndex?: number;
  /** Character ranges to highlight matches in the filtered list. */
  ranges?: [number, number][];
  visible?: boolean;
}

export type FilterMethod =
  | 'startsWithPerTerm'
  | 'startsWith'
  | 'contains'
  | 'fuzzy';
