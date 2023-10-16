import {VscodeCheckbox} from '../vscode-checkbox/index.js';
import {expect, fixture, html} from '@open-wc/testing';

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
});
