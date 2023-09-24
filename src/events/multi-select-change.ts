export type VscMultiSelectChangeEvent = CustomEvent<{
  selectedIndexes: number[];
  value: string[];
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-multi-select-change': VscMultiSelectChangeEvent;
  }
}
