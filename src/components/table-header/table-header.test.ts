import {VscTableHeader} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-table-header', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-table-header');
    expect(el).to.instanceOf(VscTableHeader);
  });
});
