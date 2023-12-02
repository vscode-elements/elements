import {VscSingleSelect} from './index.js';
import {aTimeout, expect, fixture, html} from '@open-wc/testing';
import sinon from 'sinon';
import '../option/index.js';

describe('vsc-single-select', () => {
  it('is defined', () => {
    const el = document.createElement('vsc-single-select');
    expect(el).to.instanceOf(VscSingleSelect);
  });

  describe('select mode', () => {
    it('should display selected value', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
          <vsc-option selected>Ipsum</vsc-option>
          <vsc-option>Dolor</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      expect(el).shadowDom.to.equal(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            Ipsum
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.selectedIndex).to.eq(1);
      expect(el.value).to.eq('Ipsum');
    });

    it('should return the validity object', () => {
      const el = document.createElement(
        'vsc-single-select'
      ) as VscSingleSelect;

      expect(el.validity).to.instanceOf(ValidityState);
    });

    it('should return the validation message', async () => {
      const el = document.createElement(
        'vsc-single-select'
      ) as VscSingleSelect;
      el.required = true;
      document.body.appendChild(el);

      await aTimeout(0);

      expect(el.validationMessage).to.eql('Please select an item in the list.');
    });

    it('should display selected value when value prop is changed', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
          <vsc-option>Ipsum</vsc-option>
          <vsc-option>Dolor</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      el.value = 'Ipsum';
      await el.updateComplete;

      expect(el).shadowDom.to.equal(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            Ipsum
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.value).to.eq('Ipsum');
      expect(el.selectedIndex).to.eq(1);
    });

    it('select face should be empty when the value is invalid', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
          <vsc-option>Ipsum</vsc-option>
          <vsc-option>Dolor</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      el.value = 'trololo';
      await el.updateComplete;

      expect(el).shadowDom.to.equal(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            <span class="empty-label-placeholder"></span>
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.value).to.eq('');
      expect(el.selectedIndex).to.eq(-1);
    });

    it('should display selected value when selectedIndex prop is changed', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
          <vsc-option>Ipsum</vsc-option>
          <vsc-option>Dolor</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      el.selectedIndex = 1;
      await el.updateComplete;

      expect(el).shadowDom.to.equal(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            Ipsum
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.value).to.eq('Ipsum');
      expect(el.selectedIndex).to.eq(1);
    });

    it('select face should be empty when the selectedIndex prop is invalid', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
          <vsc-option>Ipsum</vsc-option>
          <vsc-option>Dolor</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      el.selectedIndex = 999;
      await el.updateComplete;

      expect(el).shadowDom.to.equal(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            <span class="empty-label-placeholder"></span>
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.value).to.eq('');
      expect(el.selectedIndex).to.eq(999);
    });

    it('should display selected value when an option is clicked', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
          <vsc-option>Ipsum</vsc-option>
          <vsc-option>Dolor</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      const spy = sinon.spy();
      el.addEventListener('change', spy)

      const face = el.shadowRoot?.querySelector(
        '.select-face'
      ) as HTMLDivElement;

      face.click();
      await el.updateComplete;

      const secondOption = el.shadowRoot?.querySelector(
        '.options li:nth-of-type(2)'
      ) as HTMLLIElement;
      secondOption.click();
      await el.updateComplete;

      expect(face).lightDom.to.eq(`
        <span class="text">
          Ipsum
        </span>
        <span class="icon">
        </span>
      `);
      expect(el.value).to.eq('Ipsum');
      expect(el.selectedIndex).to.eq(1);
      expect(spy).to.be.called;
    });

    it('no item selected', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
          <vsc-option>Ipsum</vsc-option>
          <vsc-option>Dolor</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      expect(el).shadowDom.to.equal(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            Lorem
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.value).to.eq('Lorem');
      expect(el.selectedIndex).to.eq(0);
    });

    it('the value should be changed when the arrow down key pressed while the dropdown is closed', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option selected>Lorem</vsc-option>
          <vsc-option>Ipsum</vsc-option>
          <vsc-option>Dolor</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      const spy = sinon.spy(el, 'dispatchEvent');

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;

      expect(el).shadowDom.to.eq(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            Ipsum
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.value).to.eq('Ipsum');
      expect(el.selectedIndex).to.eq(1);

      const dispatchedEvent = spy.args[1][0] as CustomEvent;

      expect(dispatchedEvent.type).to.eq('vsc-change');
      expect(dispatchedEvent.detail).to.eql({
        selectedIndex: 1,
        value: 'Ipsum',
      });
    });

    it('the value should be changed when the arrow up key pressed while the dropdown is closed', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
          <vsc-option>Ipsum</vsc-option>
          <vsc-option selected>Dolor</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      const spy = sinon.spy(el, 'dispatchEvent');

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowUp'}));
      await el.updateComplete;

      expect(el).shadowDom.to.eq(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            Ipsum
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.value).to.eq('Ipsum');
      expect(el.selectedIndex).to.eq(1);

      const dispatchedEvent = spy.args[1][0] as CustomEvent;

      expect(dispatchedEvent.type).to.eq('vsc-change');
      expect(dispatchedEvent.detail).to.eql({
        selectedIndex: 1,
        value: 'Ipsum',
      });
    });

    it('dropdown should be opened when "Space" key pressed', async () => {
      const markupOpen = `
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            Lorem
          </span>
          <span class="icon">
          </span>
        </div>
        <div class="dropdown">
          <ul class="options">
            <li
              class="active option"
              data-filtered-index="0"
              data-index="0"
            >
              Lorem
            </li>
          </ul>
        </div>
      `;

      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      el.dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));
      await el.updateComplete;

      expect(el).shadowDom.to.eq(markupOpen);
      expect(el.getAttribute('aria-expanded')).to.eq('true');

      el.dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));
      await el.updateComplete;

      expect(el).shadowDom.to.eq(markupOpen);
      expect(el.getAttribute('aria-expanded')).to.eq('true');
    });

    it('dropdown should be opened when "Enter" key pressed', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
      await el.updateComplete;

      expect(el).shadowDom.to.eq(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            Lorem
          </span>
          <span class="icon">
          </span>
        </div>
        <div class="dropdown">
          <ul class="options">
            <li
              class="active option"
              data-filtered-index="0"
              data-index="0"
            >
              Lorem
            </li>
          </ul>
        </div>
      `);
      expect(el.getAttribute('aria-expanded')).to.eq('true');

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
      await el.updateComplete;

      expect(el).shadowDom.to.eq(`
        <slot class="main-slot">
        </slot>
        <div class="select-face">
          <span class="text">
            Lorem
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.getAttribute('aria-expanded')).to.eq('false');
    });

    it('dropdown should be closed and selected option should be changed when "Enter" key pressed', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
          <vsc-option>Ipsum</vsc-option>
          <vsc-option>Dolor</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      const spy = sinon.spy(el, 'dispatchEvent');

      el.dispatchEvent(new MouseEvent('click'));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;

      const changeEvent = spy.lastCall.args[0] as CustomEvent;

      expect(el).shadowDom.to.eq(`
        <slot class="main-slot">
        </slot>
        <div class="select-face">
          <span class="text">
            Dolor
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.value).to.eq('Dolor');
      expect(el.selectedIndex).to.eq(2);
      expect(changeEvent.type).to.eq('change');
    });

    it('dropdown should be closed when ESC key pressed', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Lorem</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      el.dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));
      await el.updateComplete;

      expect(el).shadowDom.to.eq(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            Lorem
          </span>
          <span class="icon">
          </span>
        </div>
        <div class="dropdown">
          <ul class="options">
            <li
              class="active option"
              data-filtered-index="0"
              data-index="0"
            >
              Lorem
            </li>
          </ul>
        </div>
      `);
      expect(el.getAttribute('aria-expanded')).to.eq('true');

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
      await el.updateComplete;

      expect(el).shadowDom.to.eq(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            Lorem
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.getAttribute('aria-expanded')).be.eq('false');
    });

    it('dropdown should be scrolled to the selected option', async () => {
      const el = (await fixture(html`
        <vsc-single-select>
          <vsc-option>Afghanistan</vsc-option>
          <vsc-option>Albania</vsc-option>
          <vsc-option>Algeria</vsc-option>
          <vsc-option>Andorra</vsc-option>
          <vsc-option>Angola</vsc-option>
          <vsc-option>Antigua and Barbuda</vsc-option>
          <vsc-option>Argentina</vsc-option>
          <vsc-option>Armenia</vsc-option>
          <vsc-option>Australia</vsc-option>
          <vsc-option>Austria</vsc-option>
          <vsc-option selected>Azerbaijan</vsc-option>
          <vsc-option>Bahamas</vsc-option>
          <vsc-option>Bahrain</vsc-option>
          <vsc-option>Bangladesh</vsc-option>
          <vsc-option>Barbados</vsc-option>
          <vsc-option>Belarus</vsc-option>
          <vsc-option>Belgium</vsc-option>
          <vsc-option>Belize</vsc-option>
          <vsc-option>Benin</vsc-option>
          <vsc-option>Bhutan</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;
      await el.updateComplete;

      const face = el.shadowRoot?.querySelector('.select-face');
      face?.dispatchEvent(new MouseEvent('click'));
      await el.updateComplete;

      const options = el.shadowRoot?.querySelector('.options');
      expect(options?.scrollTop).to.eq(220);
    });
  });

  describe('combobox mode', () => {
    it('default state', async () => {
      const el = (await fixture(html`
        <vsc-single-select combobox></vsc-single-select>
      `)) as VscSingleSelect;

      expect(el).shadowDom.to.eq(`
        <slot class="main-slot">
        </slot>
        <div class="combobox-face">
          <input
            class="combobox-input"
            spellcheck="false"
            type="text"
          >
          <button
            class="combobox-button"
            type="button"
          >
            <span class="icon">
            </span>
          </button>
        </div>
      `);
    });

    it('filtered list', async () => {
      const el = (await fixture(html`
        <vsc-single-select combobox>
          <vsc-option>Antigua and Barbuda</vsc-option>
          <vsc-option>Argentina</vsc-option>
          <vsc-option>Armenia</vsc-option>
          <vsc-option>Australia</vsc-option>
          <vsc-option>Austria</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;
      await el.updateComplete;

      const input = el.shadowRoot?.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;
      input.value = 'au';
      input.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      expect(el).shadowDom.to.eq(`
        <slot class="main-slot">
        </slot>
        <div class="combobox-face">
          <input
            class="combobox-input"
            spellcheck="false"
            type="text"
          >
          <button
            class="combobox-button"
            type="button"
          >
            <span class="icon">
            </span>
          </button>
        </div>
        <div class="dropdown">
          <ul class="options">
            <li
              class="option"
              data-filtered-index="0"
              data-index="0"
            >
              Antigua and Barbuda
            </li>
            <li
              class="option"
              data-filtered-index="1"
              data-index="3"
            >
              Australia
            </li>
            <li
              class="option"
              data-filtered-index="2"
              data-index="4"
            >
              Austria
            </li>
          </ul>
        </div>
      `);
    });

    it('highlight element when the arrow down key pressed', async () => {
      const el = (await fixture(html`
        <vsc-single-select combobox>
          <vsc-option>Antigua and Barbuda</vsc-option>
          <vsc-option>Argentina</vsc-option>
          <vsc-option>Armenia</vsc-option>
          <vsc-option>Australia</vsc-option>
          <vsc-option>Austria</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;
      await el.updateComplete;

      const input = el.shadowRoot?.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;
      input.value = 'au';
      input.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;

      const optionsElement = el.shadowRoot?.querySelector('.options');

      expect(optionsElement).lightDom.to.eq(`
        <li
          class="option"
          data-filtered-index="0"
          data-index="0"
        >
          Antigua and Barbuda
        </li>
        <li
          class="active option"
          data-filtered-index="1"
          data-index="3"
        >
          Australia
        </li>
        <li
          class="option"
          data-filtered-index="2"
          data-index="4"
        >
          Austria
        </li>
      `);
    });

    it('highlight element when the arrow down key pressed, then select it', async () => {
      const el = (await fixture(html`
        <vsc-single-select combobox>
          <vsc-option>Antigua and Barbuda</vsc-option>
          <vsc-option>Argentina</vsc-option>
          <vsc-option>Armenia</vsc-option>
          <vsc-option>Australia</vsc-option>
          <vsc-option>Austria</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;
      await el.updateComplete;

      const spy = sinon.spy(el, 'dispatchEvent');

      const input = el.shadowRoot?.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;
      input.value = 'au';
      input.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
      await el.updateComplete;

      const dispatchedChangeEvent = spy.args[2][0] as CustomEvent;

      expect(el.value).to.eq('Antigua and Barbuda');
      expect(dispatchedChangeEvent.type).to.eq('vsc-change');
      expect(dispatchedChangeEvent.detail).to.eql({
        selectedIndex: 0,
        value: 'Antigua and Barbuda',
      });
    });

    it('select an option with the arrow down key, opens the dropdown with the enter key, scroll to the selected option', async () => {
      const el = (await fixture(html`
        <vsc-single-select combobox>
          <vsc-option>Afghanistan</vsc-option>
          <vsc-option>Albania</vsc-option>
          <vsc-option>Algeria</vsc-option>
          <vsc-option>Andorra</vsc-option>
          <vsc-option>Angola</vsc-option>
          <vsc-option>Antigua and Barbuda</vsc-option>
          <vsc-option>Argentina</vsc-option>
          <vsc-option>Armenia</vsc-option>
          <vsc-option>Australia</vsc-option>
          <vsc-option>Austria</vsc-option>
          <vsc-option>Azerbaijan</vsc-option>
          <vsc-option>Bahamas</vsc-option>
          <vsc-option>Bahrain</vsc-option>
          <vsc-option>Bangladesh</vsc-option>
          <vsc-option>Barbados</vsc-option>
          <vsc-option>Belarus</vsc-option>
          <vsc-option>Belgium</vsc-option>
          <vsc-option>Belize</vsc-option>
          <vsc-option>Benin</vsc-option>
          <vsc-option>Bhutan</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;
      await el.updateComplete;

      const input = el.shadowRoot?.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;
      input.focus();

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
      await el.updateComplete;

      const activeOpt = el.shadowRoot?.querySelector('.option.active');
      const optionsEl = el.shadowRoot?.querySelector('.options');

      expect(input.value).to.eq('Austria');
      expect(activeOpt).not.null;
      expect((activeOpt as HTMLLIElement).innerText).to.eq('Austria');
      expect(optionsEl?.scrollTop).to.eq(198);
      expect(el.value).to.eq('Austria');
      expect(el.selectedIndex).to.eq(9);
    });

    it('dropdown should be closed and selected option should be changed when "Enter" key pressed', async () => {
      const el = (await fixture(html`
        <vsc-single-select combobox>
          <vsc-option>Lorem</vsc-option>
          <vsc-option>Ipsum</vsc-option>
          <vsc-option>Dolor</vsc-option>
        </vsc-single-select>
      `)) as VscSingleSelect;

      const spy = sinon.spy(el, 'dispatchEvent');

      const input = el.shadowRoot?.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;
      input.value = 'dol';

      input?.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
      await el.updateComplete;

      const changeEvent = spy.lastCall.args[0] as CustomEvent;

      expect(el.value).to.eq('Dolor');
      expect(el.selectedIndex).to.eq(2);
      expect(changeEvent.type).to.eq('change');
      expect(input.value).to.eq('Dolor');
    });
  });
});
