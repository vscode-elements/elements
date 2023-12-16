export type VscMenuSelectEvent = CustomEvent<{
  keybinding: string;
  label: string;
  value: string;
  separator: boolean;
  tabindex: number;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-menu-select': VscMenuSelectEvent;
  }
}
