import {VscTabPanel} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-tab-panel', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-tab-panel');
    expect(el).to.instanceOf(VscTabPanel);
  });
});
