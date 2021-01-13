import {VscodeCollapsible} from '../vscode-collapsible';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-collapsible', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-collapsible');
    expect(el).to.instanceOf(VscodeCollapsible);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<vscode-collapsible></vscode-collapsible>`) as VscodeCollapsible;
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
    const el = await fixture(html`<vscode-collapsible name="Test"></vscode-collapsible>`) as VscodeCollapsible;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, Test!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );
  });

  it('handles a click', async () => {
    const el = await fixture(html`<vscode-collapsible></vscode-collapsible>`) as VscodeCollapsible;
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
