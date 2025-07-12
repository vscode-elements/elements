import {expect} from '@open-wc/testing';
import {VscodeListItem} from './index.js';

describe('vscode-list', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-list-item');
    expect(el).to.instanceOf(VscodeListItem);
  });
});
