import '../vscode-tabs/vscode-tabs.js';
import '../vscode-tab-header/vscode-tab-header.js';
import '../vscode-tab-panel/vscode-tab-panel.js';
import {VscodeTabs} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-tabs', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-tabs');
    expect(el).to.instanceOf(VscodeTabs);
  });

  it('is accessible', async () => {
    const el = await fixture(html`
      <vscode-tabs>
        <vscode-tab-header>Tab header 1</vscode-tab-header>
        <vscode-tab-panel>Tab panel 1</vscode-tab-panel>
        <vscode-tab-header>Tab header 2</vscode-tab-header>
        <vscode-tab-panel>Tab panel 2</vscode-tab-panel>
      </vscode-tabs>
    `);

    await expect(el).to.be.accessible();
  });
});
