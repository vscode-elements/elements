export type VscSingleSelectChangeEvent = CustomEvent<{
  selectedIndex: number;
  value: string;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-single-select-change': VscSingleSelectChangeEvent;
  }
}
