import {VscScrollable} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-scrollable', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-scrollable');
    expect(el).to.instanceOf(VscScrollable);
  });
});
