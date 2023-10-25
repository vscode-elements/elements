import '../vscode-radio/index.js';
import {VscodeRadio} from '../vscode-radio/index.js';
import '../vscode-radio-group/index.js';
import {VscodeRadioGroup} from '../vscode-radio-group/index.js';
import {aTimeout, expect, fixture, html} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
import sinon from 'sinon';

const createSampleForm = () => {
  const form = document.createElement('form');
  form.id = 'sample-form';
  const group = document.createElement(
    'vscode-radio-group'
  ) as VscodeRadioGroup;
  const rb1 = document.createElement('vscode-radio') as VscodeRadio;
  rb1.name = 'test';
  rb1.value = '1';
  rb1.label = 'One';
  const rb2 = document.createElement('vscode-radio') as VscodeRadio;
  rb2.name = 'test';
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

  return {form, group, rb1, rb2, rb3};
};

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

  it('form property should point to the associated form', () => {
    const {form, rb1} = createSampleForm();

    document.body.appendChild(form);

    expect(rb1.form).to.eq(form);

    form.remove();
  });

  it('type should be "radio"', () => {
    const el = document.createElement('vscode-radio');

    expect(el.type).to.eq('radio');
  });

  it('should return the validity object', () => {
    const el = document.createElement('vscode-radio');

    expect(el.validity).to.instanceOf(ValidityState);
  });

  it('should return the validation message', async () => {
    const {form, rb1} = createSampleForm();
    document.body.appendChild(form);
    rb1.required = true;

    await aTimeout(0);

    expect(rb1.validationMessage).to.not.empty;
    expect(rb1.validationMessage).to.eq('Please select one of these options.');

    form.remove();
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
    const {form, rb2} = createSampleForm();
    rb2.autofocus = true;

    document.body.appendChild(form);
    await aTimeout(0);

    const input = rb2.shadowRoot?.querySelector('input');
    expect(input?.hasAttribute('autofocus')).to.be.true;

    form.remove();
  });

  it('should show check icon when it is checked', async () => {
    const el = await fixture<VscodeRadio>(
      html`<vscode-radio checked></vscode-radio>`
    );

    expect(el.shadowRoot?.querySelector('.icon.checked')).to.be.ok;
  });

  // FIXME
  xit('focused property should be true when it is focused', async () => {
    const el = document.createElement('vscode-radio') as VscodeRadio;
    el.tabIndex = 0;

    document.body.appendChild(el);
    await aTimeout(0);

    el.focus();
    await aTimeout(0);

    expect(el.focused).to.be.true;
    el.remove();
  });

  it('should not be focusable when it is disabled', async () => {
    const el = await fixture<VscodeRadio>(
      html`<vscode-radio disabled></vscode-radio>`
    );

    expect(el.tabIndex).to.eq(-1);
  });

  it('should be invalid if one of the radio button is required in the group and none of them is checked', async () => {
    const {form, rb1, rb2, rb3} = createSampleForm();

    rb2.required = true;
    document.body.appendChild(form);

    await aTimeout(0);

    expect(rb1.checkValidity()).to.be.false;
    expect(rb2.checkValidity()).to.be.false;
    expect(rb3.checkValidity()).to.be.false;

    form.remove();
  });

  it('should be valid if one or more of the radio buttons is required in the group and one of them is checked', async () => {
    const {form, rb1, rb2, rb3} = createSampleForm();

    rb2.required = true;
    rb1.checked = true;
    document.body.appendChild(form);
    await aTimeout(0);

    expect(rb1.checkValidity()).to.be.true;
    expect(rb2.checkValidity()).to.be.true;
    expect(rb3.checkValidity()).to.be.true;

    form.remove();
  });

  it('arrow down key should check the next radio', async () => {
    const {form, rb1, rb2, rb3} = createSampleForm();

    document.body.appendChild(form);
    await aTimeout(0);

    expect(rb1.checked).to.be.false;

    rb1.focus();
    await aTimeout(0);

    await sendKeys({down: 'ArrowDown'});
    await aTimeout(0);

    expect(rb1.checked).to.be.false;
    expect(rb2.checked).to.be.true;
    expect(rb3.checked).to.be.false;
    expect(rb1.tabIndex).to.eq(-1);
    expect(rb2.tabIndex).to.eq(0);
    expect(rb3.tabIndex).to.eq(-1);

    await sendKeys({down: 'ArrowDown'});
    await aTimeout(0);

    expect(rb1.checked).to.be.false;
    expect(rb2.checked).to.be.false;
    expect(rb3.checked).to.be.true;
    expect(rb1.tabIndex).to.eq(-1);
    expect(rb2.tabIndex).to.eq(-1);
    expect(rb3.tabIndex).to.eq(0);

    await sendKeys({down: 'ArrowDown'});
    expect(rb1.checked).to.be.true;
    expect(rb2.checked).to.be.false;
    expect(rb3.checked).to.be.false;
    expect(rb1.tabIndex).to.eq(0);
    expect(rb2.tabIndex).to.eq(-1);
    expect(rb3.tabIndex).to.eq(-1);

    form.remove();
  });

  it('arrow up key should check the prev radio', async () => {
    const {form, rb1, rb2, rb3} = createSampleForm();

    document.body.appendChild(form);
    await aTimeout(0);

    expect(rb1.checked).to.be.false;

    rb1.focus();
    await rb1.updateComplete;

    await sendKeys({down: 'ArrowUp'});
    expect(rb1.checked).to.be.false;
    expect(rb2.checked).to.be.false;
    expect(rb3.checked).to.be.true;
    expect(rb1.tabIndex).to.eq(-1);
    expect(rb2.tabIndex).to.eq(-1);
    expect(rb3.tabIndex).to.eq(0);

    await sendKeys({down: 'ArrowUp'});
    expect(rb1.checked).to.be.false;
    expect(rb2.checked).to.be.true;
    expect(rb3.checked).to.be.false;
    expect(rb1.tabIndex).to.eq(-1);
    expect(rb2.tabIndex).to.eq(0);
    expect(rb3.tabIndex).to.eq(-1);

    await sendKeys({down: 'ArrowUp'});
    expect(rb1.checked).to.be.true;
    expect(rb2.checked).to.be.false;
    expect(rb3.checked).to.be.false;
    expect(rb1.tabIndex).to.eq(0);
    expect(rb2.tabIndex).to.eq(-1);
    expect(rb3.tabIndex).to.eq(-1);

    await sendKeys({down: 'ArrowUp'});
    expect(rb1.checked).to.be.false;
    expect(rb2.checked).to.be.false;
    expect(rb3.checked).to.be.true;
    expect(rb1.tabIndex).to.eq(-1);
    expect(rb2.tabIndex).to.eq(-1);
    expect(rb3.tabIndex).to.eq(0);

    form.remove();
  });

  it('should checked the radio before the focused one when the arrow up key pressed', async () => {
    const {form, rb1, rb2} = createSampleForm();
    document.body.appendChild(form);

    await aTimeout(1);

    rb1.tabIndex = -1;
    rb2.tabIndex = 0;
    rb2.focus();

    await rb2.updateComplete;

    await sendKeys({
      down: 'ArrowUp',
    });
    await aTimeout(0);

    expect(rb1.checked).to.be.true;
    form.remove();
  });

  it('should checked the radio after the focused one when the arrow down key pressed', async () => {
    const {form, rb1, rb2, rb3} = createSampleForm();

    document.body.appendChild(form);
    await aTimeout(0);

    rb1.tabIndex = -1;
    rb3.tabIndex = -1;
    rb2.tabIndex = 0;
    rb2.focus();
    await aTimeout(0);

    await sendKeys({
      down: 'ArrowDown',
    });
    await aTimeout(0);

    expect(rb3.checked).to.be.true;
    form.remove();
  });

  it('when a radio button is clicked it should be checked and the previous checked button should be unchecked', async () => {
    const {form, rb3, rb1} = createSampleForm();
    const spy = sinon.spy();
    rb1.checked = true;

    document.body.appendChild(form);
    await aTimeout(0);

    rb3.addEventListener('vsc-change', spy);
    rb3.click();
    await rb3.updateComplete;

    expect(rb1.checked).to.be.false;
    expect(rb3.checked).to.be.true;
    expect(spy).to.have.been.calledWithMatch({
      detail: {value: '3', label: 'Three', checked: true},
    });

    form.remove();
  });
});
