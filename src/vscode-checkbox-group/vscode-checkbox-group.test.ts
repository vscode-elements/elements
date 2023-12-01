import {VscodeCheckboxGroup} from './index.js';
import {expect} from '@open-wc/testing';
import '../vscode-option/index.js';

describe('vscode-checkbox-group', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-checkbox-group');
    expect(el).to.instanceOf(VscodeCheckboxGroup);
  });
});
