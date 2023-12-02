import {VscOption} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-option', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-option');
    expect(el).to.instanceOf(VscOption);
  });
});
