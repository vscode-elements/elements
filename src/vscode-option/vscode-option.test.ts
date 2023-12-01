import {VscodeOption} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-option', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-option');
    expect(el).to.instanceOf(VscodeOption);
  });
});
