import {VscCheckboxGroup} from './index.js';
import {expect} from '@open-wc/testing';
import '../option/index.js';

describe('vsc-checkbox-group', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-checkbox-group');
    expect(el).to.instanceOf(VscCheckboxGroup);
  });
});
