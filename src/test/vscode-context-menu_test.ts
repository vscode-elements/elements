import {VscodeContextMenu} from '../vscode-context-menu';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-context-menu', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-context-menu');
    expect(el).to.instanceOf(VscodeContextMenu);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<vscode-context-menu></vscode-context-menu>`) as VscodeContextMenu;
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
    const el = await fixture(html`<vscode-context-menu name="Test"></vscode-context-menu>`) as VscodeContextMenu;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, Test!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );
  });

  it('handles a click', async () => {
    const el = await fixture(html`<vscode-context-menu></vscode-context-menu>`) as VscodeContextMenu;
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
