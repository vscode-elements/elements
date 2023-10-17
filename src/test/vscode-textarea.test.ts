import sinon from 'sinon';
import {VscodeTextarea} from '../vscode-textarea/index.js';
import '../vscode-textarea';
import {sendKeys, sendMouse} from '@web/test-runner-commands';
import {expect, fixture, html, aTimeout} from '@open-wc/testing';

describe('vscode-textarea', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-textarea');
    expect(el).to.instanceOf(VscodeTextarea);
  });

  it('renders with default values', async () => {
    const el = await fixture(html`<vscode-textarea></vscode-textarea>`);

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should forward "autocomplete" attribute to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea autocomplete="on"></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        autocomplete="on"
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should forward "autofocus" attribute to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea autofocus></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        autofocus
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should forward "disabled" attribute to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea disabled></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        disabled
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should forward "maxlength" attribute to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea maxlength="100"></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        maxlength="100"
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should forward "minlength" attribute to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea minlength="100"></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        minlength="100"
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should forward "rows" attribute to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea rows="10"></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        rows="10"
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should forward "cols" attribute to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea cols="80"></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        cols="80"
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should forward "placeholder" attribute to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea placeholder="test"></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        placeholder="test"
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should forward "readonly" attribute to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea readonly></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        readonly
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should apply "resize" style to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea resize="both"></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        style="resize:both;"
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should forward "required" attribute to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea required></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        required
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('should forward "spellcheck" attribute to the inner textarea', async () => {
    const el = await fixture(
      html`<vscode-textarea spellcheck></vscode-textarea>`
    );

    expect(el).shadowDom.to.equal(`
      <div class="shadow"></div>
      <textarea
        spellcheck="true"
        aria-label=""
        id="textarea"
        spellcheck="false"
        style="resize:none;"
      ></textarea>
    `);
  });

  it('type property should be "textarea"', () => {
    const el = document.createElement('vscode-textarea');

    expect(el.type).to.eq('textarea');
  });

  it('should be participated in the form', async () => {
    const form = document.createElement('form');
    await fixture(
      html`<vscode-textarea name="test" value="Test value"></vscode-textarea>`,
      {parentNode: form}
    );

    const data = new FormData(form);
    const value = data.get('test');

    expect(value).to.eq('Test value');
  });

  it('should return the initial value', async () => {
    const el = await fixture<VscodeTextarea>(
      html`<vscode-textarea name="test" value="Test value"></vscode-textarea>`
    );

    expect(el.value).to.eq('Test value');
  });

  it('should return the form in which participated', () => {
    const form = document.createElement('form');
    const el = document.createElement('vscode-textarea');
    form.appendChild(el);

    expect(el.form).to.instanceOf(HTMLFormElement);
  });

  it('should return the validity object', () => {
    const el = document.createElement('vscode-textarea') as VscodeTextarea;

    expect(el.validity).to.instanceOf(ValidityState);
  });

  it('should return the validation message', async () => {
    const nativeTextarea = document.createElement('textarea');
    nativeTextarea.setAttribute('required', '');

    const form = document.createElement('form');
    const el = document.createElement('vscode-textarea');
    el.setAttribute('required', '');
    form.appendChild(el);
    document.body.appendChild(form);

    await el.updateComplete;

    expect(el.validationMessage).to.not.empty;
    expect(el.validationMessage).to.eq(nativeTextarea.validationMessage);
  });

  it('should willValidate property be true if the element is candidate for constraint validation', async () => {
    const el = await fixture<VscodeTextarea>(
      '<vscode-textarea></vscode-textarea>'
    );

    expect(el.willValidate).to.be.true;
  });

  it('should willValidate property be false if the element is not candidate for constraint validation', async () => {
    const el = await fixture<VscodeTextarea>(
      '<vscode-textarea disabled></vscode-textarea>'
    );

    expect(el.willValidate).to.be.false;
  });

  it('should check validity when checkValidity is called', async () => {
    const el = await fixture<VscodeTextarea>(
      '<vscode-textarea required></vscode-textarea>'
    );
    const fn = sinon.spy();
    el.addEventListener('invalid', fn);

    const result = el.checkValidity();

    expect(result).to.be.false;
    expect(fn.called).to.be.true;
  });

  it('reportValidity should be called', async () => {
    const el = await fixture<VscodeTextarea>(
      '<vscode-textarea required></vscode-textarea>'
    );
    const fn = sinon.spy();
    el.addEventListener('invalid', fn);

    const result = el.reportValidity();

    expect(result).to.be.false;
    expect(fn.called).to.be.true;
  });

  it('wrappedElement property should point to inner native textarea', async () => {
    const el = await fixture<VscodeTextarea>(
      '<vscode-textarea></vscode-textarea>'
    );

    expect(el.wrappedElement).to.instanceOf(HTMLTextAreaElement);
  });

  it('reset callback should restore the default value', async () => {
    const el = await fixture<VscodeTextarea>(
      '<vscode-textarea value="Test value" default-value="Default value"></vscode-textfield>'
    );
    const initialValue = el.value;

    el.formResetCallback();
    await el.updateComplete;

    expect(initialValue).to.eq('Test value');
    expect(el.value).to.eq('Default value');
  });

  it('restore callback should restore the previous state', async () => {
    const el = await fixture<VscodeTextarea>(
      '<vscode-textarea value="Test value"></vscode-textarea>'
    );
    const initialValue = el.value;

    el.formStateRestoreCallback('Restored value', 'restore');
    await el.updateComplete;

    expect(initialValue).to.eq('Test value');
    expect(el.value).to.eq('Restored value');
  });

  it('should be revalidated when "required" attribute is changed', async () => {
    const el = await fixture<VscodeTextarea>(
      '<vscode-textarea value=""></vscode-textarea>'
    );
    const initialValidity = el.checkValidity();

    el.required = true;
    await aTimeout(0);

    expect(initialValidity).to.be.true;
    expect(el.checkValidity()).to.be.false;
  });

  it('should be revalidated when "minlength" attribute is changed', async () => {
    const el = await fixture<VscodeTextarea>(
      '<vscode-textarea></vscode-textarea>'
    );
    const initialValidity = el.checkValidity();

    el.minLength = 100;
    el.focus();
    await sendKeys({
      down: 'a',
    });
    await aTimeout(100);

    expect(initialValidity).to.be.true;
    expect(el.checkValidity()).to.be.false;
  });

  it('"input" event should be dispatched when a text typed', async () => {
    const el = await fixture<VscodeTextarea>(
      '<vscode-textarea></vscode-textarea>'
    );
    const spy = sinon.spy();
    el.addEventListener('input', spy);

    el.focus();
    await sendKeys({
      press: 'a',
    });

    expect(spy.called).to.be.true;
    expect(spy.calledWithMatch({data: 'a'})).to.be.true;
  });

  it('"change" event should be dispatched when a text typed and the focus is lost', async () => {
    const el = await fixture<VscodeTextarea>(
      '<vscode-textarea></vscode-textarea>'
    );
    const spy = sinon.spy();
    el.addEventListener('change', spy);

    el.focus();
    await sendKeys({
      press: 'a',
    });
    await sendMouse({type: 'click', position: [1000, 1000]});

    expect(spy.called).to.be.true;
  });

  it('minlength alias should point to minLength property', () => {
    const el = document.createElement('vscode-textarea');
    el.minlength = 100;

    expect(el.minLength).to.eq(100);
  });

  it('maxlength alias should point to maxLength property', () => {
    const el = document.createElement('vscode-textarea');
    el.maxlength = 100;

    expect(el.maxLength).to.eq(100);
  });
});
