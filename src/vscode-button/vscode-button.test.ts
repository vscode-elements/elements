import {VscodeButton} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-button', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-button');
    expect(el).to.instanceOf(VscodeButton);
  });
});
