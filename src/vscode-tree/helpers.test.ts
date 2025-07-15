import {expect, fixture, html} from '@open-wc/testing';
import {findLastChildItem, findPrevItem} from './helpers';
import {VscodeTreeItem} from '../vscode-tree-item';
import '../vscode-tree-item/vscode-tree-item.js';
import {VscodeTree} from './vscode-tree';
import './vscode-tree.js';

describe('vscode-tree helpers', () => {
  describe('findPrevItem()', () => {
    it('returns null if does not have parent element', () => {
      const el = document.createElement('vscode-tree-item');

      expect(findPrevItem(el)).to.be.null;
    });

    it('returns null if item is not tree item', () => {
      const el = document.createElement('span');

      expect(findPrevItem(el as VscodeTreeItem)).to.be.null;
    });

    it('returns previous sibling', async () => {
      const el = await fixture(html`
        <vscode-tree>
          <vscode-tree-item id="item1">1</vscode-tree-item>
          <vscode-tree-item id="item2">2</vscode-tree-item>
        </vscode-tree>
      `);

      const item1 = el.querySelector<VscodeTreeItem>('#item1')!;
      const item2 = el.querySelector<VscodeTreeItem>('#item2')!;

      expect(findPrevItem(item2)).to.eq(item1);
    });

    it('returns previous tree item', async () => {
      const el = await fixture(html`
        <vscode-tree>
          <vscode-tree-item id="item1">1</vscode-tree-item>
          <div>aaa</div>
          <vscode-tree-item id="item2">2</vscode-tree-item>
        </vscode-tree>
      `);

      const item1 = el.querySelector<VscodeTreeItem>('#item1')!;
      const item2 = el.querySelector<VscodeTreeItem>('#item2')!;

      expect(findPrevItem(item2)).to.eq(item1);
    });

    it('returns the previous closed branch', async () => {
      const el = await fixture(html`
        <vscode-tree>
          <vscode-tree-item id="item1">
            1
            <vscode-tree-item>1.1</vscode-tree-item>
            <vscode-tree-item>1.2</vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item id="item2">2</vscode-tree-item>
        </vscode-tree>
      `);

      const item1 = el.querySelector<VscodeTreeItem>('#item1')!;
      const item2 = el.querySelector<VscodeTreeItem>('#item2')!;

      expect(findPrevItem(item2)).to.eq(item1);
    });

    it('returns last children of the opened branch', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree>
          <vscode-tree-item id="item1" open>
            1
            <vscode-tree-item id="item1_1">1.1</vscode-tree-item>
            <vscode-tree-item id="item1_2">1.2</vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item id="item2">2</vscode-tree-item>
        </vscode-tree>
      `);

      const item2 = el.querySelector<VscodeTreeItem>('#item2')!;
      const item1_2 = el.querySelector<VscodeTreeItem>('#item1_2')!;

      expect(findPrevItem(item2)).to.eq(item1_2);
    });

    it('returns last children of the nested opened branch', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree>
          <vscode-tree-item open>
            1
            <vscode-tree-item>1.1</vscode-tree-item>
            <vscode-tree-item open>
              1.2
              <vscode-tree-item>1.2.1</vscode-tree-item>
              <vscode-tree-item id="item1_2_2">1.2.2</vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item id="item2">2</vscode-tree-item>
        </vscode-tree>
      `);

      const item2 = el.querySelector<VscodeTreeItem>('#item2')!;
      const item1_2_2 = el.querySelector<VscodeTreeItem>('#item1_2_2')!;

      expect(findPrevItem(item2)).to.eq(item1_2_2);
    });
  });

  describe('findLastChildItem()', () => {
    it('returns the last child item', async () => {
      const el = await fixture(html`
        <vscode-tree>
          <vscode-tree-item id="item1" open>
            1
            <vscode-tree-item>1.1</vscode-tree-item>
            <vscode-tree-item id="item1_2">1.2</vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item>2</vscode-tree-item>
        </vscode-tree>
      `);

      const item1 = el.querySelector<VscodeTreeItem>('#item1')!;
      const item1_2 = el.querySelector<VscodeTreeItem>('#item1_2')!;

      expect(findLastChildItem(item1)).to.eq(item1_2);
    });
  });
});
