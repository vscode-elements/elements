import {SplitLayout} from '../vscode-split-layout';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-split-layout', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-split-layout');
    expect(el).to.instanceOf(SplitLayout);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<vscode-split-layout></vscode-split-layout>`) as SplitLayout;
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
    const el = await fixture(html`<vscode-split-layout name="Test"></vscode-split-layout>`) as SplitLayout;
    expect(el).shadowDom.to.equal(
      `
        <h1>Hello, Test!</h1>
        <button part="button">Click Count: 0</button>
        <slot></slot>
      `
    );
  });

  it('handles a click', async () => {
    const el = await fixture(html`<vscode-split-layout></vscode-split-layout>`) as SplitLayout;
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
