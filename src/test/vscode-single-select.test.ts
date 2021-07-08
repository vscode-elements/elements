import {VscodeSingleSelect} from '../vscode-single-select';
import {expect, fixture, html} from '@open-wc/testing';
import sinon from 'sinon';
import '../vscode-option';

describe('vscode-single-select', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-single-select');
    expect(el).to.instanceOf(VscodeSingleSelect);
  });

  describe('select mode', () => {
    it('should display selected value', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option selected>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

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

    it('should display selected value when value prop is changed', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

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
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

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
      expect(el.value).to.eq('trololo');
      expect(el.selectedIndex).to.eq(-1);
    });

    it('should display selected value when selectedIndex prop is changed', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

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
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

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
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      const spy = sinon.spy(el, 'dispatchEvent');

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

      const dispatchedEvent = spy.args[0][0] as CustomEvent;

      expect(dispatchedEvent.type).to.eq('vsc-change');
      expect(dispatchedEvent.detail).to.eql({
        selectedIndex: 1,
        value: 'Ipsum',
      });
    });

    it('no item selected', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

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

    it('the value should be changed when the arrow down key pressed while the dropdown is closed', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option selected>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

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
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option selected>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

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
            <span class="empty-label-placeholder">
            </span>
          </span>
          <span class="icon">
          </span>
        </div>
        <div class="dropdown">
          <ul class="options">
            <li
              class="option"
              data-filtered-index="0"
              data-index="0"
            >
              Lorem
            </li>
          </ul>
        </div>
      `;

      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

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
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
      await el.updateComplete;

      expect(el).shadowDom.to.eq(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            <span class="empty-label-placeholder">
            </span>
          </span>
          <span class="icon">
          </span>
        </div>
        <div class="dropdown">
          <ul class="options">
            <li
              class="option"
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
            <span class="empty-label-placeholder">
            </span>
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.getAttribute('aria-expanded')).to.eq('false');
    });

    it('dropdown should be closed and selected option should be changed when "Enter" key pressed', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      const spy = sinon.spy(el, 'dispatchEvent');

      el.dispatchEvent(new MouseEvent('click'));
      await el.updateComplete;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
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
      expect(changeEvent.type).to.eq('vsc-change');
      expect(changeEvent.detail).to.eql({selectedIndex: 2, value: 'Dolor'});
    });

    it('dropdown should be closed when ESC key pressed', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));
      await el.updateComplete;

      expect(el).shadowDom.to.eq(`
        <slot class="main-slot"></slot>
        <div class="select-face">
          <span class="text">
            <span class="empty-label-placeholder">
            </span>
          </span>
          <span class="icon">
          </span>
        </div>
        <div class="dropdown">
          <ul class="options">
            <li
              class="option"
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
            <span class="empty-label-placeholder">
            </span>
          </span>
          <span class="icon">
          </span>
        </div>
      `);
      expect(el.getAttribute('aria-expanded')).be.eq('false');
    });

    it('dropdown should be scrolled to the selected option', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Afghanistan</vscode-option>
          <vscode-option>Albania</vscode-option>
          <vscode-option>Algeria</vscode-option>
          <vscode-option>Andorra</vscode-option>
          <vscode-option>Angola</vscode-option>
          <vscode-option>Antigua and Barbuda</vscode-option>
          <vscode-option>Argentina</vscode-option>
          <vscode-option>Armenia</vscode-option>
          <vscode-option>Australia</vscode-option>
          <vscode-option>Austria</vscode-option>
          <vscode-option selected>Azerbaijan</vscode-option>
          <vscode-option>Bahamas</vscode-option>
          <vscode-option>Bahrain</vscode-option>
          <vscode-option>Bangladesh</vscode-option>
          <vscode-option>Barbados</vscode-option>
          <vscode-option>Belarus</vscode-option>
          <vscode-option>Belgium</vscode-option>
          <vscode-option>Belize</vscode-option>
          <vscode-option>Benin</vscode-option>
          <vscode-option>Bhutan</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;
      await el.updateComplete;

      const face = el.shadowRoot?.querySelector('.select-face');
      face?.dispatchEvent(new MouseEvent('click'));
      await el.updateComplete;

      const options = el.shadowRoot?.querySelector('.options');
      expect(options?.scrollTop).to.eq(190);
    });
  });

  describe('combobox mode', () => {
    it('default state', async () => {
      const el = (await fixture(html`
        <vscode-single-select combobox></vscode-single-select>
      `)) as VscodeSingleSelect;

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
        <vscode-single-select combobox>
          <vscode-option>Antigua and Barbuda</vscode-option>
          <vscode-option>Argentina</vscode-option>
          <vscode-option>Armenia</vscode-option>
          <vscode-option>Australia</vscode-option>
          <vscode-option>Austria</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;
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
        <vscode-single-select combobox>
          <vscode-option>Antigua and Barbuda</vscode-option>
          <vscode-option>Argentina</vscode-option>
          <vscode-option>Armenia</vscode-option>
          <vscode-option>Australia</vscode-option>
          <vscode-option>Austria</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;
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
        <vscode-single-select combobox>
          <vscode-option>Antigua and Barbuda</vscode-option>
          <vscode-option>Argentina</vscode-option>
          <vscode-option>Armenia</vscode-option>
          <vscode-option>Australia</vscode-option>
          <vscode-option>Austria</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;
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
        <vscode-single-select combobox>
          <vscode-option>Afghanistan</vscode-option>
          <vscode-option>Albania</vscode-option>
          <vscode-option>Algeria</vscode-option>
          <vscode-option>Andorra</vscode-option>
          <vscode-option>Angola</vscode-option>
          <vscode-option>Antigua and Barbuda</vscode-option>
          <vscode-option>Argentina</vscode-option>
          <vscode-option>Armenia</vscode-option>
          <vscode-option>Australia</vscode-option>
          <vscode-option>Austria</vscode-option>
          <vscode-option>Azerbaijan</vscode-option>
          <vscode-option>Bahamas</vscode-option>
          <vscode-option>Bahrain</vscode-option>
          <vscode-option>Bangladesh</vscode-option>
          <vscode-option>Barbados</vscode-option>
          <vscode-option>Belarus</vscode-option>
          <vscode-option>Belgium</vscode-option>
          <vscode-option>Belize</vscode-option>
          <vscode-option>Benin</vscode-option>
          <vscode-option>Bhutan</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;
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
      expect(optionsEl?.scrollTop).to.eq(171);
      expect(el.value).to.eq('Austria');
      expect(el.selectedIndex).to.eq(9);
    });

    it('dropdown should be closed and selected option should be changed when "Enter" key pressed', async () => {
      const el = (await fixture(html`
        <vscode-single-select combobox>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

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
      expect(changeEvent.type).to.eq('vsc-change');
      expect(changeEvent.detail).to.eql({selectedIndex: 2, value: 'Dolor'});
      expect(input.value).to.eq('Dolor');
    });
  });
});
