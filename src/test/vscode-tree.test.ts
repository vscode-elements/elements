import {VscodeTree} from '../vscode-tree';
import {expect} from '@open-wc/testing';

describe('vscode-tree', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-tree');
    expect(el).to.instanceOf(VscodeTree);
  });
});
