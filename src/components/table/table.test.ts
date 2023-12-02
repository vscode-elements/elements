import {VscTable} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-table', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-table');
    expect(el).to.instanceOf(VscTable);
  });
});
