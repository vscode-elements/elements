import {VscTableBody} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-table-body', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-table-body');
    expect(el).to.instanceOf(VscTableBody);
  });
});
