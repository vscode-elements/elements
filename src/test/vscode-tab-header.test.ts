import {VscodeTabHeader} from '../vscode-tab-header';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-tab-header', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-tab-header');
    expect(el).to.instanceOf(VscodeTabHeader);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<vscode-tab-header></vscode-tab-header>`) as VscodeTabHeader;
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
    const el = await fixture(html`<vscode-tab-header name="Test"></vscode-tab-header>`) as VscodeTabHeader;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, Test!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );
  });

  it('handles a click', async () => {
    const el = await fixture(html`<vscode-tab-header></vscode-tab-header>`) as VscodeTabHeader;
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
