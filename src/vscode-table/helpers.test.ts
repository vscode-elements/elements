import {expect} from '@open-wc/testing';
import {rawValueToPercentage} from './helpers.js';

describe('vscode-table helpers', () => {
  it('input type is number', () => {
    expect(rawValueToPercentage(50, 200)).to.eq(25);
    expect(rawValueToPercentage(10.5, 200)).to.eq(5.25);
  });

  it('input type is string', () => {
    expect(rawValueToPercentage('50', 200)).to.eq(25);
    expect(rawValueToPercentage('10.5', 200)).to.eq(5.25);
  });

  it('input type is percentage', () => {
    expect(rawValueToPercentage('50%', 200)).to.eq(50);
    expect(rawValueToPercentage('10.5%', 200)).to.eq(10.5);
  });

  it('input type is pixel', () => {
    expect(rawValueToPercentage('50px', 200)).to.eq(25);
    expect(rawValueToPercentage('10.5px', 200)).to.eq(5.25);
  });

  it('input type is invalid value', () => {
    expect(rawValueToPercentage('-50%', 200)).to.eq(null);
    expect(rawValueToPercentage('auto', 200)).to.eq(null);
  });
});
