import {VscodeTextfield} from '../vscode-textfield/index.js';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-textfield', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-textfield');
    expect(el).to.instanceOf(VscodeTextfield);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<vscode-textfield></vscode-textfield>`) as VscodeTextfield;
    expect(el).shadowDom.to.equal(
      `
      <slot name="content-before"></slot>
      <input aria-label=""  id="input" type="text">
      <slot name="content-after"></slot>
      `
    );

    expect(el).shadowDom.to.equalSnapshot();
  });
});
