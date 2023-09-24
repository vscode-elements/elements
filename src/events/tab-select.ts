export type VscTabSelectEvent = CustomEvent<{
  selectedIndex: number;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-tab-select': VscTabSelectEvent;
  }
}
