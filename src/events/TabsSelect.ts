export type VscMenuSelectEvent = CustomEvent<{selectedIndex: number}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-tabs-select': VscMenuSelectEvent;
  }
}
