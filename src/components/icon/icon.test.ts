import {VscIcon} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-icon', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-icon');
    expect(el).to.instanceOf(VscIcon);
  });
});
