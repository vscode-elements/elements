import {VscodeCheckbox} from '../vscode-checkbox/index.js';
import {expect, fixture, html} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
import sinon from 'sinon';

describe('vscode-checkbox', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-checkbox');
    expect(el).to.instanceOf(VscodeCheckbox);
  });

  it('should type attribute return "checkbox"', () => {
    const el = document.createElement('vscode-checkbox');
    expect(el.type).to.eq('checkbox');
  });

  it('should be participated in the form', async () => {
    const form = document.createElement('form');
    await fixture(
      html`<vscode-checkbox
        name="test"
        value="Test value"
        checked
      ></vscode-checkbox>`,
      {parentNode: form}
    );

    const data = new FormData(form);
    const value = data.get('test');

    expect(value).to.eq('Test value');
  });

  it('should not be participated in the form when unchecked', async () => {
    const form = document.createElement('form');
    await fixture(
      html`<vscode-checkbox name="test" value="Test value"></vscode-checkbox>`,
      {parentNode: form}
    );

    const data = new FormData(form);
    const value = data.get('test');

    expect(value).to.be.null;
  });

  it('should set "on" as form value when value is not set', async () => {
    const form = document.createElement('form');
    await fixture(
      html`<vscode-checkbox name="test" checked></vscode-checkbox>`,
      {
        parentNode: form,
      }
    );

    const data = new FormData(form);
    const value = data.get('test');

    expect(value).to.eq('on');
  });

  it('should return the form in which participated', () => {
    const form = document.createElement('form');
    const el = document.createElement('vscode-checkbox') as VscodeCheckbox;
    form.appendChild(el);

    expect(el.form).to.instanceOf(HTMLFormElement);
  });

  it('should return the validity object', () => {
    const el = document.createElement('vscode-checkbox') as VscodeCheckbox;

    expect(el.validity).to.instanceOf(ValidityState);
  });

  it('should return the validation message', async () => {
    const form = document.createElement('form');
    const el = document.createElement('vscode-checkbox');
    el.setAttribute('required', '');
    form.appendChild(el);
    document.body.appendChild(form);

    await el.updateComplete;

    expect(el.validationMessage).to.not.empty;
    expect(el.validationMessage).to.eq(
      'Please check this box if you want to proceed.'
    );
  });

  it('should willValidate property be true if the element is candidate for constraint validation', async () => {
    const el = await fixture<VscodeCheckbox>(
      '<vscode-checkbox></vscode-checkbox>'
    );

    expect(el.willValidate).to.be.true;
  });

  it('should willValidate property be false if the element is not candidate for constraint validation', async () => {
    const el = await fixture<VscodeCheckbox>(
      '<vscode-checkbox disabled></vscode-checkbox>'
    );

    expect(el.willValidate).to.be.false;
  });

  it('should check validity when checkValidity is called', async () => {
    const el = await fixture<VscodeCheckbox>(
      '<vscode-checkbox required></vscode-checkbox>'
    );
    const fn = sinon.spy();
    el.addEventListener('invalid', fn);

    const result = el.checkValidity();

    expect(result).to.be.false;
    expect(fn.called).to.be.true;
  });

  it('reportValidity should be called', async () => {
    const el = await fixture<VscodeCheckbox>(
      '<vscode-checkbox required></vscode-checkbox>'
    );
    const fn = sinon.spy();
    el.addEventListener('invalid', fn);

    const result = el.reportValidity();

    expect(result).to.be.false;
    expect(fn.called).to.be.true;
  });

  it('the autofocus attribute should be passed', async () => {
    const el = await fixture<VscodeCheckbox>(
      html`<vscode-checkbox name="test" autofocus></vscode-checkbox>`
    );

    const input = el.shadowRoot?.querySelector('input');

    expect(input?.hasAttribute('autofocus')).to.be.true;
  });

  it('defaultChecked should be applied when the reset function of the parent form is called', async () => {
    const form = document.createElement('form');
    const el = await fixture<VscodeCheckbox>(
      html`<vscode-checkbox name="test" default-checked></vscode-checkbox>`,
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
    const el = await fixture<VscodeCheckbox>(
      '<vscode-checkbox value="test"></vscode-checkbox>'
    );
    const initialChecked = el.checked;

    el.formStateRestoreCallback('test', 'restore');
    await el.updateComplete;

    expect(initialChecked).to.be.false;
    expect(el.checked).to.be.true;
  });

  it('checked state should be applied', async () => {
    const el = await fixture<VscodeCheckbox>(
      html`<vscode-checkbox checked></vscode-checkbox>`
    );

    const input = el.shadowRoot?.querySelector('input');

    expect(input?.checked).to.be.true;
    expect(el.shadowRoot?.querySelector('.check-icon')).to.be.ok;
  });

  it('indeterminate state should be applied', async () => {
    const el = await fixture<VscodeCheckbox>(
      html`<vscode-checkbox indeterminate></vscode-checkbox>`
    );

    const icon = el.shadowRoot?.querySelector('.indeterminate-icon');

    expect(icon).to.be.ok;
  });

  it('should show only the indeterminate icon when indeterminate and checked at the same time', async () => {
    const el = await fixture<VscodeCheckbox>(
      html`<vscode-checkbox indeterminate checked></vscode-checkbox>`
    );

    const iconIndeterminate = el.shadowRoot?.querySelector(
      '.indeterminate-icon'
    );
    const iconCheck = el.shadowRoot?.querySelector('.check-icon');

    expect(iconIndeterminate).to.be.ok;
    expect(iconCheck).to.be.null;
  });

  it('should set label through slotted content', async () => {
    const el = await fixture<VscodeCheckbox>(
      html`<vscode-checkbox><b>Test</b> <i>Label</i></vscode-checkbox>`
    );

    expect(el.ariaLabel).to.eq('Test Label');
  });

  it('should toggle checked state when clicked', async () => {
    const el = await fixture<VscodeCheckbox>(
      html`<vscode-checkbox>Checkbox test</vscode-checkbox>`
    );

    const label = el.shadowRoot?.querySelector('label');
    label?.click();
    await el.updateComplete;

    expect(el.checked).to.be.true;
  });

  it('should not toggle checked state when clicked but it is disabled', async () => {
    const el = await fixture<VscodeCheckbox>(
      html`<vscode-checkbox disabled>Checkbox test</vscode-checkbox>`
    );

    const label = el.shadowRoot?.querySelector('label');
    label?.click();
    await el.updateComplete;

    expect(el.checked).to.be.false;
  });

  it('should toggle checked state when the space key is pressed', async () => {
    const el = await fixture<VscodeCheckbox>(
      html`<vscode-checkbox>Checkbox test</vscode-checkbox>`
    );

    el.focus();
    await sendKeys({
      down: ' ',
    });

    expect(el.checked).to.be.true;
  });

  it('should not toggle checked state when the space key is pressed but it is disabled', async () => {
    const el = await fixture<VscodeCheckbox>(
      html`<vscode-checkbox disabled>Checkbox test</vscode-checkbox>`
    );

    el.focus();
    await sendKeys({
      down: ' ',
    });

    expect(el.checked).to.be.false;
  });

  it('should submit the associated form when the "Enter" button is pressed', async () => {
    const form = document.createElement('form');
    const el = await fixture<VscodeCheckbox>(
      '<vscode-checkbox></vscode-checkbox>',
      {
        parentNode: form,
      }
    );
    const spy = sinon.spy((ev: SubmitEvent) => {
      ev.preventDefault();
    });
    form.addEventListener('submit', spy);

    el.focus();
    await sendKeys({
      down: 'Enter',
    });

    expect(spy.called).to.be.true;
  });

  it('should not submit the associated form when the "Enter" button is pressed but it is disabled', async () => {
    const form = document.createElement('form');
    const el = await fixture<VscodeCheckbox>(
      '<vscode-checkbox disabled></vscode-checkbox>',
      {
        parentNode: form,
      }
    );
    const spy = sinon.spy((ev: SubmitEvent) => {
      ev.preventDefault();
    });
    form.addEventListener('submit', spy);

    el.focus();
    await sendKeys({
      down: 'Enter',
    });

    expect(spy.called).to.be.false;
  });
});
