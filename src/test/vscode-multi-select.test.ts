import {VscodeMultiSelect} from '../vscode-select/vscode-multi-select';
import {expect, fixture, html} from '@open-wc/testing';
import sinon from 'sinon';
import '../vscode-select/vscode-option';

describe('vscode-multi-select', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-multi-select');
    expect(el).to.instanceOf(VscodeMultiSelect);
  });
});
