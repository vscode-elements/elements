import {expect, fixture, html} from '@open-wc/testing';
import {
  containsSearch,
  fuzzySearch,
  highlightRanges,
  startsWithPerTermSearch,
  startsWithSearch,
} from './helpers.js';

describe('helpers', () => {
  it('fuzzySearch should match', () => {
    const result = fuzzySearch(
      "I think Ruth's dog is cuter than your dog!",
      'hnu'
    );

    expect(result.match).to.eq(true);
    expect(result.ranges).to.eql([
      [3, 4],
      [5, 6],
      [9, 10],
    ]);
  });

  it('fuzzySearch should not match', () => {
    const result = fuzzySearch(
      "I think Ruth's dog is cuter than your dog!",
      'ruk'
    );

    expect(result.match).to.eq(false);
    expect(result.ranges).to.eql([]);
  });

  it('startsWithPerTermSearch should match', () => {
    const result = startsWithPerTermSearch(
      "I think Ruth's dog is cuter than your dog!",
      'dog'
    );

    expect(result.match).to.eq(true);
    expect(result.ranges).to.eql([[15, 18]]);
  });

  it('startsWithPerTermSearch should not match', () => {
    const result = startsWithPerTermSearch(
      "I think Ruth's dog is cuter than your dog!",
      'uth'
    );

    expect(result.match).to.eq(false);
    expect(result.ranges).to.eql([]);
  });

  it('containsSearch should match', () => {
    const result = containsSearch(
      "I think Ruth's dog is cuter than your dog!",
      'uth'
    );

    expect(result.match).to.eq(true);
    expect(result.ranges).to.eql([[9, 12]]);
  });

  it('containsSearch should not match', () => {
    const result = containsSearch(
      "I think Ruth's dog is cuter than your dog!",
      'htu'
    );

    expect(result.match).to.eq(false);
    expect(result.ranges).to.eql([]);
  });

  it('startsWithSearch should match', () => {
    const result = startsWithSearch(
      "I think Ruth's dog is cuter than your dog!",
      'I think'
    );

    expect(result.match).to.eq(true);
    expect(result.ranges).to.eql([[0, 7]]);
  });

  it('startsWithSearch should not match', () => {
    const result = startsWithSearch(
      "I think Ruth's dog is cuter than your dog!",
      'think'
    );

    expect(result.match).to.eq(false);
    expect(result.ranges).to.eql([]);
  });

  describe('highlightRanges', () => {
    it('should highlight ranges', async () => {
      const el = await fixture(
        html`<span
          >${highlightRanges('lorem ipsum dolor', [
            [1, 4],
            [7, 10],
            [13, 16],
          ])}</span
        >`
      );

      expect(el).lightDom.to.equals('l<b>ore</b>m i<b>psu</b>m d<b>olo</b>r');
    });

    it('should highlight range correctly at start', async () => {
      const el = await fixture(
        html`<span>${highlightRanges('lorem ipsum dolor', [[0, 2]])}</span>`
      );

      expect(el).lightDom.to.equals('<b>lo</b>rem ipsum dolor');
    });

    it('should highlight range correctly at end', async () => {
      const el = await fixture(
        html`<span>${highlightRanges('lorem ipsum dolor', [[15, 17]])}</span>`
      );

      expect(el).lightDom.to.equals('lorem ipsum dol<b>or</b>');
    });

    it('should render spaces correctly', async () => {
      const el = await fixture(
        html`<span>${highlightRanges('lorem ipsum dolor', [[5, 17]])}</span>`
      );

      expect(el).lightDom.to.equals('lorem<b> ipsum dolor</b>');
    });
  });
});
