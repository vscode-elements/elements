import {VscodeRadio} from '../vscode-radio/index.js';
import {expect} from '@open-wc/testing';

describe('vscode-radio', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-radio');
    expect(el).to.instanceOf(VscodeRadio);
  });
});
