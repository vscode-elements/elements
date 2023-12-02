import {VscTableCell} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-table-cell', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-table-cell');
    expect(el).to.instanceOf(VscTableCell);
  });
});
