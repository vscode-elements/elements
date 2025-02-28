import {VscodeCollapsible} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-collapsible', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-collapsible');
    expect(el).to.instanceOf(VscodeCollapsible);
  });

  it('is accessible', async () => {
    const el = await fixture(html`
      <vscode-collapsible title="Test title">Test content</vscode-collapsible>
    `);

    await expect(el).to.be.accessible();
  });

  it('title should be visible', async () => {
    const el = await fixture(html`
      <vscode-collapsible title="Test title"></vscode-collapsible>
    `);

    expect(
      el.shadowRoot?.querySelector<HTMLElement>('.title')?.innerText
    ).to.eq('TEST TITLE');
  });

  it('description should be visible', async () => {
    const el = await fixture(html`
      <vscode-collapsible description="Test description"></vscode-collapsible>
    `);

    expect(
      el.shadowRoot?.querySelector<HTMLElement>('.description')?.innerText
    ).to.eq('Test description');
  });

  it('body should be open when open attribute is presented', async () => {
    const el = await fixture(html`
      <vscode-collapsible open></vscode-collapsible>
    `);

    expect(
      el.shadowRoot?.querySelector('.collapsible')?.classList.contains('open')
    ).to.eq(true);
  });

  it('body should be open when header is clicked', async () => {
    const el = await fixture<VscodeCollapsible>(html`
      <vscode-collapsible></vscode-collapsible>
    `);

    el.shadowRoot?.querySelector<HTMLElement>('.collapsible-header')?.click();
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector('.collapsible')?.classList.contains('open')
    ).to.eq(true);
  });

  it('body should be open when header is focused and Enter key pressed', async () => {
    const el = await fixture<VscodeCollapsible>(html`
      <vscode-collapsible></vscode-collapsible>
    `);

    el.shadowRoot
      ?.querySelector<HTMLElement>('.collapsible-header')
      ?.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector('.collapsible')?.classList.contains('open')
    ).to.eq(true);
  });

  it('should dispatch toggle event when it opens on click', async () => {
    const el = await fixture<VscodeCollapsible>(html`
      <vscode-collapsible></vscode-collapsible>
    `);
    let detail;
    el.addEventListener('vsc-collapsible-toggle', (ev) => {
      detail = ev.detail;
    });

    el.shadowRoot?.querySelector<HTMLElement>('.collapsible-header')?.click();
    await el.updateComplete;

    expect(detail).to.deep.equal({open: true});
  });

  it('should dispatch toggle event when it opens on enter key down', async () => {
    const el = await fixture<VscodeCollapsible>(html`
      <vscode-collapsible></vscode-collapsible>
    `);
    let detail;
    el.addEventListener('vsc-collapsible-toggle', (ev) => {
      detail = ev.detail;
    });

    el.shadowRoot
      ?.querySelector<HTMLElement>('.collapsible-header')
      ?.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    await el.updateComplete;

    expect(detail).to.deep.equal({open: true});
  });
});
