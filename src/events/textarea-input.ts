export type VscTextareaInputEvent = CustomEvent<{
  data: string | null;
  originalEvent: InputEvent;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'vsc-textarea-input': VscTextareaInputEvent;
  }
}
