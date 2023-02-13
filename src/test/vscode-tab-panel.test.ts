import {VscodeTabPanel} from '../vscode-tab-panel';
import {expect} from '@open-wc/testing';

describe('vscode-tab-panel', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-tab-panel');
    expect(el).to.instanceOf(VscodeTabPanel);
  });
});
