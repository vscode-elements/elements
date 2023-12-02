import {VscTabs} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-tabs', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-tabs');
    expect(el).to.instanceOf(VscTabs);
  });
});
