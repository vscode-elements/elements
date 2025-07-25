import {expect} from '@open-wc/testing';
import {VscodeTreeItem} from './index.js';

describe('vscode-tree', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-tree-item');
    expect(el).to.instanceOf(VscodeTreeItem);
  });
});
