import {VscodeCollapsible} from '../vscode-collapsible';
import {expect} from '@open-wc/testing';

describe('vscode-collapsible', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-collapsible');
    expect(el).to.instanceOf(VscodeCollapsible);
  });
});
