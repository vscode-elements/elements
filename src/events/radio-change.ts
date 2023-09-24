export type VscRadioChangeEvent = CustomEvent<{
  checked: boolean;
  label: string;
  value: string;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-radio-change': VscRadioChangeEvent;
  }
}
