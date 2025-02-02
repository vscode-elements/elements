import {expect, fixture, html} from '@open-wc/testing';
import {VscodeTree} from './vscode-tree.js';

const createSimpleTreeData = () => [
  {
    label: 'Branch 1',
    subItems: [
      {
        label: 'Leaf 1.1',
      },
    ],
  },
  {
    label: 'Branch 2',
    open: true,
    subItems: [
      {
        label: 'Leaf 2.1',
      },
    ],
  },
];

describe('vscode-tree', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-tree');
    expect(el).to.instanceOf(VscodeTree);
  });

  it('renders without options', async () => {
    const el = await fixture(html`<vscode-tree></vscode-tree>`);

    expect(el).shadowDom.to.eq(`
      <div class="has-not-focused-item selection-none single wrapper">
        <ul></ul>
      </div>
    `);
  });

  it('renders simple tree', async () => {
    const data = createSimpleTreeData();

    const el = await fixture(html`<vscode-tree .data=${data}></vscode-tree>`);

    expect(el).shadowDom.to.eq(`
      <div class="has-not-focused-item selection-none single wrapper">
        <ul>
          <li class="branch" data-path="0">
            <div class="contents" style="padding-left: 3px;">
              <span class="text-content" part="text-content"> Branch 1 </span>
            </div>
          </li>
          <li class="branch open" data-path="1">
            <div class="contents" style="padding-left: 3px;">
              <span class="text-content" part="text-content"> Branch 2 </span>
            </div>
            <ul style="--indent-guide-pos:3px;">
              <li class="leaf" data-path="1/0">
                <div class="contents" style="padding-left: 11px;">
                  <span class="text-content" part="text-content"> Leaf 2.1 </span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    `);
  });

  it('renders arrows', async () => {
    const data = createSimpleTreeData();

    const el = await fixture(
      html`<vscode-tree .data=${data} arrows></vscode-tree>`
    );

    expect(
      el.shadowRoot?.querySelector(
        'ul li:nth-child(1) vscode-icon[name="chevron-right"]'
      )
    ).to.be.ok;
    expect(
      el.shadowRoot?.querySelector(
        'ul li:nth-child(2) vscode-icon[name="chevron-down"]'
      )
    ).to.be.ok;
  });

  it('indents elements');
  it('renders indent guides');
});
