import {VscFormHelper} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-form-helper', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-form-helper');
    expect(el).to.instanceOf(VscFormHelper);
  });
});
