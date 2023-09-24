export type VscTextareaChangeEvent = CustomEvent<{
  data: string | null;
  originalEvent: InputEvent;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-textarea-change': VscTextareaChangeEvent;
  }
}
