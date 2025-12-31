/* eslint-disable @typescript-eslint/no-unused-expressions */
import {expect} from '@open-wc/testing';
import {
  calculateColumnWidths,
  parseSizeAttributeToPercent,
  Percent,
  percent,
} from './calculations.js';

describe('parseSizeAttributeToPercent', () => {
  const base = 200;

  // number input
  it('should parse valid number input', () => {
    expect(parseSizeAttributeToPercent(50, base)).to.equal(25);
    expect(parseSizeAttributeToPercent(0, base)).to.equal(0);
    expect(parseSizeAttributeToPercent(200, base)).to.equal(100);
    expect(parseSizeAttributeToPercent(-50, base)).to.equal(-25);
  });

  it('should return null for invalid number input', () => {
    expect(parseSizeAttributeToPercent(NaN, base)).to.be.null;
    expect(parseSizeAttributeToPercent(Infinity, base)).to.be.null;
    expect(parseSizeAttributeToPercent(-Infinity, base)).to.be.null;
  });

  // string number input
  it('should parse valid string number', () => {
    expect(parseSizeAttributeToPercent('50', base)).to.equal(25);
    expect(parseSizeAttributeToPercent('0', base)).to.equal(0);
    expect(parseSizeAttributeToPercent('100.5', base)).to.be.closeTo(
      50.25,
      0.0001
    );
    expect(parseSizeAttributeToPercent('-50', base)).to.equal(-25);
    expect(parseSizeAttributeToPercent('   50  ', base)).to.equal(25);
  });

  it('should return null for invalid string number', () => {
    expect(parseSizeAttributeToPercent('abc', base)).to.be.null;
    expect(parseSizeAttributeToPercent('50abc', base)).to.be.null;
    expect(parseSizeAttributeToPercent('', base)).to.be.null;
    expect(parseSizeAttributeToPercent('   ', base)).to.be.null;
    expect(parseSizeAttributeToPercent('NaN', base)).to.be.null;
  });

  // px input
  it('should parse valid px input', () => {
    expect(parseSizeAttributeToPercent('50px', base)).to.equal(25);
    expect(parseSizeAttributeToPercent('0px', base)).to.equal(0);
    expect(parseSizeAttributeToPercent('100.5px', base)).to.be.closeTo(
      50.25,
      0.0001
    );
    expect(parseSizeAttributeToPercent('-50px', base)).to.equal(-25);
    expect(parseSizeAttributeToPercent('   50px  ', base)).to.equal(25);
  });

  it('should return null for invalid px input', () => {
    expect(parseSizeAttributeToPercent('50p', base)).to.be.null;
    expect(parseSizeAttributeToPercent('px', base)).to.be.null;
    expect(parseSizeAttributeToPercent('50px%', base)).to.be.null;
  });

  // percent input
  it('should parse valid percent input', () => {
    expect(parseSizeAttributeToPercent('25%', base)).to.equal(25);
    expect(parseSizeAttributeToPercent('0%', base)).to.equal(0);
    expect(parseSizeAttributeToPercent('100%', base)).to.equal(100);
    expect(parseSizeAttributeToPercent('50.5%', base)).to.be.closeTo(
      50.5,
      0.0001
    );
    expect(parseSizeAttributeToPercent('-20%', base)).to.equal(-20);
    expect(parseSizeAttributeToPercent('   30%  ', base)).to.equal(30);
  });

  it('should return null for invalid percent input', () => {
    expect(parseSizeAttributeToPercent('%', base)).to.be.null;
    expect(parseSizeAttributeToPercent('20%%', base)).to.be.null;
    expect(parseSizeAttributeToPercent('abc%', base)).to.be.null;
    expect(parseSizeAttributeToPercent('50%px', base)).to.be.null;
  });

  // invalid base
  it('should return null for invalid base', () => {
    expect(parseSizeAttributeToPercent('50', 0)).to.be.null;
    expect(parseSizeAttributeToPercent('50', NaN)).to.be.null;
    expect(parseSizeAttributeToPercent('50', Infinity)).to.be.null;
    expect(parseSizeAttributeToPercent(50, 0)).to.be.null;
  });
});

describe('calculateColumnWidths', () => {
  it('returns unchanged widths when delta is 0', () => {
    const widths = [percent(25), percent(25), percent(50)];

    const result = calculateColumnWidths(widths, 1, percent(0), percent(10));

    expect(result).to.deep.equal(widths);
  });

  it('returns unchanged widths for invalid splitter index', () => {
    const widths = [percent(30), percent(30), percent(40)];

    expect(
      calculateColumnWidths(widths, -1, percent(10), percent(10))
    ).to.deep.equal(widths);
    expect(
      calculateColumnWidths(widths, 2, percent(10), percent(10))
    ).to.deep.equal(widths);
  });

  it('shrinks right column and grows left column when dragging right (delta > 0)', () => {
    const widths = [percent(30), percent(30), percent(40)];

    const result = calculateColumnWidths(widths, 1, percent(10), percent(10));

    expect(result).to.deep.equal([percent(30), percent(40), percent(30)]);
  });

  it('shrinks left column and grows right column when dragging left (delta < 0)', () => {
    const widths = [percent(30), percent(30), percent(40)];

    const result = calculateColumnWidths(widths, 1, percent(-10), percent(10));

    expect(result).to.deep.equal([percent(30), percent(20), percent(50)]);
  });

  it('respects minWidth when shrinking', () => {
    const widths = [percent(30), percent(20), percent(50)];

    const result = calculateColumnWidths(widths, 0, percent(15), percent(20));

    // right side shrinks, left side grows
    expect(result).to.deep.equal([percent(45), percent(20), percent(35)]);
  });

  it('shrinks multiple columns sequentially when needed', () => {
    const widths = [percent(40), percent(30), percent(30)];

    const result = calculateColumnWidths(widths, 0, percent(25), percent(10));

    expect(result).to.deep.equal([percent(65), percent(10), percent(25)]);
  });

  it('aborts if total available shrink space is insufficient', () => {
    const widths = [percent(40), percent(15), percent(45)];

    const result = calculateColumnWidths(widths, 0, percent(20), percent(10));
    expect(result).to.not.deep.equal(widths);

    const impossible = calculateColumnWidths(
      widths,
      0,
      percent(50),
      percent(10)
    );
    expect(impossible).to.deep.equal(widths);
  });

  it('only grows the nearest column on the growing side', () => {
    const widths = [percent(20), percent(40), percent(40)];

    const result = calculateColumnWidths(widths, 1, percent(10), percent(10));

    expect(result).to.deep.equal([percent(20), percent(50), percent(30)]);
  });

  it('preserves total width sum', () => {
    const widths = [percent(25), percent(25), percent(50)];

    const result = calculateColumnWidths(widths, 0, percent(15), percent(10));

    const sum = (arr: Percent[]) => arr.reduce((a, b) => a + b, 0);

    expect(sum(result)).to.equal(sum(widths));
  });
});
