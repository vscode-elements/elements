import {VscodeSplitLayout} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-split-layout', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-split-layout');
    expect(el).to.instanceOf(VscodeSplitLayout);
  });
});
