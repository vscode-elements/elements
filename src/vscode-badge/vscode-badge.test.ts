import {VscodeBadge} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-badge', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-badge');
    expect(el).to.instanceOf(VscodeBadge);
  });
});
