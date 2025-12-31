import {expect} from '@open-wc/testing';
import {parseSizeAttributeToPercent} from './calculations.js';

describe('parseSizeAttributeToPercent', () => {
  it('input type is number', () => {
    expect(parseSizeAttributeToPercent(50, 200)).to.eq(25);
    expect(parseSizeAttributeToPercent(10.5, 200)).to.eq(5.25);
  });

  it('input type is string', () => {
    expect(parseSizeAttributeToPercent('50', 200)).to.eq(25);
    expect(parseSizeAttributeToPercent('10.5', 200)).to.eq(5.25);
  });

  it('input type is percentage', () => {
    expect(parseSizeAttributeToPercent('50%', 200)).to.eq(50);
    expect(parseSizeAttributeToPercent('10.5%', 200)).to.eq(10.5);
  });

  it('input type is pixel', () => {
    expect(parseSizeAttributeToPercent('50px', 200)).to.eq(25);
    expect(parseSizeAttributeToPercent('10.5px', 200)).to.eq(5.25);
  });

  it('input type is invalid value', () => {
    expect(parseSizeAttributeToPercent('-50%', 200)).to.eq(null);
    expect(parseSizeAttributeToPercent('auto', 200)).to.eq(null);
  });
});
