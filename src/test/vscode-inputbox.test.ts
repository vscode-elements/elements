import {VscodeInputbox} from '../vscode-inputbox/index.js';
import {expect} from '@open-wc/testing';

describe('vscode-inputbox', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-inputbox');
    expect(el).to.instanceOf(VscodeInputbox);
  });
});
