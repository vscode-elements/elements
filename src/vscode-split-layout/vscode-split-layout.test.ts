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

  it('default values', async () => {
    const el = await fixture<VscodeSplitLayout>(
      html`<vscode-split-layout></vscode-split-layout>`
    );

    expect(el.split).to.eq('vertical');
    expect(el.resetOnDblClick).to.be.false;
    expect(el.handleSize).to.eq(4);
    expect(el.initialHandlePosition).to.eq('50%');
    expect(el.fixedPane).to.eq('none');
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
    it('should initial handle position set correctly when the divider orientation is vertical, and the position is specified in pixels', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;

      expect(handle.offsetLeft).to.eq(98);
      expect(handle.offsetTop).to.eq(0);
    });

    it('should initial handle position set correctly when the divider orientation is vertical, and the position is specified in percent', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="20%"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;

      expect(handle.offsetLeft).to.eq(98);
      expect(handle.offsetTop).to.eq(0);
    });

    it('should initial handle position set correctly when the divider orientation is horizontal, and the position is specified in pixels', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          split="horizontal"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;

      expect(handle.offsetLeft).to.eq(0);
      expect(handle.offsetTop).to.eq(98);
    });

    it('should initial handle position set correctly when the divider orientation is horizontal, and the position is specified in percent', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="20%"
          split="horizontal"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;

      expect(handle.offsetLeft).to.eq(0);
      expect(handle.offsetTop).to.eq(98);
    });

    it('should handle position set correctly when the divider orientation is vertical, and the position is specified in pixels', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          handle-position="100px"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;

      expect(handle.offsetLeft).to.eq(98);
      expect(handle.offsetTop).to.eq(0);
    });

    it('should handle position set correctly when the divider orientation is vertical, and the position is specified in percent', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          handle-position="20%"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;

      expect(handle.offsetLeft).to.eq(98);
      expect(handle.offsetTop).to.eq(0);
    });

    it('should handle position set correctly when the divider orientation is horizontal, and the position is specified in pixels', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          handle-position="100px"
          split="horizontal"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;

      expect(handle.offsetLeft).to.eq(0);
      expect(handle.offsetTop).to.eq(98);
    });

    it('should handle position set correctly when the divider orientation is horizontal, and the position is specified in percent', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          handle-position="20%"
          split="horizontal"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;

      expect(handle.offsetLeft).to.eq(0);
      expect(handle.offsetTop).to.eq(98);
    });

    it('should apply handle-position when both handle-position and initial-handle-position are present', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          handle-position="200px"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;

      expect(handle.offsetLeft).to.eq(198);
      expect(handle.offsetTop).to.eq(0);
    });

    it('should change handle position correctly when the handlePosition property changed', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          handle-position="100px"
        ></vscode-split-layout>`
      );
      const handle = el.shadowRoot?.querySelector<HTMLDivElement>('.handle')!;
      const startPane = el.shadowRoot?.querySelector<HTMLDivElement>('.start')!;
      const endPane = el.shadowRoot?.querySelector<HTMLDivElement>('.end')!;

      el.handlePosition = '200px';
      await el.updateComplete;

      expect(handle.offsetLeft).to.eq(198);
      expect(startPane.offsetWidth).to.eq(200);
      expect(endPane.offsetWidth).to.eq(300);
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

    it('should change divider orientation from vertical to horizontal correctly', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="20%"
        ></vscode-split-layout>`
      );

      const startWidthBefore =
        el.shadowRoot?.querySelector<HTMLDivElement>('.start')!.offsetWidth;
      const endWidthBefore =
        el.shadowRoot?.querySelector<HTMLDivElement>('.end')!.offsetWidth;

      el.split = 'horizontal';
      await el.updateComplete;

      const startHeightAfter =
        el.shadowRoot?.querySelector<HTMLDivElement>('.start')!.offsetHeight;
      const endHeightAfter =
        el.shadowRoot?.querySelector<HTMLDivElement>('.end')!.offsetHeight;

      expect(startWidthBefore).to.eq(100);
      expect(endWidthBefore).to.eq(400);
      expect(startHeightAfter).to.eq(100);
      expect(endHeightAfter).to.eq(400);
    });

    it('should change divider orientation from horizontal to vertical correctly', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="20%"
          split="horizontal"
        ></vscode-split-layout>`
      );

      const startHeightBefore =
        el.shadowRoot?.querySelector<HTMLDivElement>('.start')!.offsetHeight;
      const endHeightBefore =
        el.shadowRoot?.querySelector<HTMLDivElement>('.end')!.offsetHeight;

      el.split = 'vertical';
      await el.updateComplete;

      const startWidthAfter =
        el.shadowRoot?.querySelector<HTMLDivElement>('.start')!.offsetWidth;
      const endWidthAfter =
        el.shadowRoot?.querySelector<HTMLDivElement>('.end')!.offsetWidth;

      expect(startHeightBefore).to.eq(100);
      expect(endHeightBefore).to.eq(400);
      expect(startWidthAfter).to.eq(100);
      expect(endWidthAfter).to.eq(400);
    });

    it('should set start pane fixed in vertical split mode', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          fixed-pane="start"
        ></vscode-split-layout>`
      );

      const startPane = el.shadowRoot?.querySelector<HTMLDivElement>('.start')!;
      const endPane = el.shadowRoot?.querySelector<HTMLDivElement>('.end')!;
      const startPaneSizeBefore = startPane.offsetWidth;
      const endPaneSizeBefore = endPane.offsetWidth;

      el.style.width = '600px';

      expect(startPaneSizeBefore).to.eq(100);
      expect(endPaneSizeBefore).to.eq(400);
      expect(startPane.offsetWidth).to.eq(100);
      expect(endPane.offsetWidth).to.eq(500);
    });

    it('should set end pane fixed in vertical split mode', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          fixed-pane="end"
        ></vscode-split-layout>`
      );

      const startPane = el.shadowRoot?.querySelector<HTMLDivElement>('.start')!;
      const endPane = el.shadowRoot?.querySelector<HTMLDivElement>('.end')!;
      const startPaneSizeBefore = startPane.offsetWidth;
      const endPaneSizeBefore = endPane.offsetWidth;

      el.style.width = '600px';

      expect(startPaneSizeBefore).to.eq(100);
      expect(endPaneSizeBefore).to.eq(400);
      expect(startPane.offsetWidth).to.eq(200);
      expect(endPane.offsetWidth).to.eq(400);
    });

    it('should set start pane fixed in horizontal split mode', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          fixed-pane="start"
          split="horizontal"
        ></vscode-split-layout>`
      );

      const startPane = el.shadowRoot?.querySelector<HTMLDivElement>('.start')!;
      const endPane = el.shadowRoot?.querySelector<HTMLDivElement>('.end')!;
      const startPaneSizeBefore = startPane.offsetHeight;
      const endPaneSizeBefore = endPane.offsetHeight;

      el.style.height = '600px';

      expect(startPaneSizeBefore).to.eq(100);
      expect(endPaneSizeBefore).to.eq(400);
      expect(startPane.offsetHeight).to.eq(100);
      expect(endPane.offsetHeight).to.eq(500);
    });
  });

  describe('interactions', () => {
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

    it('should panes resize in vertical mode when start pane is fixed', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;border: 0;"
          initial-handle-position="100px"
          fixed-pane="start"
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

    it('should panes resize in vertical mode when end pane is fixed', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;border: 0;"
          initial-handle-position="100px"
          fixed-pane="end"
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

    it('should panes resize in horizontal mode when start pane is fixed', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          split="horizontal"
          fixed-pane="start"
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

    it('should panes resize in horizontal mode when end pane is fixed', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          split="horizontal"
          fixed-pane="end"
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

    it('should not reset handle position on double click when "reset-on-dbl-click" is unset', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          split="vertical"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot?.querySelector('.handle') as HTMLDivElement;
      const initialHandlePos = handle.offsetLeft;
      await dragElement(handle, 100);

      const changedHandlePos = handle.offsetLeft;
      handle.dispatchEvent(new MouseEvent('dblclick'));
      await el.updateComplete;

      const revertedHandlePos = handle.offsetLeft;

      expect(initialHandlePos).to.eq(98);
      expect(changedHandlePos).to.eq(198);
      expect(revertedHandlePos).to.eq(198);
    });

    it('should reset handle position to the initial value', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="100px"
          handle-position="200px"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;
      const handlePosBefore = handle.offsetLeft;

      el.resetHandlePosition();
      await el.updateComplete;

      expect(handlePosBefore).to.eq(198);
      expect(handle.offsetLeft).to.eq(98);
    });
  });

  it.only('should not reset handle position when split is set to the same value', async () => {
    const el = await fixture<VscodeSplitLayout>(
      html`<vscode-split-layout
        style="width: 500px; height: 500px;"
        initial-handle-position="100px"
        split="horizontal"
      ></vscode-split-layout>`
    );

    el.handlePosition = "200px";
    await el.updateComplete;

    const handle = el.shadowRoot!.querySelector('.handle') as HTMLDivElement;
    expect(handle.offsetTop).to.eq(198);

    el.setAttribute('split', 'horizontal');
    await el.updateComplete;

    expect(handle.offsetTop).to.eq(198);
  });

  // TODO
  it('should nested instances reset when slotted content is changed');
  it('fixed pane prop changed');
});
