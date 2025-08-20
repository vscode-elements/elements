import {expect, fixture, html} from '@open-wc/testing';
import './vscode-breadcrumbs.js';
import '../vscode-breadcrumb-item/vscode-breadcrumb-item.js';
import {VscodeBreadcrumbs} from './vscode-breadcrumbs.js';

describe('vscode-breadcrumbs', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-breadcrumbs');
    expect(el).to.be.instanceOf(VscodeBreadcrumbs);
  });

  it('focuses and selects items on click', async () => {
    const el = (await fixture(html`
      <vscode-breadcrumbs>
        <vscode-breadcrumb-item>Root</vscode-breadcrumb-item>
        <vscode-breadcrumb-item>src</vscode-breadcrumb-item>
        <vscode-breadcrumb-item>index.ts</vscode-breadcrumb-item>
      </vscode-breadcrumbs>
    `)) as VscodeBreadcrumbs;

    const items = el.querySelectorAll('vscode-breadcrumb-item');

    const selectPromise = new Promise<CustomEvent>((resolve) => {
      const handler = (e: Event) => {
        el.removeEventListener('vsc-select', handler);
        resolve(e as CustomEvent);
      };
      el.addEventListener('vsc-select', handler, {once: true});
    });
    (items[1] as HTMLElement).click();
    const ev = await selectPromise;

    expect((items[1] as HTMLElement).classList.contains('selected')).to.be.true;
    expect(ev.detail.index).to.equal(1);
  });

  it('supports keyboard navigation and selection', async () => {
    const el = (await fixture(html`
      <vscode-breadcrumbs>
        <vscode-breadcrumb-item>Root</vscode-breadcrumb-item>
        <vscode-breadcrumb-item>src</vscode-breadcrumb-item>
        <vscode-breadcrumb-item>index.ts</vscode-breadcrumb-item>
      </vscode-breadcrumbs>
    `)) as VscodeBreadcrumbs;

    // Focus the last item by default
    const items = el.querySelectorAll('vscode-breadcrumb-item');
    await el.updateComplete;

    // Move left, then select
    el.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'ArrowLeft', bubbles: true})
    );
    el.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'Enter', bubbles: true})
    );

    await el.updateComplete;

    expect((items[1] as HTMLElement).classList.contains('selected')).to.be.true;
  });

  it('sets aria-current on the last item and aria-label on the host by default', async () => {
    const el = (await fixture(html`
      <vscode-breadcrumbs>
        <vscode-breadcrumb-item>Root</vscode-breadcrumb-item>
        <vscode-breadcrumb-item>src</vscode-breadcrumb-item>
        <vscode-breadcrumb-item>index.ts</vscode-breadcrumb-item>
      </vscode-breadcrumbs>
    `)) as VscodeBreadcrumbs;

    const items = el.querySelectorAll('vscode-breadcrumb-item');
    await el.updateComplete;

    // Host should have an aria-label
    expect(el.getAttribute('aria-label')).to.equal('Breadcrumb');

    // Last item should have aria-current="page"
    expect((items[2] as HTMLElement).getAttribute('aria-current')).to.equal('page');
    // Other items should not have aria-current
    expect((items[0] as HTMLElement).hasAttribute('aria-current')).to.be.false;
  });

  it('does not override an existing aria-label on the host', async () => {
    const el = (await fixture(html`
      <vscode-breadcrumbs aria-label="Custom label">
        <vscode-breadcrumb-item>Root</vscode-breadcrumb-item>
        <vscode-breadcrumb-item>src</vscode-breadcrumb-item>
      </vscode-breadcrumbs>
    `)) as VscodeBreadcrumbs;

    await el.updateComplete;
    expect(el.getAttribute('aria-label')).to.equal('Custom label');
  });
});
