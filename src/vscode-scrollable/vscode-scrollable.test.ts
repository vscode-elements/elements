import {resetMouse} from '@web/test-runner-commands';
import {dragElement} from '../includes/test-helpers.js';
import {VscodeScrollable} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';
import sinon from 'sinon';

describe('vscode-scrollable', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-scrollable');
    expect(el).to.instanceOf(VscodeScrollable);
  });

  it('initializes scrollbar', async () => {
    const el = await fixture<VscodeScrollable>(
      html`<vscode-scrollable style="width: 100px; height: 100px;"
        ><div style="width: 100px; height: 200px;"></div
      ></vscode-scrollable>`
    );

    const thumb =
      el.shadowRoot!.querySelector<HTMLDivElement>('.scrollbar-thumb');

    expect(thumb?.offsetHeight).to.eq(50);
    expect(thumb?.offsetTop).to.eq(0);
    expect(el.scrollPos).to.eq(0);
  });

  it('drags thumb', async () => {
    const el = await fixture<VscodeScrollable>(
      html`<vscode-scrollable style="width: 100px; height: 100px;"
        ><div style="width: 100px; height: 200px;"></div
      ></vscode-scrollable>`
    );
    const scrollEventSpy = sinon.spy();
    el.addEventListener('vsc-scrollable-scroll', scrollEventSpy);

    const thumb = el.shadowRoot!.querySelector<HTMLDivElement>(
      '.scrollbar-thumb'
    ) as HTMLDivElement;

    await dragElement(thumb, 0, 25);
    await resetMouse();

    expect(el.scrollPos).to.eq(50);
    expect(scrollEventSpy.called).to.be.true;
  });

  it('scrolls content', async () => {
    const el = await fixture<VscodeScrollable>(
      html`<vscode-scrollable style="width: 100px; height: 100px;"
        ><div style="width: 100px; height: 200px;"></div
      ></vscode-scrollable>`
    );
    const scrollEventSpy = sinon.spy();
    el.addEventListener('vsc-scrollable-scroll', scrollEventSpy);

    const wheelEvent = new WheelEvent('wheel', {deltaY: 55});
    el.dispatchEvent(wheelEvent);
    await el.updateComplete;

    expect(el.scrollPos).to.eq(55);
    expect(scrollEventSpy.called).to.be.true;
  });
});
