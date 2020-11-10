/* eslint-disable @typescript-eslint/no-unused-vars */
import {VscodeSelect} from '../vscode-select';
import '../vscode-option';
import {html, fixture, expect} from '@open-wc/testing';

describe('vscode-select', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-select');
    expect(el).to.instanceOf(VscodeSelect);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`
      <vscode-select>
        <vscode-option>Lorem</vscode-option>
        <vscode-option selected>Ipsum</vscode-option>
      </vscode-select>
    `) as VscodeSelect;

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
});
