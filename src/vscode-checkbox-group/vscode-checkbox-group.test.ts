import {VscodeCheckboxGroup} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';
import '../vscode-option/index.js';

describe('vscode-checkbox-group', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-checkbox-group');
    expect(el).to.instanceOf(VscodeCheckboxGroup);
  });

  it('is accessible', async () => {
    const el = await fixture(
      html`<vscode-checkbox-group></vscode-checkbox-group>`
    );

    await expect(el).to.be.accessible();
  });
});
