import {VscodeDivider} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-divider', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-divider');
    expect(el).to.instanceOf(VscodeDivider);
  });
});
