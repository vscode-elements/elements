import {VscodeTabPanel} from '../vscode-tab-panel';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-tab-panel', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-tab-panel');
    expect(el).to.instanceOf(VscodeTabPanel);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<vscode-tab-panel></vscode-tab-panel>`) as VscodeTabPanel;
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
    const el = await fixture(html`<vscode-tab-panel name="Test"></vscode-tab-panel>`) as VscodeTabPanel;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, Test!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );
  });

  it('handles a click', async () => {
    const el = await fixture(html`<vscode-tab-panel></vscode-tab-panel>`) as VscodeTabPanel;
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
