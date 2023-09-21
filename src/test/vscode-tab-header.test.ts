import {VscodeTabHeader} from '../vscode-tab-header/index.js';
import {expect} from '@open-wc/testing';

describe('vscode-tab-header', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-tab-header');
    expect(el).to.instanceOf(VscodeTabHeader);
  });
});
