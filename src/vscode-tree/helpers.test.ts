import {expect, fixture, html} from '@open-wc/testing';
import {findLastChildItem, findNextItem, findPrevItem} from './helpers';
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

    it('returns last child of the opened branch', async () => {
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
            <vscode-tree-item>1.2</vscode-tree-item>
            <vscode-tree-item open>
              1.3
              <vscode-tree-item>1.3.1</vscode-tree-item>
              <vscode-tree-item>1.3.2</vscode-tree-item>
              <vscode-tree-item id="item1_3_3">1.3.3</vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item>2</vscode-tree-item>
        </vscode-tree>
      `);

      const item1 = el.querySelector<VscodeTreeItem>('#item1')!;
      const item1_3_3 = el.querySelector<VscodeTreeItem>('#item1_3_3')!;

      expect(findLastChildItem(item1)).to.eq(item1_3_3);
    });

    it('does not traverse the closed branches', async () => {
      const el = await fixture(html`
        <vscode-tree>
          <vscode-tree-item id="item1" open>
            1
            <vscode-tree-item>1.1</vscode-tree-item>
            <vscode-tree-item>1.2</vscode-tree-item>
            <vscode-tree-item id="item1_3">
              1.3
              <vscode-tree-item>1.3.1</vscode-tree-item>
              <vscode-tree-item>1.3.2</vscode-tree-item>
              <vscode-tree-item>1.3.3</vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item>2</vscode-tree-item>
        </vscode-tree>
      `);

      const item1 = el.querySelector<VscodeTreeItem>('#item1')!;
      const item1_3 = el.querySelector<VscodeTreeItem>('#item1_3')!;

      expect(findLastChildItem(item1)).to.eq(item1_3);
    });

    it('returns the passed item if it is not a tree-item', async () => {
      const el = await fixture(html`<div></div>`);

      expect(findLastChildItem(el as VscodeTreeItem)).to.eq(el);
    });

    it('returns the passed item if it does not have a child', async () => {
      await fixture(
        html` <vscode-tree>
          <vscode-tree-item id="leaf">leaf</vscode-tree-item>
        </vscode-tree>`
      );

      const item = document.getElementById('leaf')! as VscodeTreeItem;

      expect(findLastChildItem(item)).to.eq(item);
    });
  });

  describe('findNextItem()', () => {
    it('returns null if does not have parent element', () => {
      const el = document.createElement('vscode-tree-item');

      expect(findNextItem(el)).to.be.null;
    });

    it('returns null if it is not a tree item', async () => {
      const el = await fixture(
        html`<vscode-tree><div id="item"></div></vscode-tree>`
      );

      expect(findNextItem(el.querySelector('#item') as VscodeTreeItem)).to.be
        .null;
    });

    it('returns last children of the opened branch', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree>
          <vscode-tree-item id="item1" open>
            1
            <vscode-tree-item id="item1_1">1.1</vscode-tree-item>
            <vscode-tree-item>1.2</vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item>2</vscode-tree-item>
        </vscode-tree>
      `);

      const item1 = el.querySelector<VscodeTreeItem>('#item1')!;
      const item1_1 = el.querySelector<VscodeTreeItem>('#item1_1')!;

      expect(findNextItem(item1)).to.eq(item1_1);
    });

    it('returns the next sibling if the opened branch does not contain any item', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree>
          <vscode-tree-item id="item1" open>1</vscode-tree-item>
          <vscode-tree-item id="item2">2</vscode-tree-item>
        </vscode-tree>
      `);

      const item1 = el.querySelector<VscodeTreeItem>('#item1')!;
      const item2 = el.querySelector<VscodeTreeItem>('#item2')!;

      expect(findNextItem(item1)).to.eq(item2);
    });

    it('returns the next ancestor', async () => {
      const el = await fixture<VscodeTree>(html`
        <vscode-tree>
          <vscode-tree-item open>
            1
            <vscode-tree-item>
              1.1
              <vscode-tree-item id="item1_1_1">
                1.1.1
              </vscode-tree-item>
            </vscode-tree-item>
          </vscode-tree-item>
          <vscode-tree-item id="item2">2</vscode-tree-item>
        </vscode-tree>
      `);

      const item1_1_1 = el.querySelector<VscodeTreeItem>('#item1_1_1')!;
      const item2 = el.querySelector<VscodeTreeItem>('#item2')!;

      expect(findNextItem(item1_1_1)).to.eq(item2);
    });
  });
});
