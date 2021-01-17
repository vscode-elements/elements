import {VscodeInputbox} from '../vscode-inputbox';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-inputbox', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-inputbox');
    expect(el).to.instanceOf(VscodeInputbox);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<vscode-inputbox></vscode-inputbox>`) as VscodeInputbox;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, World!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );

    expect(el).shadowDom.to.equalSnapshot();
  });

  it('renders with a set name', async () => {
    const el = await fixture(html`<vscode-inputbox name="Test"></vscode-inputbox>`) as VscodeInputbox;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, Test!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );
  });

  it('handles a click', async () => {
    const el = await fixture(html`<vscode-inputbox></vscode-inputbox>`) as VscodeInputbox;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, World!</h1>
        <button part="button">Click Count: 1</button>
        <slot></slot>
      `
    );
  });
});
