/* eslint-disable @typescript-eslint/no-unused-expressions */
import {$, $$, dragElement} from '../includes/test-helpers.js';
import {VscodeTable} from './index.js';
import '../vscode-table-body/vscode-table-body.js';
import '../vscode-table-header/vscode-table-header.js';
import '../vscode-table-row/vscode-table-row.js';
import '../vscode-table-cell/vscode-table-cell.js';
import '../vscode-table-header-cell/vscode-table-header-cell.js';
import {expect, fixture, html} from '@open-wc/testing';
import {VscodeTableCell} from '../vscode-table-cell/vscode-table-cell.js';

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

  it('resizes two columns when dragged left', async () => {
    const el = await fixture<VscodeTable>(html`
      <vscode-table resizable style="width: 500px">
        <vscode-table-header>
          <vscode-table-header-cell>Col 1</vscode-table-header-cell>
          <vscode-table-header-cell>Col 2</vscode-table-header-cell>
        </vscode-table-header>
        <vscode-table-body>
          <vscode-table-row>
            <vscode-table-cell>A</vscode-table-cell>
            <vscode-table-cell>B</vscode-table-cell>
          </vscode-table-row>
        </vscode-table-body>
      </vscode-table>
    `);

    await dragElement($(el.shadowRoot!, '.sash.resizable'), -100, 0);

    const cells = $$<VscodeTableCell>('vscode-table-cell');

    const w1 = parseFloat(cells[0].style.width);
    const w2 = parseFloat(cells[1].style.width);

    expect(w1 + w2).to.equal(100);
    expect(w1).to.be.lessThan(50);
    expect(w2).to.be.greaterThan(50);
  });

  it('clamps resize at min-width', async () => {
    const el = await fixture<VscodeTable>(html`
      <vscode-table resizable style="width: 500px">
        <vscode-table-header>
          <vscode-table-header-cell min-width="100">
            Col 1
          </vscode-table-header-cell>
          <vscode-table-header-cell> Col 2 </vscode-table-header-cell>
        </vscode-table-header>
        <vscode-table-body>
          <vscode-table-row>
            <vscode-table-cell>A</vscode-table-cell>
            <vscode-table-cell>B</vscode-table-cell>
          </vscode-table-row>
        </vscode-table-body>
      </vscode-table>
    `);

    // 500px table → min-width 100px = 20%
    await dragElement($(el.shadowRoot!, '.sash.resizable'), -400, 0);

    const cells = $$<VscodeTableCell>('vscode-table-cell');

    expect(cells[0].style.width).to.equal('20%');
    expect(cells[1].style.width).to.equal('80%');
  });

  it('uses preferred-width as initial column width', async () => {
    await fixture<VscodeTable>(html`
      <vscode-table resizable style="width: 500px">
        <vscode-table-header>
          <vscode-table-header-cell preferred-width="30%">
            Col 1
          </vscode-table-header-cell>
          <vscode-table-header-cell> Col 2 </vscode-table-header-cell>
        </vscode-table-header>
        <vscode-table-body>
          <vscode-table-row>
            <vscode-table-cell>A</vscode-table-cell>
            <vscode-table-cell>B</vscode-table-cell>
          </vscode-table-row>
        </vscode-table-body>
      </vscode-table>
    `);

    const cells = $$<VscodeTableCell>('vscode-table-cell');

    expect(cells[0].style.width).to.equal('30%');
    expect(cells[1].style.width).to.equal('70%');
  });

  it('min-width overrides preferred-width when preferred is too small', async () => {
    await fixture<VscodeTable>(html`
      <vscode-table resizable style="width: 500px">
        <vscode-table-header>
          <vscode-table-header-cell preferred-width="10%" min-width="150">
            Col 1
          </vscode-table-header-cell>
          <vscode-table-header-cell> Col 2 </vscode-table-header-cell>
        </vscode-table-header>
        <vscode-table-body>
          <vscode-table-row>
            <vscode-table-cell>A</vscode-table-cell>
            <vscode-table-cell>B</vscode-table-cell>
          </vscode-table-row>
        </vscode-table-body>
      </vscode-table>
    `);

    // 150px / 500px = 30%
    const cells = $$<VscodeTableCell>('vscode-table-cell');

    expect(cells[0].style.width).to.equal('30%');
    expect(cells[1].style.width).to.equal('70%');
  });

  it('chains shrinking across multiple columns when min-width is hit', async () => {
    const el = await fixture<VscodeTable>(html`
      <vscode-table resizable style="width: 600px">
        <vscode-table-header>
          <vscode-table-header-cell min-width="100">
            Col A
          </vscode-table-header-cell>
          <vscode-table-header-cell min-width="200">
            Col B
          </vscode-table-header-cell>
          <vscode-table-header-cell> Col C </vscode-table-header-cell>
        </vscode-table-header>
        <vscode-table-body>
          <vscode-table-row>
            <vscode-table-cell>A</vscode-table-cell>
            <vscode-table-cell>B</vscode-table-cell>
            <vscode-table-cell>C</vscode-table-cell>
          </vscode-table-row>
        </vscode-table-body>
      </vscode-table>
    `);

    await dragElement($(el.shadowRoot!, '.sash.resizable'), -300, 0);

    const cells = $$<HTMLElement>('vscode-table-cell');

    const wA = parseFloat(cells[0].style.width);
    const wB = parseFloat(cells[1].style.width);
    const wC = parseFloat(cells[2].style.width);

    // A should absorb the remaining shrink, but not go below its min-width
    expect(wA).to.be.closeTo(16.67, 0.1);

    // B should be clamped at its min-width: 200 / 600 = 33.33%
    expect(wB).to.be.closeTo(50, 0.1);

    // C grows by exactly what A lost
    expect(wA + wB + wC).to.be.closeTo(100, 0.01);

    // Ensure actual chaining happened (A < initial)
    expect(wA).to.be.lessThan(33.34);
  });

  it('chains growing across multiple columns when right side hits min-width', async () => {
    const el = await fixture<VscodeTable>(html`
      <vscode-table resizable style="width: 600px">
        <vscode-table-header>
          <vscode-table-header-cell> Col A </vscode-table-header-cell>
          <vscode-table-header-cell> Col B </vscode-table-header-cell>
          <vscode-table-header-cell min-width="150">
            Col C
          </vscode-table-header-cell>
        </vscode-table-header>
        <vscode-table-body>
          <vscode-table-row>
            <vscode-table-cell>A</vscode-table-cell>
            <vscode-table-cell>B</vscode-table-cell>
            <vscode-table-cell>C</vscode-table-cell>
          </vscode-table-row>
        </vscode-table-body>
      </vscode-table>
    `);

    // Drag splitter between B and C to the RIGHT
    await dragElement($(el.shadowRoot!, '.sash.resizable'), +300, 0);

    const cells = $$<HTMLElement>('vscode-table-cell');

    const wA = parseFloat(cells[0].style.width);
    const wB = parseFloat(cells[1].style.width);
    const wC = parseFloat(cells[2].style.width);

    // C should clamp at min-width: 150 / 600 = 25%
    expect(wC).to.be.closeTo(25, 0.1);

    // A + B should grow
    expect(wA + wB).to.be.greaterThan(66.6);

    // Sum invariant
    expect(wA + wB + wC).to.be.closeTo(100, 0.01);
  });

  it('preserves column widths when table body is cleared and re-populated', async () => {
    const el = await fixture<VscodeTable>(html`
      <vscode-table resizable style="width: 500px">
        <vscode-table-header>
          <vscode-table-header-cell min-width="100">
            Col 1
          </vscode-table-header-cell>
          <vscode-table-header-cell> Col 2 </vscode-table-header-cell>
        </vscode-table-header>
        <vscode-table-body>
          <vscode-table-row>
            <vscode-table-cell>A</vscode-table-cell>
            <vscode-table-cell>B</vscode-table-cell>
          </vscode-table-row>
        </vscode-table-body>
      </vscode-table>
    `);

    await dragElement($(el.shadowRoot!, '.sash.resizable'), -200, 0);

    let cells = $$<HTMLElement>('vscode-table-cell');

    const widthBefore = Array.from(cells).map((c) =>
      c.style.getPropertyValue('width')
    );

    // Sanity check: widths are actually set
    expect(widthBefore[0]).to.not.equal('');
    expect(widthBefore[1]).to.not.equal('');

    const body = el.querySelector('vscode-table-body')!;
    body.innerHTML = '';

    await el.updateComplete;

    body.appendChild(
      document.createRange().createContextualFragment(`
      <vscode-table-row>
        <vscode-table-cell>C</vscode-table-cell>
        <vscode-table-cell>D</vscode-table-cell>
      </vscode-table-row>
    `)
    );

    await el.updateComplete;

    cells = $$<HTMLElement>('vscode-table-cell');

    const widthAfter = Array.from(cells).map((c) =>
      c.style.getPropertyValue('width')
    );

    expect(widthAfter).to.deep.equal(widthBefore);
  });
});
