import {VscTableHeaderCell} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-table-header-cell', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-table-header-cell');
    expect(el).to.instanceOf(VscTableHeaderCell);
  });
});
