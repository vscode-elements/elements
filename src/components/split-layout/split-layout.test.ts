import {VscSplitLayout} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-split-layout', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-split-layout');
    expect(el).to.instanceOf(VscSplitLayout);
  });
});
