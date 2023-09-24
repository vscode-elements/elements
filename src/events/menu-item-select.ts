export type VscMenuItemSelectEvent = CustomEvent<{
  label: string;
  keybinding: string;
  value: string;
  separator: boolean;
  tabindex: number;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-menu-item-select': VscMenuItemSelectEvent;
  }
}
