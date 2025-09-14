/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {clickOnElement} from '../includes/test-helpers.js';
import type {VscodeContextMenuItem} from '../main.js';
import {VscodeContextMenu} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-context-menu', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-context-menu');
    expect(el).to.instanceOf(VscodeContextMenu);
  });

  it('is accessible', async () => {
    const el = await fixture<VscodeContextMenu>(
      html`<vscode-context-menu show></vscode-context-menu>`
    );
    el.data = [
      {label: 'Menu Item 1', value: 'menuitem1'},
      {label: 'Menu Item 2', value: 'menuitem2'},
    ];
    await el.updateComplete;

    await expect(el).to.be.accessible();
  });

  it('should synchronize visibility state', async () => {
    const el = await fixture<VscodeContextMenu>(
      html`<vscode-context-menu show></vscode-context-menu>`
    );
    el.data = [
      {label: 'Menu Item 1', value: 'menuitem1'},
      {label: 'Menu Item 2', value: 'menuitem2'},
    ];
    await el.updateComplete;

    const items = el.shadowRoot?.querySelectorAll<VscodeContextMenuItem>(
      'vscode-context-menu-item'
    )!;
    await clickOnElement(items[0]);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('vscode-context-menu-item')).to.be.null;
    expect(el.hasAttribute('show')).to.be.false;
  });
});
