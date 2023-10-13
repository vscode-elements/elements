import {VscodeTextfield} from '../vscode-textfield/index.js';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-textfield', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-textfield');
    expect(el).to.instanceOf(VscodeTextfield);
  });

  it('renders with default values', async () => {
    const el = await fixture<VscodeTextfield>(
      html`<vscode-textfield></vscode-textfield>`
    );
    expect(el).shadowDom.to.equal(
      `
      <slot name="content-before"></slot>
      <input aria-label=""  id="input" type="text">
      <slot name="content-after"></slot>
      `
    );
  });

  it('when the type attribute is unknown, it should be set to text', async () => {
    const el = await fixture<VscodeTextfield>(
      html`<vscode-textfield></vscode-textfield>`
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    el.type = 'invalid';

    expect(el.type).to.eq('text');
  });

  it('should be participated in the form', async () => {
    const form = document.createElement('form');
    await fixture(
      html`<vscode-textfield
        name="test"
        value="Test value"
      ></vscode-textfield>`,
      {parentNode: form}
    );

    const data = new FormData(form);
    const value = data.get('test');

    expect(value).to.eq('Test value');
  });

  it('should return the initial value', async () => {
    const el = await fixture<VscodeTextfield>(
      html`<vscode-textfield name="test" value="Test value"></vscode-textfield>`
    );

    expect(el.value).to.eq('Test value');
  });

  it('should return the form in which participated', () => {
    const form = document.createElement('form');
    const el = document.createElement('vscode-textfield');
    form.appendChild(el);

    expect(el.form).to.instanceOf(HTMLFormElement);
  });

  it('should return the validity object', () => {
    const el = document.createElement('vscode-textfield') as VscodeTextfield;

    expect(el.validity).to.instanceOf(ValidityState);
  });

  it('should return the validation message', async () => {
    const nativeInput = document.createElement('input');
    nativeInput.setAttribute('required', '');

    const form = document.createElement('form');
    const el = document.createElement('vscode-textfield');
    el.setAttribute('required', '');
    form.appendChild(el);
    document.body.appendChild(form);

    await el.updateComplete;

    expect(el.validationMessage).to.not.empty;
    expect(el.validationMessage).to.eq(nativeInput.validationMessage);
  });
});
