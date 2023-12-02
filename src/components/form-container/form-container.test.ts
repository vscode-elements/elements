import {VscFormContainer} from './index.js';
import {expect} from '@open-wc/testing';

describe('vsc-form-container', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-form-container');
    expect(el).to.instanceOf(VscFormContainer);
  });
});
