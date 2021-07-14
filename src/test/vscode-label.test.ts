import {VscodeLabel} from '../vscode-label';
import {expect} from '@open-wc/testing';

describe('vscode-label', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-label');
    expect(el).to.instanceOf(VscodeLabel);
  });
});
