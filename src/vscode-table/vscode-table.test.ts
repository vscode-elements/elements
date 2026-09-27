/* eslint-disable @typescript-eslint/no-unused-expressions */
import {sendMouse} from '@web/test-runner-commands';
import {$, dragElement} from '../includes/test-helpers.js';
import {VscodeTable} from './index.js';
import {aTimeout, expect, fixture, html} from '@open-wc/testing';

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

  it('preserves resized column widths across rerenders', async () => {
    const columns = ['30%', '70%'];
    const el = await fixture<VscodeTable>(html`
      <vscode-table resizable style="width: 500px" .columns=${columns}>
        <vscode-table-header>
          <vscode-table-header-cell>Col 1</vscode-table-header-cell>
          <vscode-table-header-cell>Col 2</vscode-table-header-cell>
        </vscode-table-header>
        <vscode-table-body>
          <vscode-table-row>
            <vscode-table-cell>One</vscode-table-cell>
            <vscode-table-cell>Two</vscode-table-cell>
          </vscode-table-row>
        </vscode-table-body>
      </vscode-table>
    `);
    const initialWidths = el.columnWidths;

    await dragElement($(el.shadowRoot!, '.sash-clickable'), 20);
    const resizedWidths = el.columnWidths;

    expect(resizedWidths).not.to.deep.equal(initialWidths);

    el.columns = columns;
    await el.updateComplete;
    expect(el.columnWidths).to.deep.equal(resizedWidths);

    const body = el.querySelector('vscode-table-body')!;
    body.innerHTML = `
      <vscode-table-row>
        <vscode-table-cell>Updated one</vscode-table-cell>
        <vscode-table-cell>Updated two</vscode-table-cell>
      </vscode-table-row>
    `;
    await aTimeout(0);

    const cells = body.querySelectorAll('vscode-table-cell');
    expect(parseFloat(cells[0].style.width)).to.be.closeTo(
      resizedWidths[0],
      0.01
    );
    expect(parseFloat(cells[1].style.width)).to.be.closeTo(
      resizedWidths[1],
      0.01
    );
  });

  it('restores neighboring column widths when a divider returns to its start', async () => {
    const el = await fixture<VscodeTable>(html`
      <vscode-table
        resizable
        style="width: 500px"
        columns='["20%", "30%", "30%", "20%"]'
      >
        <vscode-table-header>
          <vscode-table-header-cell>Col 1</vscode-table-header-cell>
          <vscode-table-header-cell>Col 2</vscode-table-header-cell>
          <vscode-table-header-cell>Col 3</vscode-table-header-cell>
          <vscode-table-header-cell>Col 4</vscode-table-header-cell>
        </vscode-table-header>
        <vscode-table-body>
          <vscode-table-row>
            <vscode-table-cell>One</vscode-table-cell>
            <vscode-table-cell>Two</vscode-table-cell>
            <vscode-table-cell>Three</vscode-table-cell>
            <vscode-table-cell>Four</vscode-table-cell>
          </vscode-table-row>
        </vscode-table-body>
      </vscode-table>
    `);
    const initialWidths = el.columnWidths;
    const splitter = $(el.shadowRoot!, '.sash-clickable');
    const rect = splitter.getBoundingClientRect();
    const startX = Math.floor(rect.x + window.scrollX + rect.width / 2);
    const startY = Math.floor(rect.y + window.scrollY + rect.height / 2);

    await sendMouse({type: 'move', position: [startX, startY]});
    await sendMouse({type: 'down'});
    await sendMouse({type: 'move', position: [startX + 300, startY]});
    await el.updateComplete;
    expect(el.columnWidths).not.to.deep.equal(initialWidths);

    await sendMouse({type: 'move', position: [startX, startY]});
    await sendMouse({type: 'up'});
    await el.updateComplete;

    const roundedWidths = el.columnWidths.map(
      (width) => Math.round(width * 100) / 100
    );
    const roundedInitialWidths = initialWidths.map(
      (width) => Math.round(width * 100) / 100
    );

    expect(roundedWidths).to.deep.equal(roundedInitialWidths);
  });
});
