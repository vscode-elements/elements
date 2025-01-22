import {VscodeTable} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-table', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-table');
    expect(el).to.instanceOf(VscodeTable);
  });

  it('should not throw when removed from the DOM', () => {
    const el = document.createElement('vscode-table');
    document.body.append(el);

    expect(() => el.remove()).not.to.throw();
  });
});
