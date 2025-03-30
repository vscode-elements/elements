import {VscodeMultiSelect} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';
import sinon from 'sinon';
import '../vscode-option/index.js';
import {clickOnElement, moveMouseOnElement} from '../includes/test-helpers.js';
import {VscodeOption} from '../vscode-option/index.js';

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

    expect(el).shadowDom.to.equal(
      `
      <slot class="main-slot"></slot>
      <div class="multiselect select-face face">
        <span class="select-face-badge">
          1 item selected
        </span>
        <span class="icon">
        </span>
      </div>
    `,
      {ignoreAttributes: ['tabindex']}
    );
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

  it('when an option is clicked a custom event should be dispatched', async () => {
    const el = (await fixture(html`
      <vscode-multi-select>
        <vscode-option value="1">One</vscode-option>
        <vscode-option value="2">Two</vscode-option>
        <vscode-option value="3">Three</vscode-option>
      </vscode-multi-select>
    `)) as VscodeMultiSelect;
    const changeHandler = sinon.spy();
    el.addEventListener('vsc-change', changeHandler);

    const selectFace =
      el.shadowRoot?.querySelector<HTMLDivElement>('.select-face');
    selectFace!.click();
    await el.updateComplete;

    const firstOption =
      el.shadowRoot?.querySelectorAll<HTMLLIElement>('.option')[0];
    firstOption!.click();
    await el.updateComplete;

    const dispatchedEvent = changeHandler.args[0][0] as CustomEvent;

    expect(dispatchedEvent.type).to.eq('vsc-change');
    expect(dispatchedEvent.detail).to.eql({
      selectedIndexes: [0],
      value: ['1'],
    });
  });

  it('dropdown should be hidden after the OK button is clicked', async () => {
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
    const dropdownVisibleBefore = !!el.shadowRoot?.querySelector('.dropdown');

    const button =
      el.shadowRoot?.querySelector<HTMLButtonElement>('.button-accept');
    button!.click();
    await el.updateComplete;

    button?.click();
    await el.updateComplete;

    const dropdownVisibleAfter = !!el.shadowRoot?.querySelector('.dropdown');

    expect(dropdownVisibleBefore).to.eq(true);
    expect(dropdownVisibleAfter).to.eq(false);
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

  it('should "select all" and "deselect all" work properly', async () => {
    const el = await fixture<VscodeMultiSelect>(
      html`<vscode-multi-select>
        <vscode-option value="1">One</vscode-option>
        <vscode-option value="2">Two</vscode-option>
        <vscode-option value="3">Three</vscode-option>
      </vscode-multi-select>`
    );

    el.shadowRoot?.querySelector<HTMLDivElement>('.select-face')!.click();
    await el.updateComplete;

    const btSelectAll =
      el.shadowRoot?.querySelector<HTMLButtonElement>('#select-all');
    const btSelectNone =
      el.shadowRoot?.querySelector<HTMLButtonElement>('#select-none');
    btSelectAll!.click();
    await el.updateComplete;

    let caption =
      el.shadowRoot?.querySelector<HTMLDivElement>(
        '.select-face-badge'
      )!.innerText;

    expect(caption).to.eq('3 ITEMS SELECTED');

    btSelectNone!.click();
    await el.updateComplete;

    caption =
      el.shadowRoot?.querySelector<HTMLDivElement>(
        '.select-face-badge'
      )!.innerText;

    expect(caption).to.eq('NO ITEMS SELECTED');
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
    el.value = 'dolor';
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

  it('selects multiple options with keyboard');
  it('selectedIndexes sync with values');
});
