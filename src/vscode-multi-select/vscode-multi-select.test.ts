import {VscodeMultiSelect} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';
import sinon from 'sinon';
import '../vscode-option/index.js';

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
      <div class="multiselect select-face">
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
});
