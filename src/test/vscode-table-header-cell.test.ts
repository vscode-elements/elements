import {VscodeTableHeaderCell} from '../vscode-table-header-cell/index.js';
import {expect} from '@open-wc/testing';

describe('vscode-table-header-cell', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-table-header-cell');
    expect(el).to.instanceOf(VscodeTableHeaderCell);
  });
});
