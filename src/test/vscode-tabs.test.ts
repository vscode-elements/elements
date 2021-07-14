import {VscodeTabs} from '../vscode-tabs';
import {expect} from '@open-wc/testing';

describe('vscode-tabs', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-tabs');
    expect(el).to.instanceOf(VscodeTabs);
  });
});
