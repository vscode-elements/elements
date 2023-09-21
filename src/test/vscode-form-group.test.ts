import {VscodeFormGroup} from '../vscode-form-group/index.js';
import {expect} from '@open-wc/testing';

describe('vscode-form-group', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-form-group');
    expect(el).to.instanceOf(VscodeFormGroup);
  });
});
