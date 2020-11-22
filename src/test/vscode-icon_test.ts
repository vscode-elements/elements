import {VscodeIcon} from '../vscode-icon';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-icon', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-icon');
    expect(el).to.instanceOf(VscodeIcon);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<vscode-icon></vscode-icon>`) as VscodeIcon;
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
    const el = await fixture(html`<vscode-icon name="Test"></vscode-icon>`) as VscodeIcon;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, Test!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );
  });

  it('handles a click', async () => {
    const el = await fixture(html`<vscode-icon></vscode-icon>`) as VscodeIcon;
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
