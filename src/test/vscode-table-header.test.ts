import {VscodeTableHeader} from '../vscode-table-header/index.js';
import {expect} from '@open-wc/testing';

describe('vscode-table-header', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-table-header');
    expect(el).to.instanceOf(VscodeTableHeader);
  });
});
