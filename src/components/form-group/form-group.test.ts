import {VscFormGroup} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-form-group', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-form-group');
    expect(el).to.instanceOf(VscFormGroup);
  });
});
