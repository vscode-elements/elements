import {VscTableBody} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-table-body', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-table-body');
    expect(el).to.instanceOf(VscTableBody);
  });
});
