import {VscodeBadge} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-badge', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-badge');
    expect(el).to.instanceOf(VscodeBadge);
  });

  it('is accessible', async () => {
    const el = await fixture(html`<vscode-label>42</vscode-label>`);

    await expect(el).to.be.accessible();
  });
});
