import {VscRadioGroup} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-radio-group', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-radio-group');
    expect(el).to.instanceOf(VscRadioGroup);
  });
});
