export type VscCheckboxChangeEvent = CustomEvent<{
  checked: boolean;
  label: string;
  value: string;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-checkbox-change': VscCheckboxChangeEvent;
  }
}
