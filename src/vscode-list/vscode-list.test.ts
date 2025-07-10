import {aTimeout, expect, fixture, html} from '@open-wc/testing';
import {VscodeListItem} from '../main.js';
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
    const firstItem = el.querySelector<VscodeListItem>('vscode-list-item')!;

    expect(firstItem.active).to.be.true;
  });
});
