import {expect, fixture, html} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
import sinon from 'sinon';
import {$$, clickOnElement} from '../includes/test-helpers.js';
import {$} from '../includes/test-helpers.js';

import '../vscode-tree-item/vscode-tree-item.js';
import {VscodeTreeItem} from '../vscode-tree-item/vscode-tree-item.js';
import {VscodeTree} from './index.js';

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

  it('focuses previous item when arrow up key is pressed', async () => {
    const el = await fixture<VscodeTree>(html`
      <vscode-tree>
        <vscode-tree-item>Item 1</vscode-tree-item>
        <vscode-tree-item>Item 2</vscode-tree-item>
      </vscode-tree>
    `);

    const items = $$('vscode-tree-item');

    items[1].focus();
    await sendKeys({press: 'ArrowUp'});
    await el.updateComplete;

    expect(items[0].tabIndex).to.eq(0);
    expect(items[0].active).to.be.true;
    expect(items[1].tabIndex).to.eq(-1);
    expect(items[1].active).to.be.false;
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

    const firstChild = $(el, 'vscode-tree-item')!;
    firstChild.active = true;
    firstChild.focus();
    await sendKeys({down: 'Enter'});

    expect(firstChild.selected).to.be.true;
    expect(spy.getCalls()[0].args[0].type).to.eq('vsc-tree-select');
  });

  it('selects item with click on it', async () => {
    const el = await fixture<VscodeTree>(
      html`<vscode-tree>
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

  it('opens and selects branch item with Enter key press', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree>
        <vscode-tree-item id="item1">Item 1</vscode-tree-item>
        <vscode-tree-item id="item2">
          Item 2
          <vscode-tree-item>Item 2.1</vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree>`
    );

    $('vscode-tree-item').focus();
    await sendKeys({down: 'ArrowDown'});
    await sendKeys({down: 'Enter'});

    expect($<VscodeTreeItem>('#item2').open).to.be.true;
    expect($<VscodeTreeItem>('#item2').selected).to.be.true;
  });

  it('opens and selects branch item with click on it', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree>
        <vscode-tree-item id="item1">Item 1</vscode-tree-item>
        <vscode-tree-item id="item2">
          Item 2
          <vscode-tree-item>Item 2.1</vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree>`
    );

    await clickOnElement($('#item2'));

    expect($<VscodeTreeItem>('#item2').open).to.be.true;
    expect($<VscodeTreeItem>('#item2').selected).to.be.true;
  });

  it('selecting multiple items upwards with the mouse and the Shift key', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree multi-select>
        <vscode-tree-item id="item1">Item 1</vscode-tree-item>
        <vscode-tree-item id="item2">Item 2</vscode-tree-item>
        <vscode-tree-item id="item3">Item 3</vscode-tree-item>
        <vscode-tree-item id="item4">Item 4</vscode-tree-item>
        <vscode-tree-item id="item5">Item 5</vscode-tree-item>
      </vscode-tree>`
    );

    await clickOnElement($('#item5'));

    await sendKeys({down: 'Shift'});
    await clickOnElement($('#item1'));
    await sendKeys({up: 'Shift'});

    for (let i = 1; i <= 5; i++) {
      expect($<VscodeTreeItem>(`#item${i}`).selected).to.be.true;
    }
  });

  it('expands selection of multiple items upwards with the mouse and the Shift key', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree multi-select>
        <vscode-tree-item id="item1">Item 1</vscode-tree-item>
        <vscode-tree-item id="item2">Item 2</vscode-tree-item>
        <vscode-tree-item id="item3">Item 3</vscode-tree-item>
        <vscode-tree-item id="item4">Item 4</vscode-tree-item>
        <vscode-tree-item id="item5">Item 5</vscode-tree-item>
      </vscode-tree>`
    );

    await clickOnElement($('#item5'));

    await sendKeys({down: 'Shift'});
    await clickOnElement($('#item3'));
    await clickOnElement($('#item1'));
    await sendKeys({up: 'Shift'});

    for (let i = 1; i <= 5; i++) {
      expect($<VscodeTreeItem>(`#item${i}`).selected).to.be.true;
    }
  });

  it('selecting multiple items downwards with the mouse and the Shift key', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree multi-select>
        <vscode-tree-item id="item1">Item 1</vscode-tree-item>
        <vscode-tree-item id="item2">Item 2</vscode-tree-item>
        <vscode-tree-item id="item3">Item 3</vscode-tree-item>
        <vscode-tree-item id="item4">Item 4</vscode-tree-item>
        <vscode-tree-item id="item5">Item 5</vscode-tree-item>
      </vscode-tree>`
    );

    await clickOnElement($('#item1'));

    await sendKeys({down: 'Shift'});
    await clickOnElement($('#item5'));
    await sendKeys({up: 'Shift'});

    for (let i = 1; i <= 5; i++) {
      expect($<VscodeTreeItem>(`#item${i}`).selected).to.be.true;
    }
  });

  it('expands selection of multiple items downwards with the mouse and the Shift key', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree multi-select>
        <vscode-tree-item id="item1">Item 1</vscode-tree-item>
        <vscode-tree-item id="item2">Item 2</vscode-tree-item>
        <vscode-tree-item id="item3">Item 3</vscode-tree-item>
        <vscode-tree-item id="item4">Item 4</vscode-tree-item>
        <vscode-tree-item id="item5">Item 5</vscode-tree-item>
      </vscode-tree>`
    );

    await clickOnElement($('#item1'));

    await sendKeys({down: 'Shift'});
    await clickOnElement($('#item3'));
    await clickOnElement($('#item5'));
    await sendKeys({up: 'Shift'});

    for (let i = 1; i <= 5; i++) {
      expect($<VscodeTreeItem>(`#item${i}`).selected).to.be.true;
    }
  });

  it('toggle selection upwards with ArrowUp + Shift', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree multi-select>
        <vscode-tree-item selected>Item 1</vscode-tree-item>
        <vscode-tree-item>Item 2</vscode-tree-item>
      </vscode-tree>`
    );

    const items = $$('vscode-tree-item');
    items[1].active;
    items[1].focus();
    await sendKeys({down: 'Shift'});
    await sendKeys({down: 'ArrowUp'});
    await sendKeys({up: 'Shift'});

    expect($('vscode-tree-item').selected).to.be.false;
  });

  it('toggle selection downwards with ArrowDown + Shift', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree multi-select>
        <vscode-tree-item>Item 1</vscode-tree-item>
        <vscode-tree-item selected>Item 2</vscode-tree-item>
      </vscode-tree>`
    );

    const items = $$('vscode-tree-item');
    items[0].active;
    items[0].focus();
    await sendKeys({down: 'Shift'});
    await sendKeys({down: 'ArrowDown'});
    await sendKeys({up: 'Shift'});

    expect($$('vscode-tree-item')[1].selected).to.be.false;
  });

  it('selecting multiple items with the mouse and the Ctrl key', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree multi-select>
        <vscode-tree-item id="item1">Item 1</vscode-tree-item>
        <vscode-tree-item id="item2">Item 2</vscode-tree-item>
        <vscode-tree-item id="item3">Item 3</vscode-tree-item>
        <vscode-tree-item id="item4">Item 4</vscode-tree-item>
        <vscode-tree-item id="item5">Item 5</vscode-tree-item>
      </vscode-tree>`
    );

    await clickOnElement($('#item1'));
    await sendKeys({down: 'Control'});
    await clickOnElement($('#item3'));
    await clickOnElement($('#item5'));
    await sendKeys({up: 'Control'});

    expect($<VscodeTreeItem>('#item1').selected).to.be.true;
    expect($<VscodeTreeItem>('#item2').selected).to.be.false;
    expect($<VscodeTreeItem>('#item3').selected).to.be.true;
    expect($<VscodeTreeItem>('#item4').selected).to.be.false;
    expect($<VscodeTreeItem>('#item5').selected).to.be.true;
  });

  it('opens closed branch if the ArrowRight key is pressed', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree>
        <vscode-tree-item>
          Item 1
          <vscode-tree-item>Item 1.1</vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree>`
    );

    $('vscode-tree-item').focus();
    await sendKeys({down: 'ArrowRight'});

    expect($('vscode-tree-item').open).to.be.true;
  });

  it('select the first child when the ArrowRight key is pressed on an opened branch', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree>
        <vscode-tree-item open>
          Item 1
          <vscode-tree-item id="item1_1">Item 1.1</vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree>`
    );

    $('vscode-tree-item').active = true;
    $('vscode-tree-item').focus();
    await sendKeys({down: 'ArrowRight'});

    expect($<VscodeTreeItem>('#item1_1').active).to.be.true;
  });

  it('closes the opened branch if the ArrowLeft key is pressed', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree>
        <vscode-tree-item open>
          Item 1
          <vscode-tree-item>Item 1.1</vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree>`
    );

    $('vscode-tree-item').focus();
    await sendKeys({down: 'ArrowLeft'});

    expect($('vscode-tree-item').open).to.be.false;
  });

  it('pressing ArrowLeft on a leaf selects its parent branch', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree>
        <vscode-tree-item open>
          Item 1
          <vscode-tree-item id="item1_1">Item 1.1</vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree>`
    );

    $<VscodeTreeItem>('#item1_1').active = true;
    $<VscodeTreeItem>('#item1_1').focus();
    await sendKeys({down: 'ArrowLeft'});

    expect($('vscode-tree-item').active).to.be.true;
  });

  it('pressing ArrowLeft on a collapsed branch selects its parent', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree>
        <vscode-tree-item open>
          Item 1
          <vscode-tree-item id="item1_1">
            Item 1.1
            <vscode-tree-item>Item 1.1.1</vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree>`
    );

    $<VscodeTreeItem>('#item1_1').active = true;
    $<VscodeTreeItem>('#item1_1').focus();
    await sendKeys({down: 'ArrowLeft'});

    expect($('vscode-tree-item').active).to.be.true;
  });

  it('Ctrl + ArrowLeft collapses all branches', async () => {
    await fixture<VscodeTree>(
      html`<vscode-tree>
        <vscode-tree-item open>
          Item 1
          <vscode-tree-item open>
            Item 1.1
            <vscode-tree-item>Item 1.1.1</vscode-tree-item>
          </vscode-tree-item>
        </vscode-tree-item>
      </vscode-tree>`
    );

    $('vscode-tree-item').active = true;
    $('vscode-tree-item').focus();
    await sendKeys({down: 'Control'});
    await sendKeys({down: 'ArrowLeft'});

    $$('vscode-tree-item').forEach((i) => {
      expect(i.open).to.be.false;
    });
  });
});
