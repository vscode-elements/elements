import {VscCollapsible} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-collapsible', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-collapsible');
    expect(el).to.instanceOf(VscCollapsible);
  });
});
