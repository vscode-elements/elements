import {VscodeTableRow} from '../vscode-table-row/index.js';
import {expect} from '@open-wc/testing';

describe('vscode-table-row', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-table-row');
    expect(el).to.instanceOf(VscodeTableRow);
  });
});
