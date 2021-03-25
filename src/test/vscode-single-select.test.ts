import {VscodeSingleSelect} from '../vscode-select/vscode-single-select';
import {expect, fixture, html} from '@open-wc/testing';
import '../vscode-select/vscode-option';

describe('vscode-single-select', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-single-select');
    expect(el).to.instanceOf(VscodeSingleSelect);
  });

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

  it('should display selected value when an option is clicked', async () => {
    const el = (await fixture(html`
      <vscode-single-select>
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-single-select>
    `)) as VscodeSingleSelect;

    const face = el.shadowRoot?.querySelector('.select-face') as HTMLDivElement;
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

  it('arrow down key press', async () => {
    const el = (await fixture(html`
      <vscode-single-select>
        <vscode-option selected>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-single-select>
    `)) as VscodeSingleSelect;

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
  });

  it('arrow up key press', async () => {
    const el = (await fixture(html`
      <vscode-single-select>
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option selected>Dolor</vscode-option>
      </vscode-single-select>
    `)) as VscodeSingleSelect;

    el.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowUp'}));
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
