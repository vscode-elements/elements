import {VscodeProgressRing} from './index.js';
import {expect} from '@open-wc/testing';

describe('vscode-progress-ring', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-progress-ring');
    expect(el).to.instanceOf(VscodeProgressRing);
  });
});
