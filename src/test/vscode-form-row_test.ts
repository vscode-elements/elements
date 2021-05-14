import {VscodeFormRow} from '../vscode-form-row';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-form-row', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-form-row');
    expect(el).to.instanceOf(VscodeFormRow);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<vscode-form-row></vscode-form-row>`) as VscodeFormRow;
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
    const el = await fixture(html`<vscode-form-row name="Test"></vscode-form-row>`) as VscodeFormRow;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, Test!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );
  });

  it('handles a click', async () => {
    const el = await fixture(html`<vscode-form-row></vscode-form-row>`) as VscodeFormRow;
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
