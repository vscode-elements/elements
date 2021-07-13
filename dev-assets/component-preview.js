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
      display: block;
      margin: 32px 0;
    }

    .canvas {
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
      position: relative;
    }

    .theme-selector {
      background-color: var(--vscode-editor-background);
      box-sizing: border-box;
      display: flex;
      padding: 2px 20px 0;
      position: relative;
      width: 100%;
      z-index: 2;
    }

    .theme-selector:after {
      background-color: var(--vscode-foreground);
      bottom: 0;
      content: '';
      display: block;
      height: 1px;
      left: 0;
      opacity: 0.2;
      pointer-events: none;
      position: absolute;
      width: 100%;
    }

    .theme-selector button {
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      color: var(--vscode-foreground);
      display: block;
      margin-right: 20px;
      outline: none;
      padding: 5px 0;
    }

    .theme-selector button.active {
      border-bottom-color: var(--vscode-foreground);
    }

    .theme-selector button span {
      display: block;
      outline-offset: 2px;
      pointer-events: none;
    }

    .theme-selector button:focus-visible span {
      outline: 1px solid var(--vscode-focusBorder);
    }
  </style>
  <div class="theme-selector-wrapper">
    <div id="theme-selector" class="theme-selector">
      <button type="button" value="light" class="active"><span>Light</span></button>
      <button type="button" value="dark"><span>Dark</span></button>
      <button type="button" value="high-contrast"><span>High Contrast</span></button>
      <button type="button" value="github-light"><span>GitHub Light</span></button>
      <button type="button" value="one-dark-pro"><span>One Dark Pro</span></button>
    </div>
  </div>
  <div class="canvas">
    <slot></slot>
  </div>
`;

class ComponentPreview extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this._elThemeSelector = shadowRoot.querySelector('.theme-selector');
    this._elButtons = this._elThemeSelector.querySelectorAll('button');

    instanceCounter++;
    themeSelectorInstances[
      `instance-${instanceCounter}`
    ] = this._elThemeSelector;

    this._onThemeSelectorButtonClickBound = this._onThemeSelectorButtonClick.bind(
      this
    );

    this._elButtons.forEach((b) => {
      b.addEventListener('click', this._onThemeSelectorButtonClickBound);
    });

    this._applyTheme('light');
  }

  _onThemeSelectorButtonClick(ev) {
    const value = ev.target.value;

    this._runOperationOnEachThemeSelector('setValue', value);
    this._runOperationOnEachThemeSelector('disable');

    this._applyTheme(value).then(() => {
      this._runOperationOnEachThemeSelector('enable');
    });
  }

  _runOperationOnEachThemeSelector(command, ...args) {
    const instanceKeys = Object.keys(themeSelectorInstances);

    instanceKeys.forEach((k) => {
      switch (command) {
        case 'enable':
          themeSelectorInstances[k].querySelectorAll('button').forEach((b) => {
            b.disabled = false;
          });
          break;
        case 'disable':
          themeSelectorInstances[k].querySelectorAll('button').forEach((b) => {
            b.disabled = true;
          });
          break;
        case 'setValue':
          themeSelectorInstances[k].querySelectorAll('button').forEach((b) => {
            b.classList.toggle('active', b.value === args[0]);
          });
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
