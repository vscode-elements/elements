const DEFAULT_LINE_HEIGHT = 16;
const DEFAULT_FONT_SIZE = 13;

export const INPUT_LINE_HEIGHT_RATIO = DEFAULT_LINE_HEIGHT / DEFAULT_FONT_SIZE;

export const DEFUALT_INPUT_WIDGET_WIDTH = 320;

export function getDefaultFontStack() {
  if (navigator.userAgent.indexOf('Linux') > -1) {
    return 'system-ui, "Ubuntu", "Droid Sans", sans-serif';
  } else if (navigator.userAgent.indexOf('Mac') > -1) {
    return '-apple-system, BlinkMacSystemFont, sans-serif';
  } else if (navigator.userAgent.indexOf('Windows') > -1) {
    return '"Segoe WPC", "Segoe UI", sans-serif';
  } else {
    return 'sans-serif';
  }
}

export function getDefaultEditorFontStack() {
  if (navigator.userAgent.indexOf('Linux') > -1) {
    return '"Droid Sans Mono", "monospace", monospace';
  } else if (navigator.userAgent.indexOf('Mac') > -1) {
    return 'Menlo, Monaco, "Courier New", monospace';
  } else if (navigator.userAgent.indexOf('Windows') > -1) {
    return 'Consolas, "Courier New", monospace';
  } else {
    return 'monospace';
  }
}

export function logMessage(msg: string) {
  return `[VSCode Elements] ${msg}`;
}
