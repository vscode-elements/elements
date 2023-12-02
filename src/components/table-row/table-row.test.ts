import {VscTableRow} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-table-row', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-table-row');
    expect(el).to.instanceOf(VscTableRow);
  });
});
