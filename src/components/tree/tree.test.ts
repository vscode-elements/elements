import {VscTree} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-tree', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-tree');
    expect(el).to.instanceOf(VscTree);
  });
});
