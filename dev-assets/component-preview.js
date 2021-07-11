/* eslint-disable no-undef */
let directoryUrl;
let instanceCounter = 0;
const themeSelectorInstances = {};
const themes = {};

function getDirectoryUrl() {
  if (directoryUrl) {
    return directoryUrl;
  }

  const urlParts = import.meta.url.split('/');
  urlParts.pop();
  return urlParts.join('/');
}

async function fetchTheme(themeName) {
  const res = await fetch(`${getDirectoryUrl()}/${themeName}.txt`);
  const theme = await res.text();

  return theme;
}

directoryUrl = getDirectoryUrl();

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

    .theme-selector-wrapper {
      margin-bottom: 20px;
    }

    .theme-selector {
      background-color: var(--vscode-editor-background);
      border: 1px solid var(--vscode-foreground);
      border-radius: 0;
      color: var(--vscode-foreground);
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
    }

    .theme-selector:focus {
      outline: 1px solid var(--vscode-foreground);
    }
  </style>
  <div class="theme-selector-wrapper">
    <select id="theme-selector" class="theme-selector">
      <option value="light">Light+ (default light)</option>
      <option value="dark">Dark+ (default dark)</option>
      <option value="high-contrast">High Contrast</option>
      <option value="github-light">Github Light</option>
      <option value="one-dark-pro">One Dark Pro</option>
    </select>
  </div>
  <slot></slot>
`;

class ComponentPreview extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this._elThemeSelector = shadowRoot.querySelector('.theme-selector');
    instanceCounter++;
    themeSelectorInstances[
      `instance-${instanceCounter}`
    ] = this._elThemeSelector;
    this._onThemeSelectorChangeBound = this._onThemeSelectorChange.bind(this);
    this._elThemeSelector.addEventListener(
      'change',
      this._onThemeSelectorChangeBound
    );

    this._applyTheme('light');
  }

  _onThemeSelectorChange() {
    this._runOperationOnEachThemeSelector(
      'setValue',
      this._elThemeSelector.value
    );
    this._runOperationOnEachThemeSelector('disable');

    this._applyTheme(this._elThemeSelector.value).then(() => {
      this._runOperationOnEachThemeSelector('enable');
    });
  }

  _runOperationOnEachThemeSelector(command, ...args) {
    const instanceKeys = Object.keys(themeSelectorInstances);

    instanceKeys.forEach((k) => {
      switch (command) {
        case 'enable':
          themeSelectorInstances[k].disabled = false;
          break;
        case 'disable':
          themeSelectorInstances[k].disabled = true;
          break;
        case 'setValue':
          themeSelectorInstances[k].value = args[0];
          break;
        default:
      }
    });
  }

  async _applyTheme(themeName) {
    themes[themeName] = themes[themeName] || {};

    if (themes[themeName].data) {
      document.documentElement.style = themes[themeName].data;
      return;
    }

    if (!themes[themeName].isFetching) {
      themes[themeName].isFetching = true;

      const theme = await fetchTheme(themeName);

      themes[themeName].isFetching = false;
      themes[themeName].data = theme;
      document.documentElement.style = themes[themeName].data;
    }
  }
}

customElements.define('component-preview', ComponentPreview);
