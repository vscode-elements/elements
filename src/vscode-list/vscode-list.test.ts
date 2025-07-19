import {expect, fixture, html} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
import '../vscode-list-item/vscode-list-item.js';
import {VscodeListItem} from '../vscode-list-item/vscode-list-item.js';
import {VscodeList} from './index.js';

describe('vscode-list', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-list');
    expect(el).to.instanceOf(VscodeList);
  });

  it('focuses first item by default', async () => {
    const el = await fixture<VscodeList>(html`
      <vscode-list>
        <vscode-list-item>Item 1</vscode-list-item>
        <vscode-list-item>Item 2</vscode-list-item>
      </vscode-list>
    `);
    const firstItem =
      el.querySelectorAll<VscodeListItem>('vscode-list-item')[0]!;
    const secondItem =
      el.querySelectorAll<VscodeListItem>('vscode-list-item')[1]!;

    expect(firstItem.tabIndex).to.eq(0);
    expect(firstItem.active).to.be.true;
    expect(secondItem.tabIndex).to.eq(-1);
    expect(secondItem.active).to.be.false;
  });

  it('focuses active item on load', async () => {
    const el = await fixture<VscodeList>(html`
      <vscode-list>
        <vscode-list-item>Item 1</vscode-list-item>
        <vscode-list-item active>Item 2</vscode-list-item>
      </vscode-list>
    `);
    const firstItem =
      el.querySelectorAll<VscodeListItem>('vscode-list-item')[0]!;
    const secondItem =
      el.querySelectorAll<VscodeListItem>('vscode-list-item')[1]!;

    expect(firstItem.tabIndex).to.eq(-1);
    expect(firstItem.active).to.be.false;
    expect(secondItem.tabIndex).to.eq(0);
    expect(secondItem.active).to.be.true;
  });

  it('focuses next item when arrow down key is pressed', async () => {
    const el = await fixture<VscodeList>(html`
      <vscode-list>
        <vscode-list-item>Item 1</vscode-list-item>
        <vscode-list-item>Item 2</vscode-list-item>
      </vscode-list>
    `);

    el.querySelector<VscodeListItem>('vscode-list-item')?.focus();
    await sendKeys({press: 'ArrowDown'});
    await el.updateComplete;

    const items = el.querySelectorAll<VscodeListItem>('vscode-list-item')!;

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
