import {VscTabHeader} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-tab-header', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-tab-header');
    expect(el).to.instanceOf(VscTabHeader);
  });
});
