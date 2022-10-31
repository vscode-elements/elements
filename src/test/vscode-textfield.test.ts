import {VscodeTextfield} from '../vscode-textfield';
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
        <h1>Hello, World!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );

    expect(el).shadowDom.to.equalSnapshot();
  });
});
