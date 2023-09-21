import {VscodeTextarea} from '../vscode-textarea/index.js';
import '../vscode-textarea';
import {expect} from '@open-wc/testing';

describe('vscode-textarea', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-textarea');
    expect(el).to.instanceOf(VscodeTextarea);
  });
});
