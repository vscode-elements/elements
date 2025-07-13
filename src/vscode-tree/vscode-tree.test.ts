import {expect, fixture, html} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
import '../vscode-tree-item/vscode-tree-item.js';
import {VscodeTreeItem} from '../vscode-tree-item/vscode-tree-item.js';
import {VscodeTree} from './index.js';

describe('vscode-tree', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-tree');
    expect(el).to.instanceOf(VscodeTree);
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

  it('selects item with Enter key press');
  it('selects item with click on it');
  it('opens and selects branch item with Enter key press');
  it('opens and selects branch item with click on it');
  it('selecting multiple items upwards with the mouse and the Shift key');
  it(
    'expands selection of multiple items upwards with the mouse and the Shift key'
  );
  it('selecting multiple items downwards with the mouse and the Shift key');
  it(
    'expands selection of multiple items downwards with the mouse and the Shift key'
  );
});
