import {resetMouse, sendMouse} from '@web/test-runner-commands';
import {VscodeSplitLayout} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';
import {parseValue} from './vscode-split-layout.js';

describe('vscode-split-layout', () => {
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

    it('should set vertical handle size');
    it('should set horizontal handle size');
  });

  describe('user interactions', () => {
    it('should panes resize in vertical mode', async () => {
      const el = await fixture<VscodeSplitLayout>(
        html`<vscode-split-layout
          style="width: 500px; height: 500px;"
          initial-handle-position="50%"
          handle-position="50%"
        ></vscode-split-layout>`
      );

      const handle = el.shadowRoot?.querySelector('.handle') as HTMLDivElement;

      expect(handle.style.left).to.eq('50%');

      await resetMouse();
      await sendMouse({type: 'move', position: [252, 10]});
      await sendMouse({type: 'down'});
      await sendMouse({type: 'move', position: [280, 10]});
      await sendMouse({type: 'up'});

      expect(handle.style.left).to.eq('');
    });

    it('should panes resize in horizontal mode');
  });
});
