import {VscTable} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-table', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-table');
    expect(el).to.instanceOf(VscTable);
  });
});
