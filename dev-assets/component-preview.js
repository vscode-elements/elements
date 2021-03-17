/* eslint-disable no-undef */
const tmpl = document.createElement('template');

tmpl.innerHTML = `
  <style>
    :host {
      all: initial;
      background-color: var(--vscode-editor-background);
      color: var(--vscode-foreground);
      display: block;
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      font-weight: var(--vscode-font-weight);
      padding: 20px;
    }

    .theme-switcher {
      display: flex;
      margin: -3px 0 20px;
    }

    .theme-switcher-option {
      align-items: center;
      display: flex;
      margin-right: 20px;
    }

    .theme-switcher-option button {
      background-color: transparent;
      border: 0;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      color: var(--vscode-editor-foreground);
      outline: none;
      padding: 5px 0;
    }

    .theme-switcher-option button:focus-visible span {
      display: block;
      outline: 1px solid var(--vscode-focusBorder);
      outline-offset: 2px;
    }

    .theme-switcher-option.light button {
      border-bottom-color: var(--component-preview-light-active-color);
    }

    .theme-switcher-option.dark button {
      border-bottom-color: var(--component-preview-dark-active-color);
    }

    .theme-switcher-option.hc button {
      border-bottom-color: var(--component-preview-hc-active-color);
    }
  </style>
  <div class="theme-switcher">
    <div class="theme-switcher-option light">
      <button value="vscode-light" type="button"><span>Light</span></button>
    </div>
    <div class="theme-switcher-option dark">
      <button value="vscode-dark" type="button"><span>Dark</span></button>
    </div>
    <div class="theme-switcher-option hc">
      <button value="vscode-high-contrast" type="button"><span>High contrast</span></button>
    </div>
  </div>
  <slot></slot>
`;

class ComponentPreview extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    const buttons = shadowRoot.querySelectorAll(
      '.theme-switcher-option button'
    );

    Array.from(buttons).forEach(element => {
      element.addEventListener('click', event => {
        document.body.classList.remove(
          'vscode-light',
          'vscode-dark',
          'vscode-high-contrast'
        );

        const button = event.composedPath().find((el) => el.matches('button'));

        document.body.classList.add(button.value);
      });
    });
  }
}

customElements.define('component-preview', ComponentPreview);
