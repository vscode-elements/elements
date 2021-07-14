import {VscodeButton} from '../vscode-button';
import {expect} from '@open-wc/testing';
import '../vscode-option';

describe('vscode-button', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-button');
    expect(el).to.instanceOf(VscodeButton);
  });
});
