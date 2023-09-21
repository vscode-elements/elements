import {VscodeScrollable} from '../vscode-scrollable/index.js';
import {expect} from '@open-wc/testing';

describe('vscode-scrollable', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-scrollable');
    expect(el).to.instanceOf(VscodeScrollable);
  });
});
