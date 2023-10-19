import '../vscode-radio/index.js';
import {VscodeRadio} from '../vscode-radio/index.js';
import '../vscode-radio-group/index.js';
import {VscodeRadioGroup} from '../vscode-radio-group/index.js';
import {aTimeout, expect, fixture, html} from '@open-wc/testing';

describe('vscode-radio', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-radio');
    expect(el).to.instanceOf(VscodeRadio);
  });

  it('should show check icon when it is checked', async () => {
    const el = await fixture<VscodeRadio>(
      html`<vscode-radio checked></vscode-radio>`
    );

    expect(el.shadowRoot?.querySelector('.icon.checked')).to.be.ok;
  });

  it('should be invalid if one of the radio button is required in the group and none of them is checked', async () => {
    const form = document.createElement('form');
    const group = document.createElement(
      'vscode-radio-group'
    ) as VscodeRadioGroup;
    const rb1 = document.createElement('vscode-radio') as VscodeRadio;
    rb1.name = 'test';
    rb1.setAttribute('required', '');
    rb1.value = '1';
    rb1.label = 'One';
    const rb2 = document.createElement('vscode-radio') as VscodeRadio;
    rb2.name = 'test';
    rb2.required = true;
    rb2.value = '2';
    rb2.label = 'Two';
    const rb3 = document.createElement('vscode-radio') as VscodeRadio;
    rb3.name = 'test';
    rb3.value = '3';
    rb3.label = 'Three';

    group.appendChild(rb1);
    group.appendChild(rb2);
    group.appendChild(rb3);
    form.appendChild(group);
    document.body.appendChild(form);

    await aTimeout(0);

    const radios = form.querySelectorAll('vscode-radio');

    expect(group).to.instanceOf(VscodeRadioGroup);
    expect(radios[0]).to.instanceOf(VscodeRadio);
    expect(radios[1]).to.instanceOf(VscodeRadio);
    expect(radios[2]).to.instanceOf(VscodeRadio);
    expect(radios[0].checkValidity()).to.be.false;

    form.remove();
  });
});
