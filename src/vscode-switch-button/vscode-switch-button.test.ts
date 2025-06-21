import {VscodeSwitchButton} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-switch-button', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-switch-button');
    expect(el).to.instanceOf(VscodeSwitchButton);
  });

  it('is accessible', async () => {
    const el = await fixture(html`<vscode-label>42</vscode-label>`);

    await expect(el).to.be.accessible();
  });
});
