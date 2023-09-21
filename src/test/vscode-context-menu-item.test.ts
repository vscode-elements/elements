import {VscodeContextMenuItem} from '../vscode-context-menu-item/index.js';
import {expect} from '@open-wc/testing';

describe('vscode-context-menu-item', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-context-menu-item');
    expect(el).to.instanceOf(VscodeContextMenuItem);
  });
});
