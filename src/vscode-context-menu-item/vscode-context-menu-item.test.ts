import {VscodeContextMenuItem} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-context-menu-item', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-context-menu-item');
    expect(el).to.instanceOf(VscodeContextMenuItem);
  });

  it('is accessible', async () => {
    const el = await fixture<VscodeContextMenuItem>(
      html`<vscode-context-menu-item
        label="Test label"
        keybinding="Ctrl+A"
      ></vscode-context-menu-item>`
    );

    await expect(el).to.be.accessible();
  });
});
