import {VscodeSplitLayout} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';
import {resetMouse} from '@web/test-runner-commands';
import {parseValue} from './vscode-split-layout.js';
import {dragElement} from '../includes/test-helpers.js';
import sinon from 'sinon';

describe('vscode-split-layout', () => {
  afterEach(async () => {
    await resetMouse();
  });

  it('is defined', () => {
    const el = document.createElement('vscode-split-layout');
    expect(el).to.instanceOf(VscodeSplitLayout);
  });

  describe('helper functions', () => {
    it('should parse percentage value correctly', () => {
      expect(parseValue('50%')).to.deep.equal({unit: 'percent', value: 50});
    });

    it('should parse pixel value correctly', () => {
      expect(parseValue('10px')).to.deep.equal({unit: 'pixel', value: 10});
    });

    it('should parse value without unit correctly', () => {
      expect(parseValue('10')).to.deep.equal({unit: 'pixel', value: 10});
    });

    it('should parse non-number value correctly', () => {
      expect(parseValue('asdf')).to.deep.equal({unit: 'pixel', value: 0});
    });

    it('should handle null input value correctly', () => {
      // @ts-expect-error
      expect(parseValue(null)).to.deep.equal({unit: 'pixel', value: 0});
    });
  });

  describe('when an attribute is removed', () => {
    it('should not throw error when "initial-handle-position" attribute is removed', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout></vscode-split-layout>`
      );

      el.removeAttribute('initial-handle-position');
      await el.updateComplete;
    });

    it('should not throw error when "initial-handle-position" attribute is removed then handle is double-clicked', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          reset-on-dbl-click
        ></vscode-split-layout>`
      );

      el.removeAttribute('initial-handle-position');
      await el.updateComplete;

      const handle = el.shadowRoot?.querySelector('.handle');
      handle?.dispatchEvent(new MouseEvent('dblclick'));
      await el.updateComplete;
    });

    it('should not throw error when "handle-size" attribute is removed', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout></vscode-split-layout>`
      );

      el.removeAttribute('handle-size');
      await el.updateComplete;
    });
  });

  describe('when provided parameters', () => {
    it('should adjust the handle vertical', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="50%"
          handle-position="50%"
          handle-size="4"
          split="vertical"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;

      expect(handle.style.left).to.eq('50%');
      expect(handle.style.top).to.eq('0px');
    });

    it('should adjust the handle horizontal', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="50%"
          handle-position="50%"
          handle-size="4"
          split="horizontal"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;

      expect(handle.style.left).to.eq('0px');
      expect(handle.style.top).to.eq('50%');
    });

    it('should set handle size in vertical split mode', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          handle-size="20"
        ></vscode-split-layout>`
      );
      const handle = el.shadowRoot?.querySelector('.handle') as HTMLDivElement;

      expect(handle.offsetWidth).to.eq(20);
      expect(handle.offsetLeft).to.eq(240);
    });

    it('should set handle size in horizontal split mode', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          handle-size="20"
          split="horizontal"
        ></vscode-split-layout>`
      );
      const handle = el.shadowRoot?.querySelector('.handle') as HTMLDivElement;

      expect(handle.offsetHeight).to.eq(20);
      expect(handle.offsetTop).to.eq(240);
    });
  });

  describe('user interactions', () => {
    it('should panes resize in vertical mode', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;border: 0;"
          initial-handle-position="100px"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot?.querySelector('.handle') as HTMLDivElement;
      const paneStart = el.shadowRoot?.querySelector(
        '.start'
      ) as HTMLDivElement;
      const paneEnd = el.shadowRoot?.querySelector('.end') as HTMLDivElement;

      expect(paneStart.offsetWidth, 'start pane width before resizing').to.eq(
        100
      );
      expect(paneEnd.offsetWidth, 'end pane width before resizing').to.eq(400);

      await dragElement(handle, 100);

      expect(paneStart.offsetWidth, 'start pane width after resizing').to.eq(
        200
      );
      expect(paneEnd.offsetWidth, 'end pane width after resizing').to.eq(300);
    });

    it('should panes resize in horizontal mode', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          split="horizontal"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot?.querySelector('.handle') as HTMLDivElement;
      const paneStart = el.shadowRoot?.querySelector(
        '.start'
      ) as HTMLDivElement;
      const paneEnd = el.shadowRoot?.querySelector('.end') as HTMLDivElement;

      expect(paneStart.offsetHeight, 'start pane height before resizing').to.eq(
        100
      );
      expect(paneEnd.offsetHeight, 'end pane height before resizing').to.eq(
        400
      );

      await dragElement(handle, 0, 100);

      expect(paneStart.offsetHeight, 'start pane height after resizing').to.eq(
        200
      );
      expect(paneEnd.offsetHeight, 'end pane height after resizing').to.eq(300);
    });

    it('should dispatch "vsc-split-layout-change" event when handle position is changed', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          split="vertical"
        ></vscode-split-layout>`
      );
      const spy = sinon.spy();
      el.addEventListener('vsc-split-layout-change', spy);

      const handle = el.shadowRoot?.querySelector('.handle') as HTMLDivElement;
      await dragElement(handle, 100);

      expect(
        spy.calledWithMatch({
          type: 'vsc-split-layout-change',
          detail: {position: 200, positionInPercentage: 40},
        })
      ).to.be.true;
    });

    it('should reset handle position on double click when "reset-on-dbl-click" is set', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          reset-on-dbl-click
          split="vertical"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot?.querySelector('.handle') as HTMLDivElement;
      const initialHandlePos = handle.style.left;
      await dragElement(handle, 100);

      const changedHandlePos = handle.style.left;
      handle.dispatchEvent(new MouseEvent('dblclick'));
      await el.updateComplete;

      const revertedHandlePos = handle.style.left;

      expect(initialHandlePos).to.eq('20%');
      expect(changedHandlePos).to.eq('40%');
      expect(revertedHandlePos).to.eq('20%');
    });

    it(
      'should not reset handle position on double click when "reset-on-dbl-click" is unset'
    );
  });

  // TODO
  it('should change divider orientation from vertical to horizontal');
  it('should change divider orientation from horizontal to vertical');
  it('should set fixed start panel');
  it('should set fixed end panel');
  it(
    'should set handle position programmatically when divider orientation is vertical'
  );
  it(
    'should set handle position programmatically when divider orientation is horizontal'
  );
  it('should reset to the default position programmatically');
});
