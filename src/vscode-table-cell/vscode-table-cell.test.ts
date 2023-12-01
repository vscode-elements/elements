import {VscodeTableCell} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-table-cell', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-table-cell');
    expect(el).to.instanceOf(VscodeTableCell);
  });
});
