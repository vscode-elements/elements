import {VscodeToolbarContainer} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-toolbar-container', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-toolbar-container');
    expect(el).to.instanceOf(VscodeToolbarContainer);
  });
});
