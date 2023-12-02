import {VscContextMenuItem} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-context-menu-item', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-context-menu-item');
    expect(el).to.instanceOf(VscContextMenuItem);
  });
});
