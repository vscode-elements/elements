import {VscContextMenu} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-context-menu', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-context-menu');
    expect(el).to.instanceOf(VscContextMenu);
  });
});
