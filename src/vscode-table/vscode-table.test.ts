/* eslint-disable @typescript-eslint/no-unused-expressions */
import {$, dragElement} from '../includes/test-helpers.js';
import {VscodeTable} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-table', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-table');
    expect(el).to.instanceOf(VscodeTable);
  });

  it('should not throw when removed from the DOM', () => {
    const el = document.createElement('vscode-table');
    document.body.append(el);

    expect(() => el.remove()).not.to.throw();
  });

  it('should not throw on resize when no rows are present', async () => {
    const el = await fixture(html`
      <vscode-table resizable style="width: 500px">
        <vscode-table-header>
          <vscode-table-header-cell>Col 1</vscode-table-header-cell>
          <vscode-table-header-cell>Col 2</vscode-table-header-cell>
        </vscode-table-header>
        <vscode-table-body>
          <vscode-table-row>no data</vscode-table-row>
        </vscode-table-body>
      </vscode-table>
    `);

    async function testDrag() {
      await dragElement($(el.shadowRoot!, '.sash-clickable'), 20);
    }

    expect(await testDrag()).not.to.throw;
  });
});
