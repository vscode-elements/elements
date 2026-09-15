import {css, CSSResultGroup, unsafeCSS} from 'lit';
import defaultStyles from '../includes/default.styles.js';
import {getDefaultFontStack} from '../includes/helpers.js';

const defaultFontStack = unsafeCSS(getDefaultFontStack());

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: inline-block;
      width: 320px;
    }

    .root {
      align-items: center;
      background-color: var(--vscode-settings-textInputBackground, #313131);
      border-color: var(
        --vscode-settings-textInputBorder,
        var(--vscode-settings-textInputBackground, #313131)
      );
      border-radius: var(--vsc-form-control-border-radius, 4px);
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-settings-textInputForeground, #cccccc);
      display: flex;
      max-width: 100%;
      position: relative;
      width: 100%;
    }

    :host([focused]) .root {
      border-color: var(--vscode-focusBorder, #0078d4);
    }

    :host([invalid]) .root,
    :host(:invalid) .root {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    :host([invalid][focused]) .root,
    :host(:invalid[focused]) .root {
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    ::slotted([slot='content-before']) {
      display: block;
      margin-left: 2px;
    }

    ::slotted([slot='content-after']) {
      display: block;
      margin-right: 2px;
    }

    slot[name='content-before'],
    slot[name='content-after'] {
      align-items: center;
      display: flex;
    }

    input {
      background-color: transparent;
      border: 0;
      box-sizing: border-box;
      color: var(--vscode-settings-textInputForeground, #cccccc);
      display: block;
      font-family: var(--vscode-font-family, ${defaultFontStack});
      font-size: var(
        --vsc-form-control-font-size,
        var(--vscode-font-size, 13px)
      );
      font-weight: var(--vscode-font-weight, normal);
      line-height: 18px;
      outline: none;
      padding-bottom: 3px;
      padding-left: 4px;
      padding-right: 4px;
      padding-top: 3px;
      width: 100%;
    }

    :host([size='small']) {
      --vsc-form-control-font-size: 11px;
    }

    :host([size='large']) {
      --vsc-form-control-font-size: 15px;
    }

    :host([size='small']) input {
      height: 14px;
      line-height: 12px;
      padding-bottom: 0;
      padding-top: 0;
    }

    :host([size='small']) ::slotted(vscode-icon) {
      --vsc-icon-size: 14px;
    }

    :host([size='small']) ::slotted(vscode-icon[action-icon]) {
      --vsc-icon-action-padding: 0;
      --vsc-icon-size: 12px;
    }

    :host([size='large']) input {
      padding-bottom: 5px;
      padding-top: 5px;
    }

    input:is(
      [type='color'],
      [type='date'],
      [type='datetime-local'],
      [type='month'],
      [type='time'],
      [type='week']
    ) {
      height: 24px;
    }

    :host([size='small'])
      input:is(
        [type='color'],
        [type='date'],
        [type='datetime-local'],
        [type='month'],
        [type='time'],
        [type='week']
      ) {
      height: 14px;
    }

    :host([size='large'])
      input:is(
        [type='color'],
        [type='date'],
        [type='datetime-local'],
        [type='month'],
        [type='time'],
        [type='week']
      ) {
      height: 28px;
    }

    input:read-only:not([type='file']) {
      cursor: not-allowed;
    }

    input::placeholder {
      color: var(--vscode-input-placeholderForeground, #989898);
      opacity: 1;
    }

    input[type='file'] {
      padding-left: 2px;
    }

    input[type='file']::file-selector-button {
      background-color: var(--vscode-button-background, #0078d4);
      border: 0;
      border-radius: var(--vsc-form-control-inner-border-radius, 2px);
      color: var(--vscode-button-foreground, #ffffff);
      cursor: pointer;
      font-family: var(--vscode-font-family, ${defaultFontStack});
      font-size: inherit;
      font-weight: var(--vscode-font-weight, normal);
      line-height: inherit;
      padding: 0 14px;
    }

    input[type='file']::file-selector-button:hover {
      background-color: var(--vscode-button-hoverBackground, #026ec1);
    }
  `,
];

export default styles;
