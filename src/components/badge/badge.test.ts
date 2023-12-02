import {VscBadge} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-badge', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-badge');
    expect(el).to.instanceOf(VscBadge);
  });
});
