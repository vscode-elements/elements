/* eslint-disable @typescript-eslint/no-unused-vars */
import {html, fixture, expect} from '@open-wc/testing';
import {VscodeSelect} from '../vscode-select';
import {VscodeOption} from '../vscode-option';
import '../vscode-option';
import {spy} from 'sinon';

describe('vscode-select', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-select');
    expect(el).to.instanceOf(VscodeSelect);
  });

  it('renders with default values', async () => {
    const el = (await fixture(html`
      <vscode-select>
        <vscode-option>Lorem</vscode-option>
        <vscode-option selected>Ipsum</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    expect(el).shadowDom.to.equal(`
      <div
        aria-expanded="false"
        aria-haspopup="true"
        class="select-face"
        role="listbox"
        tabindex="0"
      >
        <span class="text">
          Ipsum
        </span>
        <span class="icon"></span>
      </div>
      <div class="dropdown">
        <div class="options">
          <slot></slot>
        </div>
      </div>
    `);
  });

  it('renders with explicit values', async () => {
    const el = (await fixture(html`
      <vscode-select>
        <vscode-option value="testvalue1">Lorem</vscode-option>
        <vscode-option selected value="testvalue2">Ipsum</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    expect(el.value).to.eq('testvalue2');
  });

  it('select an option', async () => {
    const el = (await fixture(html`
      <vscode-select>
        <vscode-option value="testvalue1">Lorem</vscode-option>
        <vscode-option value="testvalue2">Ipsum</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    const changeSpy = spy();
    el.addEventListener('vsc-change', changeSpy);

    const clickEvent = new MouseEvent('click');
    const faceElement = el.shadowRoot?.querySelector('.select-face');
    const slot = el.shadowRoot?.querySelector('slot');
    const optionElements = slot
      ?.assignedNodes()
      .filter(
        (el) => el.nodeName.toLowerCase() === 'vscode-option'
      ) as VscodeOption[];
    const option = optionElements[1];

    const dropdown = el.shadowRoot?.querySelector(
      '.dropdown'
    ) as HTMLDivElement;

    expect(window.getComputedStyle(dropdown).getPropertyValue('display')).to.eq(
      'none'
    );

    faceElement?.dispatchEvent(clickEvent);
    await el.updateComplete;

    expect(window.getComputedStyle(dropdown).getPropertyValue('display')).to.eq(
      'block'
    );

    clickEvent.composedPath = () => {
      return [option as VscodeOption];
    };

    el?.dispatchEvent(clickEvent);
    await el.updateComplete;

    expect(el.value).to.eq('testvalue2');
    expect(changeSpy).to.calledWithMatch({detail: {value: 'testvalue2'}});
  });

  it('renders description', async () => {
    const markup = html`
      <vscode-select>
        <vscode-option value="test value 1" description="Test description 1"
          >Lorem</vscode-option
        >
        <vscode-option value="test value 2" description="Test description 2"
          >Ipsum</vscode-option
        >
        <vscode-option value="test value 3" description="Test description 3"
          >Dolor</vscode-option
        >
      </vscode-select>
    `;
    const el = (await fixture(markup)) as VscodeSelect;

    const option = el.querySelectorAll('vscode-option')[1];
    const mouseOverEvent = new MouseEvent('mouseover');
    mouseOverEvent.composedPath = () => {
      return [option];
    };

    const mouseOutEvent = new MouseEvent('mouseout');
    mouseOutEvent.composedPath = () => {
      return [option];
    };

    el.dispatchEvent(mouseOverEvent);
    await el.updateComplete;

    const descriptionEl = el.shadowRoot?.querySelector('.description');
    expect(descriptionEl).lightDom.to.equal('Test description 2');

    el.dispatchEvent(mouseOutEvent);
    await el.updateComplete;

    const emptyDescriptionEl = el.shadowRoot?.querySelector('.description');
    expect(emptyDescriptionEl).to.eq(null);
  });

  it('append content through innerHTML', async () => {
    const el = (await fixture(html`
      <vscode-select></vscode-select>
    `)) as VscodeSelect;

    el.innerHTML = `
      <vscode-option>Lorem</vscode-option>
      <vscode-option>Ipsum</vscode-option>
      <vscode-option selected>Dolor</vscode-option>
    `;

    await el.updateComplete;

    expect(el.selectedIndex).to.eq(2);
    expect(el.options).to.eql([
      {
        description: '',
        label: 'Lorem',
        selected: false,
        value: 'Lorem',
      },
      {
        description: '',
        label: 'Ipsum',
        selected: false,
        value: 'Ipsum',
      },
      {
        description: '',
        label: 'Dolor',
        selected: true,
        value: 'Dolor',
      },
    ]);
  });

  it('append content with appendChild()', async () => {
    const el = (await fixture(html`
      <vscode-select></vscode-select>
    `)) as VscodeSelect;

    const op1 = document.createElement('vscode-option');
    const op2 = document.createElement('vscode-option');
    const op3 = document.createElement('vscode-option');
    op1.innerHTML = 'Lorem';
    op2.innerHTML = 'Ipsum';
    op3.innerHTML = 'Dolor';
    op3.setAttribute('selected', '');

    el.appendChild(op1);
    el.appendChild(op2);
    el.appendChild(op3);

    await el.updateComplete;

    expect(el.selectedIndex).to.eq(2);
    expect(el.options).to.eql([
      {
        description: '',
        label: 'Lorem',
        selected: false,
        value: 'Lorem',
      },
      {
        description: '',
        label: 'Ipsum',
        selected: false,
        value: 'Ipsum',
      },
      {
        description: '',
        label: 'Dolor',
        selected: true,
        value: 'Dolor',
      },
    ]);
  });

  it('set selectedIndex when value changed', async () => {
    const el = (await fixture(html`
      <vscode-select>
        <vscode-option value="testvalue1">Lorem</vscode-option>
        <vscode-option value="testvalue2">Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    el.value = 'testvalue2';
    expect(el.selectedIndex).to.eq(1);
    expect(el.selectedIndexes).to.eql([1]);
    el.value = 'Dolor';
    expect(el.selectedIndex).to.eq(2);
    expect(el.selectedIndexes).to.eql([2]);
    el.value = 'asdf';
    expect(el.selectedIndex).to.eq(-1);
    expect(el.selectedIndexes).to.eql([-1]);
    expect(el.value).to.eq('asdf');
  });

  it('set value when selectedIndex changed', async () => {
    const el = (await fixture(html`
      <vscode-select>
        <vscode-option value="testvalue1">Lorem</vscode-option>
        <vscode-option value="testvalue2">Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    el.selectedIndex = 1;
    expect(el.value).to.eq('testvalue2');
    el.selectedIndex = 3;
    expect(el.value).to.eq('');
    el.selectedIndex = -1;
    expect(el.value).to.eq('');
  });

  it('default value should be an empty string', async () => {
    const el = (await fixture(html`
      <vscode-select>
        <vscode-option value="testvalue1">Lorem</vscode-option>
        <vscode-option value="testvalue2">Ipsum</vscode-option>
        <vscode-option value="testvalue3">Dolor</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    expect(el.value).to.eq('');
  });

  it('default selectedIndex should be -1', async () => {
    const el = (await fixture(html`
      <vscode-select>
        <vscode-option value="testvalue1">Lorem</vscode-option>
        <vscode-option value="testvalue2">Ipsum</vscode-option>
        <vscode-option value="testvalue3">Dolor</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    expect(el.selectedIndex).to.eq(-1);
  });

  it('click on outside area closes the dropdown', async () => {
    const el = (await fixture(html`
      <vscode-select>
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-select>
    `)) as VscodeSelect;

    el.shadowRoot
      ?.querySelector('.select-face')
      ?.dispatchEvent(new MouseEvent('click'));

    await el.updateComplete;

    const dropdown = el.shadowRoot?.querySelector(
      '.dropdown'
    ) as HTMLDivElement;

    expect(window.getComputedStyle(dropdown).getPropertyValue('display')).to.eq(
      'block'
    );

    const outsideClickEvent = new MouseEvent('click');
    outsideClickEvent.composedPath = () => [];

    window.dispatchEvent(outsideClickEvent);

    await el.updateComplete;

    expect(window.getComputedStyle(dropdown).getPropertyValue('display')).to.eq(
      'none'
    );
  });

  describe('multiple', () => {
    it('multiple attribute', async () => {
      const el = await fixture(html`
        <vscode-select multiple>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-select>
      `) as VscodeSelect;

      const labelEl = el.shadowRoot?.querySelector('.select-face .text');
      const slot = el.shadowRoot?.querySelector('slot');
      const optionElements = slot
        ?.assignedNodes()
        .filter(
          (el) => el.nodeName.toLowerCase() === 'vscode-option'
        ) as VscodeOption[];

      expect(el.selectedIndex).to.eq(-1);
      expect(el.value).to.eq('');
      expect(labelEl).lightDom.to.equal('&lt;No item selected&gt;');
      expect(optionElements[0].multiple).to.eq(true);
      expect(optionElements[1].multiple).to.eq(true);
      expect(optionElements[2].multiple).to.eq(true);
    });

    it('multiple attribute - select multiple option', async () => {
      const el = (await fixture(html`
        <vscode-select multiple>
          <vscode-option>Lorem</vscode-option>
          <vscode-option selected>Ipsum</vscode-option>
          <vscode-option selected>Dolor</vscode-option>
        </vscode-select>
      `)) as VscodeSelect;

      const labelEl = el.shadowRoot?.querySelector('.select-face .text');

      expect(el.selectedIndex).to.eq(1);
      expect(el.selectedIndexes).to.eql([1, 2]);
      expect(el.options).to.eql([
        {
          description: '',
          label: 'Lorem',
          selected: false,
          value: 'Lorem',
        },
        {
          description: '',
          label: 'Ipsum',
          selected: true,
          value: 'Ipsum',
        },
        {
          description: '',
          label: 'Dolor',
          selected: true,
          value: 'Dolor',
        },
      ]);
      expect(el.value).to.eq('Ipsum');
      expect(labelEl).lightDom.to.equal('2 items selected', 'label text');
    });

    it('click on options', async () => {
      const el = (await fixture(html`
        <vscode-select multiple>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-select>
      `)) as VscodeSelect;

      const changeListenerSpy = spy();
      el.addEventListener('vsc-change', changeListenerSpy);

      const clickEvent = new MouseEvent('click');
      const faceElement = el.shadowRoot?.querySelector('.select-face');
      faceElement?.dispatchEvent(clickEvent);

      const slot = el.shadowRoot?.querySelector('slot');
      const optionElements = slot
        ?.assignedNodes()
        .filter(
          (el) => el.nodeName.toLowerCase() === 'vscode-option'
        ) as VscodeOption[];
      const opt0click = new MouseEvent('click');
      const opt1click = new MouseEvent('click');
      const opt2click = new MouseEvent('click');
      opt0click.composedPath = () => [optionElements[0]];
      opt1click.composedPath = () => [optionElements[1]];
      opt2click.composedPath = () => [optionElements[2]];

      el.dispatchEvent(opt0click);
      expect(changeListenerSpy).to.calledWithMatch({
        detail: {
          multiple: true,
          selectedIndex: 0,
          selectedIndexes: [0],
          value: 'Lorem',
        },
      });
      changeListenerSpy.resetHistory();

      el.dispatchEvent(opt1click);
      expect(changeListenerSpy).to.calledWithMatch({
        detail: {
          multiple: true,
          selectedIndex: 0,
          selectedIndexes: [0, 1],
          value: 'Lorem',
        },
      });
      changeListenerSpy.resetHistory();

      el.dispatchEvent(opt2click);
      expect(changeListenerSpy).to.calledWithMatch({
        detail: {
          multiple: true,
          selectedIndex: 0,
          selectedIndexes: [0, 1, 2],
          value: 'Lorem',
        },
      });
      changeListenerSpy.resetHistory();

      el.dispatchEvent(opt0click);
      expect(changeListenerSpy).to.calledWithMatch({
        detail: {
          multiple: true,
          selectedIndex: 1,
          selectedIndexes: [1, 2],
          value: 'Ipsum',
        },
      });
    });

    it('set selectedIndexes', async () => {
      const el = await fixture(html`
        <vscode-select multiple>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-select>
      `) as VscodeSelect;

      el.selectedIndexes = [0, 1, 2];

      await el.updateComplete;

      const options = el.options;
      const slot = el.shadowRoot?.querySelector('slot');
      const optionElements = slot
        ?.assignedNodes()
        .filter(
          (el) => el.nodeName.toLowerCase() === 'vscode-option'
        ) as VscodeOption[];
      const labelEl = el.shadowRoot?.querySelector('.select-face .text');

      expect(options[0].selected).to.eq(true);
      expect(options[1].selected).to.eq(true);
      expect(options[2].selected).to.eq(true);
      expect(optionElements[0].selected).to.eq(true);
      expect(optionElements[1].selected).to.eq(true);
      expect(optionElements[2].selected).to.eq(true);
      expect(labelEl).lightDom.to.equal('3 items selected');
      expect(el.value).to.eq('Lorem');
      expect(el.selectedIndex).to.eq(0);
    });

    it('click on OK button', async () => {
      const el = await fixture(html`
        <vscode-select multiple>
          <vscode-option>Lorem</vscode-option>
          <vscode-option>Ipsum</vscode-option>
          <vscode-option>Dolor</vscode-option>
        </vscode-select>
      `) as VscodeSelect;

      const clickEvent = new MouseEvent('click');
      const faceElement = el.shadowRoot?.querySelector('.select-face');
      const dropdown = el.shadowRoot?.querySelector(
        '.dropdown'
      ) as HTMLDivElement;

      faceElement?.dispatchEvent(clickEvent);

      await el.updateComplete;

      expect(window.getComputedStyle(dropdown).getPropertyValue('display')).to.eq(
        'block'
      );

      const okButton = el.shadowRoot?.querySelector(
        '.buttons vscode-button:first-child'
      ) as HTMLDivElement;
      okButton.dispatchEvent(new MouseEvent('click'));

      await el.updateComplete;

      expect(window.getComputedStyle(dropdown).getPropertyValue('display')).to.eq(
        'none'
      );
    });

    it('click on reset button', async () => {
      const el = await fixture(html`
        <vscode-select multiple>
          <vscode-option selected>Lorem</vscode-option>
          <vscode-option selected>Ipsum</vscode-option>
          <vscode-option selected>Dolor</vscode-option>
        </vscode-select>
      `) as VscodeSelect;

      const clickEvent = new MouseEvent('click');
      const faceElement = el.shadowRoot?.querySelector('.select-face');
      const dropdown = el.shadowRoot?.querySelector(
        '.dropdown'
      ) as HTMLDivElement;

      faceElement?.dispatchEvent(clickEvent);

      await el.updateComplete;

      expect(el.selectedIndexes).to.eql([0, 1, 2]);
      expect(window.getComputedStyle(dropdown).getPropertyValue('display')).to.eq(
        'block'
      );

      const cancelButton = el.shadowRoot?.querySelector(
        '.buttons vscode-button:nth-child(2)'
      ) as HTMLDivElement;
      cancelButton.dispatchEvent(new MouseEvent('click'));

      await el.updateComplete;

      const labelEl = el.shadowRoot?.querySelector('.select-face .text');

      expect(el.selectedIndexes).to.eql([]);
      expect(el.selectedIndex).to.eq(-1);
      expect(el.value).to.eql('');
      expect(labelEl).lightDom.to.equal('&lt;No item selected&gt;');
    });
  });
});
