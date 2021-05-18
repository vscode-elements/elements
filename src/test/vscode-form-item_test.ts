import {VscodeFormItem} from '../vscode-form-item';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-form-item', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-form-item');
    expect(el).to.instanceOf(VscodeFormItem);
  });

  it('renders with default values', async () => {
    const el = (await fixture(
      html`<vscode-form-item></vscode-form-item>`
    )) as VscodeFormItem;
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
    const el = (await fixture(
      html`<vscode-form-item name="Test"></vscode-form-item>`
    )) as VscodeFormItem;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, Test!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );
  });

  it('handles a click', async () => {
    const el = (await fixture(
      html`<vscode-form-item></vscode-form-item>`
    )) as VscodeFormItem;
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
