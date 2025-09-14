/* eslint-disable @typescript-eslint/no-unused-expressions */
import {expect, fixture, html} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
import sinon from 'sinon';
import '../vscode-option/index.js';
import {clickOnElement, moveMouseOnElement} from '../includes/test-helpers.js';
import {VscodeOption} from '../vscode-option/index.js';
import {VscodeMultiSelect} from './index.js';

describe('vscode-multi-select', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-multi-select');
    expect(el).to.instanceOf(VscodeMultiSelect);
  });

  it('should display selected value', async () => {
    const el = (await fixture(html`
      <vscode-multi-select>
        <vscode-option>Lorem</vscode-option>
        <vscode-option selected>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-multi-select>
    `)) as VscodeMultiSelect;

    const badge = el.shadowRoot?.querySelector('.select-face-badge');

    expect(badge).lightDom.to.eq('1 Selected');
    expect(el.selectedIndexes).to.eql([1]);
    expect(el.value).to.eql(['Ipsum']);
  });

  it('selectedIndexes should be set', async () => {
    const el = (await fixture(html`
      <vscode-multi-select>
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-multi-select>
    `)) as VscodeMultiSelect;

    el.selectedIndexes = [0, 1];

    expect(el.selectedIndexes).to.eql([0, 1]);
  });

  it('values should be set', async () => {
    const el = (await fixture(html`
      <vscode-multi-select>
        <vscode-option value="1">One</vscode-option>
        <vscode-option value="2">Two</vscode-option>
        <vscode-option value="3">Three</vscode-option>
      </vscode-multi-select>
    `)) as VscodeMultiSelect;

    el.value = ['2', '3'];

    const selectFace =
      el.shadowRoot?.querySelector<HTMLDivElement>('.select-face');
    selectFace!.click();

    await el.updateComplete;

    const checkboxes = el.shadowRoot?.querySelectorAll('li .checkbox-icon');

    expect(el.value).to.eql(['2', '3']);
    expect(el.selectedIndexes).to.eql([1, 2]);
    expect(checkboxes?.item(0).classList.contains('checked')).to.eq(false);
    expect(checkboxes?.item(1).classList.contains('checked')).to.eq(true);
    expect(checkboxes?.item(2).classList.contains('checked')).to.eq(true);
  });

  it('when an option is clicked the selectedIndex and the value should be set', async () => {
    const el = (await fixture(html`
      <vscode-multi-select>
        <vscode-option value="1">One</vscode-option>
        <vscode-option value="2">Two</vscode-option>
        <vscode-option value="3">Three</vscode-option>
      </vscode-multi-select>
    `)) as VscodeMultiSelect;

    const selectFace =
      el.shadowRoot?.querySelector<HTMLDivElement>('.select-face');
    selectFace!.click();
    await el.updateComplete;

    const firstOption =
      el.shadowRoot?.querySelectorAll<HTMLLIElement>('.option')[0];
    firstOption!.click();
    await el.updateComplete;

    expect(el.value).to.deep.equal(['1']);
    expect(el.selectedIndexes).to.deep.equal([0]);
  });

  it('should apply combobox mode', async () => {
    const el = await fixture(
      html`<vscode-multi-select combobox>
        <vscode-option value="1">One</vscode-option>
        <vscode-option value="2">Two</vscode-option>
        <vscode-option value="3">Three</vscode-option>
      </vscode-multi-select>`
    );

    const comboboxFace = el.shadowRoot?.querySelector('.combobox-face');

    expect(comboboxFace).to.be.ok;
  });

  it('selects all options', async () => {
    const el = await fixture<VscodeMultiSelect>(
      html`<vscode-multi-select>
        <vscode-option value="1">One</vscode-option>
        <vscode-option value="2">Two</vscode-option>
        <vscode-option value="3">Three</vscode-option>
      </vscode-multi-select>`
    );

    el.selectAll();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.select-face-badge')).lightDom.to.eq(
      '3 Selected'
    );
  });

  it('de-selects all options', async () => {
    const el = await fixture<VscodeMultiSelect>(
      html`<vscode-multi-select>
        <vscode-option value="1" selected>One</vscode-option>
        <vscode-option value="2" selected>Two</vscode-option>
        <vscode-option value="3" selected>Three</vscode-option>
      </vscode-multi-select>`
    );

    expect(el.shadowRoot?.querySelector('.select-face-badge')).lightDom.to.eq(
      '3 Selected'
    );

    el.selectNone();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.select-face-badge')).lightDom.to.eq(
      '0 Selected'
    );
  });

  it('should be unfocusable when it is disabled', () => {
    const el = document.createElement('vscode-multi-select');
    el.tabIndex = 2;
    el.disabled = true;

    expect(el.tabIndex).to.eq(-1);
  });

  it('should aria-disabled attribute applied when it is disabled', () => {
    const el = document.createElement('vscode-multi-select');
    el.disabled = true;

    expect(el.getAttribute('aria-disabled')).to.eq('true');
  });

  it('should original tabindex restored when enabled again', () => {
    const el = document.createElement('vscode-multi-select');
    el.tabIndex = 2;
    el.disabled = true;

    expect(el.tabIndex).to.eq(-1);

    el.disabled = false;

    expect(el.tabIndex).to.eq(2);
  });

  it('should selectedIndexes reflect the selected options when value set through property', async () => {
    const el = await fixture<VscodeMultiSelect>(
      html`<vscode-multi-select>
        <vscode-option value="A">A</vscode-option>
        <vscode-option value="B">B</vscode-option>
        <vscode-option value="C">C</vscode-option>
      </vscode-multi-select>`
    );

    el.value = ['A', 'B', 'C'];

    expect(el.selectedIndexes).to.eql([0, 1, 2]);
  });

  it('Set the "value" property before adding selectable options', async () => {
    const el = await fixture<VscodeMultiSelect>(
      html`<vscode-multi-select></vscode-multi-select>`
    );
    el.value = ['dolor'];
    const op1 = document.createElement('vscode-option');
    const op2 = document.createElement('vscode-option');
    const op3 = document.createElement('vscode-option');
    op1.innerHTML = 'lorem';
    op2.innerHTML = 'ipsum';
    op3.innerHTML = 'dolor';

    el.appendChild(op1);
    el.appendChild(op2);
    el.appendChild(op3);

    await el.updateComplete;

    expect(el.value).to.eql(['dolor']);
  });

  it('open by default', async () => {
    const sl = await fixture(
      html`<vscode-multi-select open>
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-multi-select>`
    );

    expect(sl.shadowRoot?.querySelector('ul.options')).to.be.ok;
  });

  it('shows selected option when opened by default', async () => {
    const sl = await fixture(
      html`<vscode-multi-select open>
        <vscode-option>Lorem</vscode-option>
        <vscode-option selected>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-multi-select>`
    );

    const op = sl.shadowRoot?.querySelector<HTMLLIElement>(
      'ul.options li:nth-child(2)'
    );

    expect(op).lightDom.to.eq(`
      <span class="checkbox-icon checked"></span>
      <span class="option-label">Ipsum</span>
    `);
    expect(op?.classList.contains('selected')).to.be.true;
  });

  it('changes the description of an option in an existing select', async () => {
    const el = await fixture<VscodeMultiSelect>(html`
      <vscode-multi-select>
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-multi-select>
    `);
    const secondOption = el.querySelectorAll<VscodeOption>('vscode-option')[1];

    secondOption.description = 'Test description';
    await el.updateComplete;

    await clickOnElement(el);
    await el.updateComplete;

    await moveMouseOnElement(el.shadowRoot!.querySelectorAll('li')[1]);
    await el.updateComplete;

    const desc = el.shadowRoot!.querySelector<HTMLDivElement>('.description');

    expect(desc).lightDom.to.eq('Test description');
  });

  it('changes the label of an option in an existing select', async () => {
    const el = await fixture<VscodeMultiSelect>(html`
      <vscode-multi-select>
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-multi-select>
    `);
    const secondOption = el.querySelectorAll<VscodeOption>('vscode-option')[1];

    secondOption.innerHTML = 'Test label';
    await el.updateComplete;

    await clickOnElement(el);
    await el.updateComplete;

    const li = el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[1];
    const label = li.querySelector('.option-label');

    expect(label).lightDom.to.eq('Test label');
  });

  it('changes the disabled state of an option in an existing select', async () => {
    const el = await fixture<VscodeMultiSelect>(html`
      <vscode-multi-select>
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-multi-select>
    `);
    const secondOption = el.querySelectorAll<VscodeOption>('vscode-option')[1];

    secondOption.disabled = true;
    await el.updateComplete;

    await clickOnElement(el);
    await el.updateComplete;

    const li = el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[1];

    expect(li.classList.contains('disabled')).to.be.true;
  });

  it('checks validity when required property is changed', async () => {
    const el = await fixture<VscodeMultiSelect>(
      html`<vscode-multi-select combobox>
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
      </vscode-multi-select>`
    );
    const isValidBefore = el.checkValidity();

    el.setAttribute('required', '');
    await el.updateComplete;

    const isValidAfter = el.checkValidity();

    expect(isValidBefore).to.be.true;
    expect(isValidAfter).to.be.false;
  });

  it('creates and select suggested option', async () => {
    const el = await fixture<VscodeMultiSelect>(
      html`<vscode-multi-select combobox creatable
        ><vscode-option>Lorem</vscode-option></vscode-multi-select
      >`
    );
    const createOptionHandlerSpy = sinon.spy();
    el.addEventListener(
      'vsc-multi-select-create-option',
      createOptionHandlerSpy
    );
    const changeHandlerSpy = sinon.spy();
    el.addEventListener('change', changeHandlerSpy);

    el.focus();
    await el.updateComplete;
    await sendKeys({type: 'asdf'});
    await sendKeys({down: 'ArrowDown'});
    await sendKeys({down: 'Enter'});

    expect(createOptionHandlerSpy.getCalls()[0].args[0].detail.value).to.eq(
      'asdf'
    );
    expect(changeHandlerSpy.called).to.be.true;
    expect(el.value).to.eql(['asdf']);
  });

  it('selects multiple options with keyboard');
  it('selectedIndexes sync with values');
  it(
    'dispatch change event, set form value, manage required state (enter key press)'
  );
});
