const tmpl = document.createElement('template');

tmpl.innerHTML = `
  <style>
    :host {
      background-color: var(--vscode-editor-background);
      display: block;
      margin: 20px 0;
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
      <button value="vscode-light" type="button">Light</button>
    </div>
    <div class="theme-switcher-option dark">
      <button value="vscode-dark" type="button">Dark</button>
    </div>
    <div class="theme-switcher-option hc">
      <button value="vscode-high-contrast" type="button">High contrast</button>
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
        document.body.classList.add(event.target.value);
      });
    });
  }
}

customElements.define('component-preview', ComponentPreview);
