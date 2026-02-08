import {LitElement} from 'lit';

const VERSION = '2.5.0';
const CONFIG_KEY = '__vscodeElements_disableRegistryWarning__';

const warn = (message: string, componentInstance?: VscElement) => {
  const prefix = '[VSCode Elements] ';

  if (componentInstance) {
    // eslint-disable-next-line no-console
    console.warn(`${prefix}${message}\n%o`, componentInstance);
  } else {
    // eslint-disable-next-line no-console
    console.warn(`${prefix}${message}`);
  }
};

export class VscElement extends LitElement {
  /** VSCode Elements version */
  get version(): string {
    return VERSION;
  }

  warn(message: string) {
    warn(message, this);
  }
}

type CustomElementClass = Omit<typeof HTMLElement, 'new'>;

export type Constructor<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
};

/**
 * Own implementation of Lit's customElement decorator.
 */
export const customElement = (tagName: string) => {
  return (classOrTarget: CustomElementClass) => {
    const customElementClass = customElements.get(tagName);

    if (!customElementClass) {
      customElements.define(tagName, classOrTarget as CustomElementConstructor);
      return;
    }

    if (CONFIG_KEY in window) {
      return;
    }

    const el = document.createElement(tagName);
    const anotherVersion = (el as VscElement)?.version;
    let message = '';

    if (!anotherVersion) {
      message +=
        'is already registered by an unknown custom element handler class.';
    } else if (anotherVersion !== VERSION) {
      message +=
        'is already registered by a different version of VSCode Elements. ';
      message += `This version is "${VERSION}", while the other one is "${anotherVersion}".`;
    } else {
      message += `is already registered by the same version of VSCode Elements (${VERSION}).`;
    }

    warn(
      `The custom element "${tagName}" ${message}\nTo suppress this warning, set window.${CONFIG_KEY} to true`
    );
  };
};
