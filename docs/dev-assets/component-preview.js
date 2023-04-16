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
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
      display: block;
      margin: 32px 0;
    }

    :host([fullscreen]) {
      bottom: 0;
      left: 0;
      margin: 0;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 1000;
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

    :host([fullscreen]) .canvas {
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 35px;
    }

    .theme-selector-wrapper {
      position: relative;
    }

    .theme-selector {
      align-items: center;
      background-color: var(--toolbar-background, #fff);
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      width: 100%;
      z-index: 2;
    }

    .theme-selector:after {
      background-color: var(--toolbar-normal, #24292e);
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

    .theme-selector button.theme-button {
      background-color: transparent;
      border: 0;
      border-bottom: 3px solid transparent;
      cursor: pointer;
      color: var(--toolbar-normal, #24292e);
      display: block;
      outline: none;
      overflow: hidden;
      padding: 10px 15px 7px;
    }

    .theme-selector button.theme-button.active {
      border-bottom-color: var(--toolbar-active, #007acc);
      color:  var(--toolbar-active, #007acc);
    }

    .theme-selector button.theme-button span {
      display: block;
      outline-offset: 2px;
      pointer-events: none;
      white-space: nowrap;
    }

    .theme-selector button:focus-visible span {
      outline: 1px solid var(--toolbar-active, #007acc);
    }

    .theme-selector .toggle-fullscreen-button {
      align-items: center;
      background-color: transparent;
      border: 0;
      color: var(--toolbar-normal, #24292e);
      cursor: pointer;
      display: flex;
      justify-content: center;
      margin-left: auto;
      margin-right: 5px;
      padding: 5px;
    }

    .theme-selector .toggle-fullscreen-button .normal {
      display: none;
    }

    :host([fullscreen]) .toggle-fullscreen-button .normal {
      display: block;
    }

    :host([fullscreen]) .toggle-fullscreen-button .full {
      display: none;
    }

    .theme-selector .toggle-fullscreen-button:focus {
      outline: none;
    }

    .theme-selector .toggle-fullscreen-button:focus-visible {
      outline: 1px solid var(--toolbar-active, #007acc);
    }
  </style>
  <div class="theme-selector-wrapper">
    <div id="theme-selector" class="theme-selector">
      <button type="button" value="light" data-theme-kind="light" class="theme-button active"><span>Light</span></button>
      <button type="button" value="light-v2" data-theme-kind="light" class="theme-button"><span>Light V2</span></button>
      <button type="button" value="dark" data-theme-kind="dark" class="theme-button"><span>Dark</span></button>
      <button type="button" value="dark-v2" data-theme-kind="dark" class="theme-button"><span>Dark V2</span></button>
      <button type="button" value="hc-light" data-theme-kind="high-contrast-light" class="theme-button"><span>HC Light</span></button>
      <button type="button" value="hc-dark" data-theme-kind="high-contrast" class="theme-button"><span>HC Dark</span></button>
      <button type="button" value="fallback" data-theme-kind="light" class="theme-button"><span>Unstyled</span></button>
      <button type="button" class="toggle-fullscreen-button" id="toggle-fullscreen" title="toggle fullscreen">
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="full">
          <path d="M3 12h10V4H3v8zm2-6h6v4H5V6zM2 6H1V2.5l.5-.5H5v1H2v3zm13-3.5V6h-1V3h-3V2h3.5l.5.5zM14 10h1v3.5l-.5.5H11v-1h3v-3zM2 13h3v1H1.5l-.5-.5V10h1v3z"/>
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="normal">
          <path d="M3.5 4H1V3h2V1h1v2.5l-.5.5zM13 3V1h-1v2.5l.5.5H15V3h-2zm-1 9.5V15h1v-2h2v-1h-2.5l-.5.5zM1 12v1h2v2h1v-2.5l-.5-.5H1zm11-1.5l-.5.5h-7l-.5-.5v-5l.5-.5h7l.5.5v5zM10 7H6v2h4V7z"/>
        </svg>
      </button>
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
    this._elButtons = this._elThemeSelector.querySelectorAll(
      'button.theme-button'
    );
    this._elToggleFullscreen = this._elThemeSelector.querySelector(
      '.toggle-fullscreen-button'
    );

    instanceCounter++;
    themeSelectorInstances[`instance-${instanceCounter}`] =
      this._elThemeSelector;

    this._onThemeSelectorButtonClickBound =
      this._onThemeSelectorButtonClick.bind(this);
    this._onToggleFullscreenButtonClickBound =
      this._onToggleFullscreenButtonClick.bind(this);

    this._elButtons.forEach((b) => {
      b.addEventListener('click', this._onThemeSelectorButtonClickBound);
    });
    this._elToggleFullscreen.addEventListener(
      'click',
      this._onToggleFullscreenButtonClickBound
    );

    this._applyTheme('light', 'light');
  }

  _onThemeSelectorButtonClick(ev) {
    const bt = ev.target;
    const value = bt.value;
    const kind = bt.dataset.themeKind;

    this._runOperationOnEachThemeSelector('setValue', value);
    this._runOperationOnEachThemeSelector('disable');

    this._applyTheme(value, kind).then(() => {
      this._runOperationOnEachThemeSelector('enable');
    });
  }

  _onToggleFullscreenButtonClick() {
    if (!this.hasAttribute('fullscreen')) {
      this.setAttribute('fullscreen', '');
    } else {
      this.removeAttribute('fullscreen');
    }
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

  async _applyTheme(themeName, kind) {
    document.body.classList.remove(
      'vscode-light',
      'vscode-dark',
      'vscode-high-contrast',
      'vscode-high-contrast-light'
    );
    document.body.classList.add(`vscode-${kind}`);
    document.body.dataset.vscodeThemeKind = `vscode-${kind}`;

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
