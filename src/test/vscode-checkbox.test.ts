import {VscodeCheckbox} from '../vscode-checkbox';
import {expect} from '@open-wc/testing';

describe('vscode-checkbox', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-checkbox');
    expect(el).to.instanceOf(VscodeCheckbox);
  });
});
