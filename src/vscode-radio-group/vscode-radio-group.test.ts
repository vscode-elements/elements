import {expect, fixture, html} from '@open-wc/testing';
import {$} from '../includes/test-helpers.js';
import '../vscode-radio/index.js';
import {VscodeRadio} from '../vscode-radio/index.js';
import {VscodeRadioGroup} from './index.js';

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
});
