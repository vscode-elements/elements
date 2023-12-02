import {VscLabel} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-label', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-label');
    expect(el).to.instanceOf(VscLabel);
  });
});
