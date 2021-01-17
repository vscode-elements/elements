import {VscodeFormControl} from '../vscode-form-control';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-form-control', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-form-control');
    expect(el).to.instanceOf(VscodeFormControl);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<vscode-form-control></vscode-form-control>`) as VscodeFormControl;
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
    const el = await fixture(html`<vscode-form-control name="Test"></vscode-form-control>`) as VscodeFormControl;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, Test!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );
  });

  it('handles a click', async () => {
    const el = await fixture(html`<vscode-form-control></vscode-form-control>`) as VscodeFormControl;
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
