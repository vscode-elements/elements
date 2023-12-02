import {VscodeContextMenu} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-context-menu', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-context-menu');
    expect(el).to.instanceOf(VscodeContextMenu);
  });
});
