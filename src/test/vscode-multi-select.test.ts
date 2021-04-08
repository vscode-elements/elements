import {VscodeMultiSelect} from '../vscode-select/vscode-multi-select';
import {expect, fixture, html} from '@open-wc/testing';
import '../vscode-select/vscode-option';

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

    expect(el).shadowDom.to.equal(`
      <slot class="main-slot"></slot>
      <div class="multiselect select-face">
        <span class="select-face-badge">
          1 item selected
        </span>
        <span class="icon">
        </span>
      </div>
    `);
    expect(el.selectedIndexes).to.eql([1]);
    expect(el.value).to.eql(['Ipsum']);
  });
});
