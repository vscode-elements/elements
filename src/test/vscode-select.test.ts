/* eslint-disable @typescript-eslint/no-unused-vars */
import {VscodeSelect} from '../vscode-select';
import {VscodeOption} from '../vscode-option';
import '../vscode-option';
import {html, fixture, expect} from '@open-wc/testing';

describe('vscode-select', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-select');
    expect(el).to.instanceOf(VscodeSelect);
  });

  it('renders with default values', async () => {
    const el = (await fixture(html`
      <vscode-select>
        <vscode-option>Lorem</vscode-option>
        <vscode-option selected>Ipsum</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    expect(el).shadowDom.to.equal(`
      <div class="select-face">
        <span class="text">
          Ipsum
        </span>
        <span class="icon"></span>
      </div>
      <div class="dropdown">
        <div class="options">
          <slot></slot>
        </div>
      </div>
    `);
  });

  it('renders with explicit values', async () => {
    const el = (await fixture(html`
      <vscode-select>
        <vscode-option value="testvalue1">Lorem</vscode-option>
        <vscode-option selected value="testvalue2">Ipsum</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    expect(el.value).to.eq('testvalue2');
  });

  it('renders description', async () => {
    const markup = html`
      <vscode-select>
        <vscode-option value="test value 1" description="Test description 1"
          >Lorem</vscode-option
        >
        <vscode-option value="test value 2" description="Test description 2"
          >Ipsum</vscode-option
        >
        <vscode-option value="test value 3" description="Test description 3"
          >Dolor</vscode-option
        >
      </vscode-select>
    `;
    const el = (await fixture(markup)) as VscodeSelect;

    const option = el.querySelectorAll('vscode-option')[1];
    const event = new MouseEvent('mouseover');
    event.composedPath = () => {
      return [option];
    };

    el.dispatchEvent(event);
    await el.updateComplete;

    const descriptionEl = el.shadowRoot?.querySelector('.description');
    expect(descriptionEl).lightDom.to.equal('Test description 2');
  });

  it('multiple attribute', async () => {
    const el = (await fixture(html`
      <vscode-select multiple>
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    const labelEl = el.shadowRoot?.querySelector('.select-face .text');
    const slot = el.shadowRoot?.querySelector('slot');
    const optionElements = slot
      ?.assignedNodes()
      .filter(
        (el) => el.nodeName.toLowerCase() === 'vscode-option'
      ) as VscodeOption[];

    expect(el.selectedIndex).to.eq(-1);
    expect(el.value).to.eq('');
    expect(labelEl).lightDom.to.equal('&lt;No item selected&gt;');
    expect(optionElements[0].multiple).to.eq(true);
    expect(optionElements[1].multiple).to.eq(true);
    expect(optionElements[2].multiple).to.eq(true);
  });

  it('multiple attribute - select multiple option', async () => {
    const el = (await fixture(html`
      <vscode-select multiple>
        <vscode-option>Lorem</vscode-option>
        <vscode-option selected>Ipsum</vscode-option>
        <vscode-option selected>Dolor</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    const labelEl = el.shadowRoot?.querySelector('.select-face .text');

    expect(el.selectedIndex).to.eq(1);
    expect(el.multipleSelectedIndexes).to.eql([1, 2]);
    expect(el.value).to.eq('Ipsum');
    expect(labelEl).lightDom.to.equal('2 items selected');
  });
});
