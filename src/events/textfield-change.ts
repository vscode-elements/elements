export type VscTextfieldChangeEvent = CustomEvent<{
  data: string | null;
  originalEvent: InputEvent;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-textfield-change': VscTextfieldChangeEvent;
  }
}
