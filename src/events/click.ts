export type VscClickEvent = CustomEvent<{originalEvent: MouseEvent}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-click': VscClickEvent;
  }
}
