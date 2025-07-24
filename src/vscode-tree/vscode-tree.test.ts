import {expect, fixture, html} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
import '../vscode-tree-item/vscode-tree-item.js';
import {VscodeTreeItem} from '../vscode-tree-item/vscode-tree-item.js';
import {VscodeTree} from './index.js';
import sinon from 'sinon';
import { clickOnElement } from '../includes/test-helpers.js';

describe('vscode-tree', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-tree');
    expect(el).to.instanceOf(VscodeTree);
  });

  it('is accessible', async () => {
    const el = await fixture<VscodeTree>(html`
      <vscode-tree>
        <vscode-tree-item open>
          Item 1
          <vscode-tree-item open>
            Item 1.1
            <vscode-tree-item>Item 1.1.1</vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree-item>
        <vscode-tree-item open>
          Item 2
          <vscode-tree-item open>
            Item 2.1
            <vscode-tree-item>Item 2.1.1</vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree-item>
        <vscode-tree-item open>
          Item 3
          <vscode-tree-item open>
            Item 3.1
            <vscode-tree-item>Item 3.1.1</vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree>
    `);

    expect(el).to.be.accessible;
  });

  it('focuses first item by default', async () => {
    const el = await fixture<VscodeTree>(html`
      <vscode-tree>
        <vscode-tree-item>Item 1</vscode-tree-item>
        <vscode-tree-item>Item 2</vscode-tree-item>
      </vscode-tree>
    `);
    const firstItem =
      el.querySelectorAll<VscodeTreeItem>('vscode-tree-item')[0]!;
    const secondItem =
      el.querySelectorAll<VscodeTreeItem>('vscode-tree-item')[1]!;

    expect(firstItem.tabIndex).to.eq(0);
    expect(firstItem.active).to.be.true;
    expect(secondItem.tabIndex).to.eq(-1);
    expect(secondItem.active).to.be.false;
  });

  it('focuses active item on load', async () => {
    const el = await fixture<VscodeTree>(html`
      <vscode-tree>
        <vscode-tree-item>Item 1</vscode-tree-item>
        <vscode-tree-item active>Item 2</vscode-tree-item>
      </vscode-tree>
    `);
    const firstItem =
      el.querySelectorAll<VscodeTreeItem>('vscode-tree-item')[0]!;
    const secondItem =
      el.querySelectorAll<VscodeTreeItem>('vscode-tree-item')[1]!;

    expect(firstItem.tabIndex).to.eq(-1);
    expect(firstItem.active).to.be.false;
    expect(secondItem.tabIndex).to.eq(0);
    expect(secondItem.active).to.be.true;
  });

  describe('default values', () => {
    it('expandMode', () => {
      const el = document.createElement('vscode-tree');
      expect(el.expandMode).to.eq('singleClick');
    });

    it('hideArrows', () => {
      const el = document.createElement('vscode-tree');
      expect(el.hideArrows).to.be.false;
    });

    it('indent', () => {
      const el = document.createElement('vscode-tree');
      expect(el.indent).to.eq(8);
    });

    it('indentGuides', () => {
      const el = document.createElement('vscode-tree');
      expect(el.indentGuides).to.eq('onHover');
    });
  });

  describe('public methods', () => {
    it('expands all', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree>
          <vscode-tree-item>
            Item 1
            <vscode-tree-item>
              Item 1.1
              <vscode-tree-item>Item 1.1.1</vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item>
            Item 2
            <vscode-tree-item>
              Item 2.1
              <vscode-tree-item>Item 2.1.1</vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item>
            Item 3
            <vscode-tree-item>
              Item 3.1
              <vscode-tree-item>Item 3.1.1</vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree>
      `);

      el.expandAll();
      await el.updateComplete;

      expect(el).lightDom.to.eq(
        `
      <vscode-tree-item aria-expanded="true" branch open>
        Item 1
        <vscode-tree-item aria-expanded="true" branch open>
          Item 1.1
          <vscode-tree-item> Item 1.1.1 </vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree-item>
      <vscode-tree-item aria-expanded="true" branch open>
        Item 2
        <vscode-tree-item aria-expanded="true" branch open>
          Item 2.1
          <vscode-tree-item> Item 2.1.1 </vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree-item>
      <vscode-tree-item aria-expanded="true" branch open>
        Item 3
        <vscode-tree-item aria-expanded="true" branch open>
          Item 3.1
          <vscode-tree-item> Item 3.1.1 </vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree-item>
    `,
        {
          ignoreAttributes: [
            'aria-disabled',
            'data-path',
            'level',
            'role',
            'slot',
            'tabindex',
          ],
        }
      );
    });

    it('closes all', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree>
          <vscode-tree-item open>
            Item 1
            <vscode-tree-item open>
              Item 1.1
              <vscode-tree-item>Item 1.1.1</vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item open>
            Item 2
            <vscode-tree-item open>
              Item 2.1
              <vscode-tree-item>Item 2.1.1</vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item open>
            Item 3
            <vscode-tree-item open>
              Item 3.1
              <vscode-tree-item>Item 3.1.1</vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree>
      `);

      el.collapseAll();
      await el.updateComplete;

      expect(el).lightDom.to.eq(
        `
      <vscode-tree-item aria-expanded="false" branch>
        Item 1
        <vscode-tree-item aria-expanded="false" branch>
          Item 1.1
          <vscode-tree-item> Item 1.1.1 </vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree-item>
      <vscode-tree-item aria-expanded="false" branch>
        Item 2
        <vscode-tree-item aria-expanded="false" branch>
          Item 2.1
          <vscode-tree-item> Item 2.1.1 </vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree-item>
      <vscode-tree-item aria-expanded="false" branch>
        Item 3
        <vscode-tree-item aria-expanded="false" branch>
          Item 3.1
          <vscode-tree-item> Item 3.1.1 </vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree-item>
    `,
        {
          ignoreAttributes: [
            'aria-disabled',
            'data-path',
            'level',
            'role',
            'slot',
            'tabindex',
          ],
        }
      );
    });
  });

  describe('expand mode', () => {
    it('singleClick', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree expand-mode="singleClick">
          <vscode-tree-item>
            Item 1
            <vscode-tree-item>
              Item 1.1
              <vscode-tree-item>Item 1.1.1</vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree>
      `);
      const branch = el.querySelector('vscode-tree-item')!;

      branch.shadowRoot
        ?.querySelector('.wrapper')
        ?.dispatchEvent(new PointerEvent('click'));

      expect(branch.open).to.be.true;
    });

    it('doubleClick', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree expand-mode="doubleClick">
          <vscode-tree-item>
            Item 1
            <vscode-tree-item>
              Item 1.1
              <vscode-tree-item>Item 1.1.1</vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree>
      `);
      const branch = el.querySelector('vscode-tree-item')!;

      branch.shadowRoot
        ?.querySelector('.wrapper')
        ?.dispatchEvent(new PointerEvent('dblclick'));

      expect(branch.open).to.be.true;
    });
  });

  describe('indent guides', () => {
    it('indentGuides onHover', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree indent-guides="onHover">
          <vscode-tree-item open>
            Item 1
            <vscode-tree-item>Item 1.1</vscode-tree-item>
            <vscode-tree-item>Item 1.2</vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree>
      `);
      const branch = el.querySelector('vscode-tree-item')!;
      const childrenWrapper =
        branch.shadowRoot!.querySelector<HTMLDivElement>('.children')!;

      expect(childrenWrapper.classList.contains('guide')).to.be.true;
      expect(childrenWrapper.classList.contains('default-guide')).to.be.true;
    });

    it('indentGuides always', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree indent-guides="always">
          <vscode-tree-item open>
            Item 1
            <vscode-tree-item>Item 1.1</vscode-tree-item>
            <vscode-tree-item>Item 1.2</vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree>
      `);
      const branch = el.querySelector('vscode-tree-item')!;
      const childrenWrapper =
        branch.shadowRoot!.querySelector<HTMLDivElement>('.children')!;

      expect(childrenWrapper.classList.contains('guide')).to.be.true;
      expect(childrenWrapper.classList.contains('default-guide')).to.be.true;
    });

    it('indentGuides none', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree indent-guides="none">
          <vscode-tree-item open>
            Item 1
            <vscode-tree-item>Item 1.1</vscode-tree-item>
            <vscode-tree-item>Item 1.2</vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree>
      `);
      const branch = el.querySelector('vscode-tree-item')!;
      const childrenWrapper =
        branch.shadowRoot!.querySelector<HTMLDivElement>('.children')!;

      expect(childrenWrapper.classList.contains('guide')).to.be.false;
      expect(childrenWrapper.classList.contains('default-guide')).to.be.false;
    });
  });

  describe('hide arrows', () => {
    it('show arrows', async () => {
      const el = await fixture(
        html`<vscode-tree>
          <vscode-tree-item open>
            Item 1
            <vscode-tree-item>Item 1.1</vscode-tree-item>
            <vscode-tree-item>Item 1.2</vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree>`
      );

      const branch = el.querySelector('vscode-tree-item[open]')!;

      expect(branch.shadowRoot?.querySelector('.arrow-container')).to.be.ok;
    });

    it('hide arrows', async () => {
      const el = await fixture(
        html`<vscode-tree hide-arrows>
          <vscode-tree-item open>
            Item 1
            <vscode-tree-item>Item 1.1</vscode-tree-item>
            <vscode-tree-item>Item 1.2</vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree>`
      );

      const branch = el.querySelector('vscode-tree-item[open]')!;

      expect(branch.shadowRoot?.querySelector('.arrow-container')).to.be.null;
    });
  });

  it('focuses next item when arrow down key is pressed', async () => {
    const el = await fixture<VscodeTree>(html`
      <vscode-tree>
        <vscode-tree-item>Item 1</vscode-tree-item>
        <vscode-tree-item>Item 2</vscode-tree-item>
      </vscode-tree>
    `);

    el.querySelector<VscodeTreeItem>('vscode-tree-item')?.focus();
    await sendKeys({press: 'ArrowDown'});
    await el.updateComplete;

    const items = el.querySelectorAll<VscodeTreeItem>('vscode-tree-item')!;

    expect(items[0].tabIndex).to.eq(-1);
    expect(items[0].active).to.be.false;
    expect(items[1].tabIndex).to.eq(0);
    expect(items[1].active).to.be.true;
  });

  it('selects item with Enter key press', async () => {
    const el = await fixture<VscodeTree>(
      html`<vscode-tree hide-arrows>
        <vscode-tree-item>Item 1</vscode-tree-item>
        <vscode-tree-item>Item 2</vscode-tree-item>
      </vscode-tree>`
    );
    const spy = sinon.spy();

    el.addEventListener('vsc-tree-select', spy);

    const firstChild = el.querySelector('vscode-tree-item')!;
    firstChild.active = true;
    firstChild.focus();
    await sendKeys({down: 'Enter'});

    expect(firstChild.selected).to.be.true;
    expect(spy.getCalls()[0].args[0].type).to.eq('vsc-tree-select');
  });

  it('selects item with click on it', async () => {
    const el = await fixture<VscodeTree>(
      html`<vscode-tree hide-arrows>
        <vscode-tree-item>Item 1</vscode-tree-item>
        <vscode-tree-item>Item 2</vscode-tree-item>
      </vscode-tree>`
    );
    const spy = sinon.spy();

    el.addEventListener('vsc-tree-select', spy);

    const firstChild = el.querySelector('vscode-tree-item')!;
    await clickOnElement(firstChild);

    expect(firstChild.selected).to.be.true;
    expect(spy.getCalls()[0].args[0].type).to.eq('vsc-tree-select');
  });

  it('opens and selects branch item with Enter key press');
  it('opens and selects branch item with click on it');

  it('selecting multiple items upwards with the mouse and the Shift key');

  it(
    'expands selection of multiple items upwards with the mouse and the Shift key'
  );

  it('selecting multiple items downwards with the mouse and the Shift key', async () => {
    
  });

  it(
    'expands selection of multiple items downwards with the mouse and the Shift key'
  );
});
