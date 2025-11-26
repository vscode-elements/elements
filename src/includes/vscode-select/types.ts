export interface Option {
  label?: string;
  value?: string;
  description?: string;
  selected?: boolean;
  disabled?: boolean;
  action: { icon: string; title?: string; type: string; } | undefined;
}

export interface InternalOption extends Required<Option> {
  index: number;
  /** Option index in the filtered list. */
  filteredIndex: number;
  /** Character ranges to highlight matches in the filtered list. */
  ranges?: [number, number][];
  visible: boolean;
}

export type FilterMethod =
  | 'startsWithPerTerm'
  | 'startsWith'
  | 'contains'
  | 'fuzzy';
