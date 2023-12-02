import {VscButton} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-button', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-button');
    expect(el).to.instanceOf(VscButton);
  });
});
