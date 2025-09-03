import {expect, fixture, html} from '@open-wc/testing';
import {$, $$, clickOnElement} from '../includes/test-helpers.js';
import '../vscode-radio/index.js';
import {VscodeRadio} from '../vscode-radio/index.js';
import {VscodeRadioGroup} from './index.js';

class DemoElement extends HTMLElement {
  static template = (() => {
    const t = document.createElement('template');
    t.innerHTML = `
      <vscode-radio-group>
        <vscode-radio value="1">Option 1</vscode-radio>
        <vscode-radio value="2">Option 2</vscode-radio>
        <vscode-radio value="3" default-checked>Option 3</vscode-radio>
      </vscode-radio-group>
    `;

    return t;
  })();

  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(DemoElement.template.content.cloneNode(true));

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      :host {
        display: block;
        padding: 16px;
      }
    `);

    shadow.adoptedStyleSheets = [sheet];
  }
}

customElements.define('demo-element', DemoElement);

describe('vscode-radio-group', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-radio-group');
    expect(el).to.instanceOf(VscodeRadioGroup);
  });

  it('checks the default option on page load', async () => {
    await fixture<VscodeRadioGroup>(html`
      <vscode-radio-group>
        <vscode-radio name="radio-test" value="1">Option 1</vscode-radio>
        <vscode-radio name="radio-test" value="2" default-checked
          >Option 2</vscode-radio
        >
        <vscode-radio name="radio-test" value="3">Option 3</vscode-radio>
      </vscode-radio-group>
    `);

    const radio = $<VscodeRadio>('vscode-radio[value="2"]');
    const icon = $(radio.shadowRoot!, '.icon');

    expect(icon.classList.contains('checked')).to.be.true;
  });

  it('checks the last default checked radio on page load', async () => {
    await fixture<VscodeRadioGroup>(html`
      <vscode-radio-group>
        <vscode-radio name="radio-test" value="1">Option 1</vscode-radio>
        <vscode-radio name="radio-test" value="2" default-checked
          >Option 2</vscode-radio
        >
        <vscode-radio name="radio-test" value="3" default-checked
          >Option 3</vscode-radio
        >
      </vscode-radio-group>
    `);

    const radio2 = $<VscodeRadio>('vscode-radio[value="2"]');
    const icon2 = $(radio2.shadowRoot!, '.icon');
    const radio3 = $<VscodeRadio>('vscode-radio[value="3"]');
    const icon3 = $(radio3.shadowRoot!, '.icon');

    expect(icon2.classList.contains('checked')).to.be.false;
    expect(icon3.classList.contains('checked')).to.be.true;
  });

  it('works in shadow DOM', async () => {
    const el = await fixture<DemoElement>(html`<demo-element></demo-element>`);

    const radios = $$(el.shadowRoot!, 'vscode-radio');
    const lastRadioDefaultChecked = radios[2].checked;

    await clickOnElement(radios[0]);

    expect(lastRadioDefaultChecked).to.be.true;
    expect(radios[0].checked).to.be.true;
    expect(radios[2].checked).to.be.false;
  });
});
