import {VscodeFormContainer} from '../vscode-form-container';
import {expect} from '@open-wc/testing';

describe('vscode-form-container', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-form-container');
    expect(el).to.instanceOf(VscodeFormContainer);
  });
});
