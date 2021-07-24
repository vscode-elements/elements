const STYLE_TAG_ID = '__vscode-webview-elements_custom-properties__';

let ob: MutationObserver;

export const isRgba = (colorStr: string): boolean =>
  /rgba\([0-9, .]+\)/g.test(colorStr);

export const addAlpha = (hexColor: string, alpha: number): string => {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const mutationObserverCallback: MutationCallback = () => {
  injectInlineStyles(getStyleContent());
};

const injectInlineStyles = (content: string) => {
  const styleTag = document.getElementById(STYLE_TAG_ID);

  if (!styleTag) {
    const style = document.createElement('style');
    style.setAttribute('id', STYLE_TAG_ID);
    style.innerHTML = content;
    document.querySelector('head')?.appendChild(style);
  } else {
    styleTag.innerHTML = content;
  }
};

const getStyleContent = () => {
  const fgColor = document.documentElement.style.getPropertyValue(
    '--vscode-foreground'
  );
  let color = '';

  if (!fgColor) {
    color = 'rgba(0, 0, 0, 0.9)';
  } else if (isRgba(fgColor)) {
    color = fgColor;
  } else {
    color = addAlpha(fgColor.trim(), 0.9);
  }

  return `:root{--vsc-foreground-translucent: ${color};}`;
};

/**
 * Define a translucent version of the foreground color as a global css variable
 */
export function applyForegroundRGBA(): void {
  if (!ob) {
    ob = new MutationObserver(mutationObserverCallback);
    ob.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });
  }

  injectInlineStyles(getStyleContent());
}
