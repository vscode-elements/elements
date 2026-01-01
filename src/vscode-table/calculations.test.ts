/* eslint-disable @typescript-eslint/no-unused-expressions */
import {expect} from '@open-wc/testing';
import {Percent, percent} from '../includes/sizes.js';
import {calculateColumnWidths} from './calculations.js';

const createMinWidths = () => {
  const minWidths = new Map<number, Percent>();
  minWidths.set(0, percent(10));
  minWidths.set(2, percent(10));
  minWidths.set(3, percent(10));

  return minWidths;
};

let defaultMinWidths: Map<number, Percent>;

describe('calculateColumnWidths', () => {
  beforeEach(() => {
    defaultMinWidths = createMinWidths();
  });

  it('returns unchanged widths when delta is 0', () => {
    const widths = [percent(25), percent(25), percent(50)];

    const result = calculateColumnWidths(
      widths,
      1,
      percent(0),
      defaultMinWidths
    );

    expect(result).to.deep.equal(widths);
  });

  it('returns unchanged widths for invalid splitter index', () => {
    const widths = [percent(30), percent(30), percent(40)];

    expect(
      calculateColumnWidths(widths, -1, percent(10), defaultMinWidths)
    ).to.deep.equal(widths);
    expect(
      calculateColumnWidths(widths, 2, percent(10), defaultMinWidths)
    ).to.deep.equal(widths);
  });

  it('shrinks right column and grows left column when dragging right (delta > 0)', () => {
    const widths = [percent(30), percent(30), percent(40)];

    const result = calculateColumnWidths(
      widths,
      1,
      percent(10),
      defaultMinWidths
    );

    expect(result).to.deep.equal([percent(30), percent(40), percent(30)]);
  });

  it('shrinks left column and grows right column when dragging left (delta < 0)', () => {
    const widths = [percent(30), percent(30), percent(40)];

    const result = calculateColumnWidths(
      widths,
      1,
      percent(-10),
      defaultMinWidths
    );

    expect(result).to.deep.equal([percent(30), percent(20), percent(50)]);
  });

  it('respects minWidth when shrinking', () => {
    const widths = [percent(30), percent(20), percent(50)];

    const minWidths = new Map<number, Percent>();
    minWidths.set(0, percent(20));
    minWidths.set(1, percent(20));
    minWidths.set(2, percent(20));

    const result = calculateColumnWidths(widths, 0, percent(15), minWidths);

    // right side shrinks, left side grows
    expect(result).to.deep.equal([percent(45), percent(20), percent(35)]);
  });

  it.skip('shrinks multiple columns sequentially when needed', () => {
    const widths = [percent(40), percent(30), percent(30)];

    const result = calculateColumnWidths(
      widths,
      0,
      percent(25),
      defaultMinWidths
    );

    expect(result).to.deep.equal([percent(65), percent(10), percent(25)]);
  });

  it.skip('aborts if total available shrink space is insufficient', () => {
    const widths = [percent(40), percent(15), percent(45)];

    const result = calculateColumnWidths(
      widths,
      0,
      percent(20),
      defaultMinWidths
    );
    expect(result).to.not.deep.equal(widths);

    const impossible = calculateColumnWidths(
      widths,
      0,
      percent(50),
      defaultMinWidths
    );
    expect(impossible).to.deep.equal(widths);
  });

  it('only grows the nearest column on the growing side', () => {
    const widths = [percent(20), percent(40), percent(40)];

    const result = calculateColumnWidths(
      widths,
      1,
      percent(10),
      defaultMinWidths
    );

    expect(result).to.deep.equal([percent(20), percent(50), percent(30)]);
  });

  it('preserves total width sum', () => {
    const widths = [percent(25), percent(25), percent(50)];

    const result = calculateColumnWidths(
      widths,
      0,
      percent(15),
      defaultMinWidths
    );

    const sum = (arr: Percent[]) => arr.reduce((a, b) => a + b, 0);

    expect(sum(result)).to.equal(sum(widths));
  });
});
