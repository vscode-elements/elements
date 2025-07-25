import {sendKeys} from '@web/test-runner-commands';
import {clickOnElement, moveMouseOnElement} from '../includes/test-helpers.js';
import type {VscodeOption} from '../vscode-option/vscode-option.js';
import {VscodeSingleSelect} from './index.js';
import {aTimeout, expect, fixture, html} from '@open-wc/testing';
import sinon from 'sinon';
import {VscodeScrollable} from '../main.js';

const ignoredAttributes = [
  'aria-label',
  'aria-selected',
  'data-filtered-index',
  'data-index',
  'id',
  'role',
  'tabindex',
];

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

      const dropdown = el.shadowRoot?.querySelector('.dropdown');

      expect(dropdown?.classList.contains('open')).to.be.false;
      expect(el.selectedIndex).to.eq(1);
      expect(el.value).to.eq('Ipsum');
    });

    it('should show selected value when options are added later', async () => {
      const el = await fixture<VscodeSingleSelect>(
        html`<vscode-single-select></vscode-single-select>`
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

      await aTimeout(0);

      expect(
        el.shadowRoot?.querySelector<HTMLDivElement>('.face')!.innerText
      ).to.eq('dolor');
    });

    it('should return the validity object', () => {
      const el = document.createElement(
        'vscode-single-select'
      ) as VscodeSingleSelect;

      expect(el.validity).to.instanceOf(ValidityState);
    });

    it('should return the validation message', async () => {
      const el = await fixture<VscodeSingleSelect>(
        html`<vscode-single-select required></vscode-single-select>`
      );

      expect(el.validationMessage).to.eql('Please select an item in the list.');
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

      const dropdown = el.shadowRoot?.querySelector('.dropdown');

      expect(dropdown?.classList.contains('open')).to.be.false;
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

      const dropdown = el.shadowRoot?.querySelector('.dropdown');

      expect(dropdown?.classList.contains('open')).to.be.false;
      expect(el.value).to.eq('');
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

      const dropdown = el.shadowRoot?.querySelector('.dropdown');

      expect(dropdown?.classList.contains('open')).to.be.false;
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

      const dropdown = el.shadowRoot?.querySelector('.dropdown');

      expect(dropdown?.classList.contains('open')).to.be.false;
      expect(el.value).to.eq('');
      expect(el.selectedIndex).to.eq(-1);
    });

    it('should display selected value when an option is clicked', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      const spy = sinon.spy();
      el.addEventListener('change', spy);

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
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      const dropdown = el.shadowRoot?.querySelector('.dropdown');

      expect(dropdown?.classList.contains('open')).to.be.false;
      expect(el.value).to.eq('Lorem');
      expect(el.selectedIndex).to.eq(0);
    });

    it('should not be allowed to select an element by down arrow key other than the existing ones', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.value = 'Lorem';

      // first arrow down press opens the dropdown
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;

      // Last option
      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      await el.updateComplete;

      expect(async () => {
        el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
        await el.updateComplete;
      }).not.throw();
      expect(el.value).to.eq('Lorem');
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

      el.focus();
      await el.updateComplete;
      await sendKeys({press: 'Enter'});

      const scrollable =
        el.shadowRoot?.querySelector<VscodeScrollable>('.scrollable');
      expect(scrollable?.scrollPos).to.eq(220);
    });

    //#region keyboard interactions

    it('the dropdown should be opened when the arrow down key pressed while the dropdown is closed', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option selected>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.focus();
      await sendKeys({press: 'ArrowDown'});

      const dropdown = el.shadowRoot?.querySelector('.dropdown');

      expect(dropdown?.classList.contains('open')).to.be.true;
    });

    it('the dropdown should be opened when the arrow up key pressed while the dropdown is closed', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option selected>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.focus();
      await sendKeys({press: 'ArrowUp'});

      const dropdown = el.shadowRoot?.querySelector('.dropdown');

      expect(dropdown?.classList.contains('open')).to.be.true;
    });

    it('dropdown should be opened when "Space" key pressed', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;
      el.dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));
      await el.updateComplete;

      const dropdown = el.shadowRoot?.querySelector('.dropdown');

      expect(dropdown?.classList.contains('open')).to.be.true;
    });

    it('dropdown should be opened when "Enter" key pressed', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.focus();
      await sendKeys({press: 'Enter'});

      const dropdown = el.shadowRoot?.querySelector('.dropdown');
      const combobox = el.shadowRoot?.querySelector('[role="combobox"]');

      expect(dropdown?.classList.contains('open')).to.be.true;
      expect(combobox?.getAttribute('aria-expanded')).to.eq('true');
    });

    it('dropdown should be closed and selected option should be changed when "Enter" key pressed', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      const spy = sinon.spy();
      el.addEventListener('change', spy);

      el.focus();
      await sendKeys({press: 'ArrowDown'});
      await sendKeys({press: 'ArrowDown'});
      await sendKeys({press: 'ArrowDown'});
      await sendKeys({press: 'Enter'});

      expect(el.shadowRoot?.querySelector('.text')).lightDom.to.eq('Dolor');
      expect(el.value).to.eq('Dolor');
      expect(el.selectedIndex).to.eq(2);
      expect(spy.calledWithMatch({type: 'change'})).to.be.true;
    });

    it('dropdown should be closed when ESC key pressed', async () => {
      const el = (await fixture(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));
      await el.updateComplete;

      const dropdownBefore = el.shadowRoot?.querySelector('.dropdown');
      const faceBefore = el.shadowRoot?.querySelector('.select-face');

      expect(dropdownBefore?.classList.contains('open')).to.be.true;
      expect(faceBefore?.getAttribute('aria-expanded')).to.eq('true');

      el.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
      await el.updateComplete;

      const dropdownAfter = el.shadowRoot?.querySelector('.dropdown');
      const faceAfter = el.shadowRoot?.querySelector('.select-face');

      expect(dropdownAfter?.classList.contains('open')).to.be.false;
      expect(faceAfter?.getAttribute('aria-expanded')).be.eq('false');
    });
    //#endregion
  });

  describe('combobox mode', () => {
    it('default state', async () => {
      const el = (await fixture(html`
        <vscode-single-select combobox></vscode-single-select>
      `)) as VscodeSingleSelect;

      expect(el.shadowRoot?.querySelector('.combobox-face')).to.be.ok;
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

      const dropdown = el.shadowRoot?.querySelector('.dropdown');
      const scrollable = el.shadowRoot?.querySelector('.scrollable');

      expect(scrollable).lightDom.to.eq(
        `
        <ul class="options">
          <li class="option">
            <b>A</b>ntig<b>u</b>a and Barbuda
          </li>
          <li class="option">
            <b>A</b><b>u</b>stralia
          </li>
          <li class="option">
            <b>A</b><b>u</b>stria
          </li>
        </ul>
      `,
        {ignoreAttributes: ignoredAttributes}
      );
      expect(dropdown?.classList.contains('open')).to.be.true;
    });

    it('does not allow the highlight to move past the last item in the filtered list', async () => {
      const el = await fixture(html`
        <vscode-single-select combobox>
          <vscode-option value="banana">Banana</vscode-option>
          <vscode-option value="cherry">Cherry</vscode-option>
          <vscode-option value="apple">Apple</vscode-option>
          <vscode-option value="strawberry">Strawberry</vscode-option>
          <vscode-option value="lemon">Lemon</vscode-option>
          <vscode-option value="orange">Orange</vscode-option>
        </vscode-single-select>
      `);
      const input = el.shadowRoot?.querySelector('.combobox-input')!;

      await clickOnElement(input);
      await sendKeys({type: 'le'});
      await sendKeys({down: 'ArrowDown'});
      await sendKeys({down: 'ArrowDown'});
      await sendKeys({down: 'ArrowDown'});
      await sendKeys({down: 'ArrowDown'});

      const options = el.shadowRoot?.querySelector('.options');

      expect(options).lightDom.to.eq(
        `
        <li class="option">App<b>l</b><b>e</b></li>
        <li class="option active"><b>L</b><b>e</b>mon</li>
      `,
        {ignoreAttributes: ignoredAttributes}
      );
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

      el.focus();
      await sendKeys({type: 'au'});
      await sendKeys({down: 'ArrowDown'});
      await sendKeys({down: 'ArrowDown'});

      const options = Array.from(
        el.shadowRoot?.querySelectorAll(
          '.options li'
        ) as NodeListOf<HTMLLIElement>
      );

      expect(options[1].classList.contains('active')).to.eq(true);
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

      el.focus();

      await sendKeys({type: 'au'});
      await sendKeys({down: 'ArrowDown'});
      await sendKeys({down: 'Enter'});

      expect(el.value).to.eq('Antigua and Barbuda');
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

      await sendKeys({down: 'Enter'});
      await el.updateComplete;

      const activeOpt = el.shadowRoot?.querySelector('.option.active');
      const optionsEl = el.shadowRoot?.querySelector('.options');

      expect(input.value).to.eq('Austria');
      expect(activeOpt).not.null;
      expect(activeOpt as HTMLLIElement).lightDom.to.eq('Austria');
      expect(optionsEl?.scrollTop).to.eq(0);
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

      const spy = sinon.spy();
      el.addEventListener('change', spy);

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

      expect(el.value).to.eq('Dolor');
      expect(el.selectedIndex).to.eq(2);
      expect(spy.calledWithMatch({type: 'change'})).to.be.true;
      expect(input.value).to.eq('Dolor');
    });

    it('shows "no options" state', async () => {
      const el = (await fixture(html`
        <vscode-single-select combobox>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.shadowRoot?.querySelector('.combobox-input');
      await clickOnElement(el);
      await sendKeys({type: 'Test'});

      const scrollable = el.shadowRoot?.querySelector('.scrollable');

      expect(scrollable).lightDom.to.eq(
        `
        <ul class="options">
          <li class="no-options">
            No options
          </li>
        </ul>
      `,
        {ignoreAttributes: ignoredAttributes}
      );
    });

    it('shows suggested option below the options', async () => {
      const el = (await fixture(html`
        <vscode-single-select combobox creatable>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.focus();
      await el.updateComplete;
      await sendKeys({type: 'lo'});

      const scrollable = el.shadowRoot?.querySelector('.scrollable');

      expect(scrollable).lightDom.to.eq(
        `
        <ul class="options">
          <li class="option">
            <b>L</b><b>o</b>rem
          </li>
          <li class="option">
            Do<b>l</b><b>o</b>r
          </li>
          <li class="option placeholder">Add "lo"</li>
        </ul>
      `,
        {
          ignoreAttributes: ignoredAttributes,
        }
      );
    });

    it('shows only suggested option', async () => {
      const el = (await fixture(html`
        <vscode-single-select combobox creatable>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.focus();
      await el.updateComplete;
      await sendKeys({type: 'Sit'});

      const scrollable = el.shadowRoot?.querySelector('.scrollable');

      expect(scrollable).lightDom.to.eq(
        `
          <ul class="options">
            <li class="option placeholder">Add "Sit"</li>
          </ul>
        `,
        {
          ignoreAttributes: ignoredAttributes,
        }
      );
    });

    it('selects the suggested option', async () => {
      const el = (await fixture(html`
        <vscode-single-select combobox creatable>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.focus();
      await el.updateComplete;
      await sendKeys({type: 'dol'});

      await sendKeys({down: 'ArrowDown'});
      await sendKeys({down: 'ArrowDown'});

      const scrollable = el.shadowRoot?.querySelector('.scrollable');

      expect(scrollable).lightDom.to.eq(
        `
        <ul class="options">
          <li class="option"><b>D</b><b>o</b><b>l</b>or</li>
          <li class="active option placeholder">Add "dol"</li>
        </ul>
        `,
        {
          ignoreAttributes: ignoredAttributes,
        }
      );
    });

    it('creates the suggested option', async () => {
      const el = (await fixture(html`
        <vscode-single-select combobox creatable>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;
      const spy = sinon.spy();
      el.addEventListener('vsc-single-select-create-option', spy);

      el.focus();
      await el.updateComplete;
      await sendKeys({type: 'Sit'});

      await sendKeys({down: 'ArrowDown'});
      await sendKeys({down: 'Enter'});

      expect(el).lightDom.to.eq(`
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
        <vscode-option>Sit</vscode-option>
      `);
      expect(el.value).to.eq('Sit');
      expect(el.selectedIndex).to.eq(3);
      expect(spy.called).to.be.true;
      expect(spy.getCalls()[0].args[0].detail).to.eql({value: 'Sit'});
    });

    it('displays the current value', async () => {
      const el = (await fixture(html`
        <vscode-single-select combobox>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;
      el.value = 'Ipsum';

      await el.updateComplete;

      const input =
        el.shadowRoot?.querySelector<HTMLInputElement>('.combobox-input')!;

      expect(input.value).to.eq('Ipsum');
    });

    it('highlights selected option when opens the dropdown', async () => {
      const el = (await fixture(html`
        <vscode-single-select combobox>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `)) as VscodeSingleSelect;

      el.value = 'Ipsum';
      await el.updateComplete;

      await clickOnElement(el);
      const activeOption = el.shadowRoot?.querySelector('.option.active');

      expect(activeOption).lightDom.to.eq('Ipsum');
    });

    //#region  keyboard interactions
    //#region textbox
    it('when ESC key is pressed, closes the listbox if it is displayed');
    it(
      'when the ESC key is pressed, clears the textbox if the listbox is not displayed'
    );

    it('when the ArrowDown key is pressed selects the next option in a filtered list', async () => {
      const el = await fixture<VscodeSingleSelect>(
        html`<vscode-single-select combobox>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>`
      );

      el.focus();
      await sendKeys({type: 'l'});
      await sendKeys({down: 'ArrowDown'});
      await sendKeys({down: 'ArrowDown'});

      const activeOption = el.shadowRoot?.querySelector('.option.active');

      expect(activeOption).lightDom.to.eq('Do<b>l</b>or');
    });
    //#endregion
    //#endregion
  });

  describe('general behavior', () => {
    it('should be unfocusable when it is disabled', () => {
      const el = document.createElement('vscode-single-select');
      el.tabIndex = 2;
      el.disabled = true;

      expect(el.tabIndex).to.eq(-1);
    });

    it('should aria-disabled attribute applied when it is disabled', () => {
      const el = document.createElement('vscode-single-select');
      el.disabled = true;

      expect(el.getAttribute('aria-disabled')).to.eq('true');
    });

    it('should original tabindex restored when enabled again', () => {
      const el = document.createElement('vscode-single-select');
      el.tabIndex = 2;
      el.disabled = true;

      expect(el.tabIndex).to.eq(-1);

      el.disabled = false;

      expect(el.tabIndex).to.eq(2);
    });

    it('should not throw error when selectedIndex points to a non-existent option', async () => {
      const el = await fixture<VscodeSingleSelect>(
        html`<vscode-single-select></vscode-single-select>`
      );
      el.selectedIndex = 2;

      expect(() => {
        // trigger a slot change event
        el.innerHTML = '   ';
      }).not.throw();
    });

    it('should set the initial form value', async () => {
      const el = await fixture(html`
        <form id="fr">
          <vscode-single-select name="test">
            <vscode-option value="lorem">Lorem</vscode-option>
            <vscode-option value="ipsum">Ipsum</vscode-option>
          </vscode-single-select>
        </form>
      `);

      const fd = new FormData(el as HTMLFormElement);

      expect(fd.get('test')).to.eq('lorem');
    });

    it('should set the initial selected value', async () => {
      const el = await fixture(html`
        <form id="fr">
          <vscode-single-select name="test">
            <vscode-option value="lorem">Lorem</vscode-option>
            <vscode-option value="ipsum" selected>Ipsum</vscode-option>
          </vscode-single-select>
        </form>
      `);

      const fd = new FormData(el as HTMLFormElement);
      const sl = el.querySelector('vscode-single-select');
      const text = sl?.shadowRoot?.querySelector(
        'span.text'
      ) as HTMLSpanElement;

      expect(fd.get('test')).to.eq('ipsum');
      expect(text.innerText).to.eq('Ipsum');
    });

    it('should set the initial selected value', async () => {
      const el = await fixture(html`
        <form id="fr">
          <vscode-single-select name="test"></vscode-single-select>
        </form>
      `);

      const sl = el.querySelector('vscode-single-select');

      const op1 = document.createElement('vscode-option');
      op1.value = 'lorem';
      op1.innerHTML = 'Lorem';
      const op2 = document.createElement('vscode-option');
      op2.value = 'ipsum';
      op2.innerHTML = 'Ipsum';
      op2.selected = true;

      sl?.appendChild(op1);
      sl?.appendChild(op2);

      await sl?.updateComplete;

      const fd = new FormData(el as HTMLFormElement);

      expect(fd.get('test')).to.eq('ipsum');
    });

    it('open by default', async () => {
      const sl = await fixture(
        html`<vscode-single-select open>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>`
      );

      expect(sl.shadowRoot?.querySelector('ul.options')).to.be.ok;
    });

    it('shows selected option when opened by default', async () => {
      const sl = await fixture(
        html`<vscode-single-select open>
          <vscode-option>Lorem</vscode-option>
          <vscode-option selected>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>`
      );

      const op = sl.shadowRoot?.querySelector<HTMLLIElement>(
        'ul.options li:nth-child(2)'
      );

      expect(op).lightDom.to.eq('Ipsum');
      expect(op?.classList.contains('selected')).to.be.true;
    });

    it('changes the description of an option in an existing select', async () => {
      const el = await fixture<VscodeSingleSelect>(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `);
      const secondOption =
        el.querySelectorAll<VscodeOption>('vscode-option')[1];

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
      const el = await fixture<VscodeSingleSelect>(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `);
      const secondOption =
        el.querySelectorAll<VscodeOption>('vscode-option')[1];

      secondOption.innerHTML = 'Test label';
      await el.updateComplete;

      await clickOnElement(el);
      await el.updateComplete;

      const li = el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[1];

      expect(li).lightDom.to.eq('Test label');
    });

    it('changes the disabled state of an option in an existing select', async () => {
      const el = await fixture<VscodeSingleSelect>(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `);
      const secondOption =
        el.querySelectorAll<VscodeOption>('vscode-option')[1];

      secondOption.disabled = true;
      await el.updateComplete;

      await clickOnElement(el);
      await el.updateComplete;

      const li = el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[1];

      expect(li.classList.contains('disabled')).to.be.true;
    });

    it('skips disabled options', async () => {
      const el = await fixture<VscodeSingleSelect>(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option disabled>Ipsum</vscode-option>
          <vscode-option disabled>Dolor</vscode-option>
          <vscode-option>Sit</vscode-option>
        </vscode-single-select>
      `);

      el.focus();
      await sendKeys({press: 'ArrowDown'});
      await sendKeys({press: 'ArrowDown'});

      const activeOption = el.shadowRoot?.querySelector('.option.active');

      expect(activeOption).lightDom.to.eq('Sit');
    });

    it('skips disabled options when dropdown is open', async () => {
      const el = await fixture<VscodeSingleSelect>(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option disabled>Ipsum</vscode-option>
          <vscode-option disabled>Dolor</vscode-option>
          <vscode-option>Sit</vscode-option>
        </vscode-single-select>
      `);

      el.focus();
      await el.updateComplete;

      await sendKeys({down: 'ArrowDown'});
      await sendKeys({down: 'ArrowDown'});

      const options =
        el.shadowRoot?.querySelectorAll<HTMLLIElement>('.option')!;

      expect(options[3]).lightDom.to.eq('Sit');
      expect(options[3].classList.contains('active')).to.be.true;
    });

    it('highlights active option', async () => {
      const el = await fixture<VscodeSingleSelect>(html`
        <vscode-single-select>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-single-select>
      `);
      el.selectedIndex = 1;
      el.open = true;

      await el.updateComplete;

      const options =
        el.shadowRoot?.querySelectorAll<HTMLLIElement>('.option')!;

      expect(options[1]).lightDom.eq('Ipsum');
      expect(options[1].classList.contains('active')).to.be.true;
    });

    it('updates validity when required property is changed', async () => {
      const el = await fixture<VscodeSingleSelect>(
        html`<vscode-single-select>
          <vscode-option></vscode-option>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
        </vscode-single-select>`
      );
      const isValidBefore = el.checkValidity();

      el.setAttribute('required', '');
      await el.updateComplete;

      const isValidAfter = el.checkValidity();

      expect(isValidBefore).to.be.true;
      expect(isValidAfter).to.be.false;
    });

    it('updates validity when selectedIndex is changed', async () => {
      const el = await fixture<VscodeSingleSelect>(
        html`<vscode-single-select required>
          <vscode-option></vscode-option>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
        </vscode-single-select>`
      );
      const isValidBefore = el.checkValidity();

      el.selectedIndex = 1;

      const isValidAfter = el.checkValidity();

      expect(isValidBefore).to.be.false;
      expect(isValidAfter).to.be.true;
    });

    it('updates validity when value is changed', async () => {
      const el = await fixture<VscodeSingleSelect>(
        html`<vscode-single-select required>
          <vscode-option></vscode-option>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
        </vscode-single-select>`
      );
      const isValidBefore = el.checkValidity();

      el.value = 'Lorem';

      const isValidAfter = el.checkValidity();

      expect(isValidBefore).to.be.false;
      expect(isValidAfter).to.be.true;
    });
  });

  describe('closed dropdown', () => {
    it(
      'opens the dropdown if it is not already displayed when DownArrow is pressed'
    );
    it('opens the dropdown when Alt + DownArrow are pressed');
    it('Up Arrow is pressed');
    it('Enter is pressed');
    it('Space is pressed');
    it('Home is pressed');
    it('End is pressed');
  });

  it('creates and select suggested option', async () => {
    const el = await fixture<VscodeSingleSelect>(
      html`<vscode-single-select combobox creatable
        ><vscode-option>Lorem</vscode-option></vscode-single-select
      >`
    );
    const createOptionHandlerSpy = sinon.spy();
    el.addEventListener(
      'vsc-single-select-create-option',
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
    expect(el.value).to.eql('asdf');
  });

  //keyboard navigation
  it('selects previous option with keyboard');
  it('selects next option with keyboard');
  it('selects an option above the viewport with keyboard');
  it('selects an option below the viewport with keyboard');
  it('selects previous option in a filtered list with keyboard');
  it('selects next option in a filtered list with keyboard');
  it('selects an option in a filtered list above the viewport with keyboard');
  it('selects an option in a filtered list below the viewport with keyboard');
});
