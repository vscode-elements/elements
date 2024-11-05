import './index.js';
import {VscodeRadio} from './index.js';
import '../vscode-radio-group/index.js';
import {expect, fixture, html} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
import sinon from 'sinon';

describe('vscode-radio', () => {
  afterEach(() => {
    const form = document.getElementById('sample-form');

    if (form) {
      form.remove();
    }
  });

  it('is defined', () => {
    const el = document.createElement('vscode-radio');
    expect(el).to.instanceOf(VscodeRadio);
  });

  it('form property should point to the associated form', async () => {
    const form = await fixture(html`
      <form id="test-form">
        <vscode-radio></vscode-radio>
      </form>
    `);
    const radio = form.querySelector<VscodeRadio>('vscode-radio')!;

    expect(radio.form?.getAttribute('id')).to.eq('test-form');
  });

  it('type should be "radio"', async () => {
    const el = await fixture<VscodeRadio>(html`<vscode-radio></vscode-radio>`);

    expect(el.type).to.eq('radio');
  });

  it('should return the validity object', async () => {
    const el = await fixture<VscodeRadio>(html`<vscode-radio></vscode-radio>`);

    expect(el.validity).to.instanceOf(ValidityState);
  });

  it('should return the validation message', async () => {
    const el = await fixture<VscodeRadio>(
      html`<vscode-radio required></vscode-radio>`
    );

    expect(el.validationMessage).to.not.empty;
    expect(el.validationMessage).to.eq('Please select one of these options.');
  });

  it('should willValidate property be true if the element is candidate for constraint validation', async () => {
    const el = await fixture<VscodeRadio>('<vscode-radio></vscode-radio>');

    expect(el.willValidate).to.be.true;
  });

  it('should willValidate property be false if the element is not candidate for constraint validation', async () => {
    const el = await fixture<VscodeRadio>(
      '<vscode-radio disabled></vscode-radio>'
    );

    expect(el.willValidate).to.be.false;
  });

  it('reportValidity should be called', async () => {
    const el = await fixture<VscodeRadio>(
      '<vscode-radio required></vscode-radio>'
    );
    const fn = sinon.spy();
    el.addEventListener('invalid', fn);

    const result = el.reportValidity();

    expect(result).to.be.false;
    expect(fn.called).to.be.true;
  });

  it('defaultChecked should be applied when the reset function of the parent form is called', async () => {
    const form = document.createElement('form');
    const el = await fixture<VscodeRadio>(
      html`<vscode-radio name="test" default-checked></vscode-radio>`,
      {
        parentNode: form,
      }
    );
    const initialChecked = el.checked;

    form.reset();
    await el.updateComplete;

    expect(initialChecked).to.be.false;
    expect(el.checked).to.be.true;
  });

  it('restore callback should restore the previous state', async () => {
    const el = await fixture<VscodeRadio>(
      '<vscode-radio value="test"></vscode-radio>'
    );
    const initialChecked = el.checked;

    el.formStateRestoreCallback('test', 'restore');
    await el.updateComplete;

    expect(initialChecked).to.be.false;
    expect(el.checked).to.be.true;
  });

  it('autofocus should be applied', async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form><vscode-radio autofocus></vscode-radio></form>`
    );
    const radio = form.querySelector<VscodeRadio>('vscode-radio')!;

    const input = radio.shadowRoot?.querySelector('input');
    expect(input?.hasAttribute('autofocus')).to.be.true;
  });

  it('should show check icon when it is checked', async () => {
    const el = await fixture<VscodeRadio>(
      html`<vscode-radio checked></vscode-radio>`
    );

    expect(el.shadowRoot?.querySelector('.icon.checked')).to.be.ok;
  });

  it('focused property should be true when it is focused', async () => {
    const el = await fixture<VscodeRadio>(html`<vscode-radio></vscode-radio>`);
    el.tabIndex = 0;
    el.focus();

    expect(el.focused).to.be.true;
  });

  it('should not be focusable when it is disabled', async () => {
    const el = await fixture<VscodeRadio>(
      html`<vscode-radio disabled></vscode-radio>`
    );

    expect(el.tabIndex).to.eq(-1);
  });

  it('should be invalid if one of the radio button is required in the group and none of them is checked', async () => {
    const form = await fixture(html`
      <form>
        <vscode-radio-group>
          <vscode-radio name="radio-test" id="rb1" required></vscode-radio>
          <vscode-radio name="radio-test" id="rb2"></vscode-radio>
        </vscode-radio-group>
      </form>
    `);
    const rb1 = form.querySelector<VscodeRadio>('#rb1')!;
    const rb2 = form.querySelector<VscodeRadio>('#rb2')!;

    expect(rb1.checkValidity()).to.be.false;
    expect(rb2.checkValidity()).to.be.false;
  });

  it('should be valid if one or more of the radio buttons is required in the group and one of them is checked', async () => {
    const form = await fixture(html`
      <form>
        <vscode-radio-group>
          <vscode-radio name="radio-test" id="rb1" checked></vscode-radio>
          <vscode-radio name="radio-test" id="rb2" required></vscode-radio>
        </vscode-radio-group>
      </form>
    `);
    const rb1 = form.querySelector<VscodeRadio>('#rb1')!;
    const rb2 = form.querySelector<VscodeRadio>('#rb2')!;

    expect(rb1.checkValidity()).to.be.true;
    expect(rb2.checkValidity()).to.be.true;
  });

  it('arrow down key should check the next radio', async () => {
    const group = await fixture(
      html`<vscode-radio-group>
        <vscode-radio name="test" label="One" id="radio-1"></vscode-radio>
        <vscode-radio name="test" label="Two" id="radio-2"></vscode-radio>
      </vscode-radio-group>`
    );

    const radio1 = group.querySelector<VscodeRadio>('#radio-1');
    const radio2 = group.querySelector<VscodeRadio>('#radio-2');
    radio1?.focus();
    await radio1?.updateComplete;

    await sendKeys({press: 'ArrowDown'});

    expect(radio1?.checked).to.be.false;
    expect(radio2?.checked).to.be.true;
  });

  it('arrow up key should check the prev radio', async () => {
    const group = await fixture(
      html`<vscode-radio-group>
        <vscode-radio name="test" label="One" id="radio-1"></vscode-radio>
        <vscode-radio name="test" label="Two" id="radio-2"></vscode-radio>
      </vscode-radio-group>`
    );

    const radio1 = group.querySelector<VscodeRadio>('#radio-1');
    const radio2 = group.querySelector<VscodeRadio>('#radio-2');
    radio2?.focus();
    await radio2?.updateComplete;

    await sendKeys({press: 'ArrowUp'});

    expect(radio1?.checked).to.be.true;
    expect(radio2?.checked).to.be.false;
  });

  it('should checked the radio before the focused one when the arrow up key pressed', async () => {
    const form = await fixture(html`
      <form>
        <vscode-radio-group>
          <vscode-radio name="radio-test" tabindex="-1" id="rb1"></vscode-radio>
          <vscode-radio name="radio-test" tabindex="0" id="rb2"></vscode-radio>
        </vscode-radio-group>
      </form>
    `);
    const rb1 = form.querySelector<VscodeRadio>('#rb1')!;
    const rb2 = form.querySelector<VscodeRadio>('#rb2')!;

    rb2.focus();
    await rb2.updateComplete;

    await sendKeys({
      down: 'ArrowUp',
    });

    expect(rb1.checked).to.be.true;
  });

  it('should checked the radio after the focused one when the arrow down key pressed', async () => {
    const form = await fixture(html`
      <form>
        <vscode-radio-group>
          <vscode-radio name="radio-test" tabindex="0" id="rb1"></vscode-radio>
          <vscode-radio name="radio-test" tabindex="-1" id="rb2"></vscode-radio>
        </vscode-radio-group>
      </form>
    `);
    const rb1 = form.querySelector<VscodeRadio>('#rb1')!;
    const rb2 = form.querySelector<VscodeRadio>('#rb2')!;

    rb1.focus();
    await rb1.updateComplete;

    await sendKeys({
      down: 'ArrowDown',
    });

    expect(rb2.checked).to.be.true;
  });

  it('when a radio button is clicked it should be checked and the previous checked button should be unchecked', async () => {
    const form = await fixture(html`
      <form>
        <vscode-radio-group>
          <vscode-radio name="radio-test" id="rb1" checked></vscode-radio>
          <vscode-radio name="radio-test" id="rb2"></vscode-radio>
        </vscode-radio-group>
      </form>
    `);
    const rb1 = form.querySelector<VscodeRadio>('#rb1')!;
    const rb2 = form.querySelector<VscodeRadio>('#rb2')!;

    rb2.click();
    await rb2.updateComplete;

    expect(rb1.checked).to.be.false;
    expect(rb2.checked).to.be.true;
  });
});
