import {VscodeScrollable} from '../vscode-scrollable';
import {expect} from '@open-wc/testing';

describe('vscode-scrollable', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-scrollable');
    expect(el).to.instanceOf(VscodeScrollable);
  });
});
