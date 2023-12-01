import {VscodeIcon} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-icon', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-icon');
    expect(el).to.instanceOf(VscodeIcon);
  });
});
