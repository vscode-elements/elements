import {expect} from '@open-wc/testing';
import {
  fuzzyMatch,
  startsWithPerTermMatch,
  startsWithMatch,
  containsMatch,
  startsWithPerTermSearch,
} from './helpers.js';

describe('helpers', () => {
  it('fuzzyMatch', () => {
    expect(fuzzyMatch('Lorem ipsum', 'ri')).to.eq(true);
    expect(fuzzyMatch('Lorem ipsum', 'um')).to.eq(true);
    expect(fuzzyMatch('Lorem ipsum', 'io')).to.eq(false);
  });

  it('startsWithPerTermMatch', () => {
    expect(startsWithPerTermMatch('Lorem ipsum', 'lo')).to.eq(true);
    expect(startsWithPerTermMatch('Lorem ipsum', 'ip')).to.eq(true);
    expect(startsWithPerTermMatch('Lorem ipsum', 'or')).to.eq(false);
  });

  it('startsWithPerTermSearch', () => {
    const result = startsWithPerTermSearch(
      "I think Ruth's dog is cuter than your dog!",
      'dog'
    );

    expect(result.match).to.eq(true);
    expect(result.ranges).to.eql([
      [15, 18],
      [38, 41],
    ]);
  });

  it('startsWithPerTermSearch 2', () => {
    const result = startsWithPerTermSearch(
      "I think Ruth's dog is cuter than your dog!",
      'uth'
    );

    expect(result.match).to.eq(false);
    expect(result.ranges).to.eql([]);
  });

  it('startsWithPerTermMatch', () => {
    expect(startsWithMatch('Lorem ipsum', 'lo')).to.eq(true);
    expect(startsWithMatch('Lorem ipsum', 'ip')).to.eq(false);
  });

  it('containsMatch', () => {
    expect(containsMatch('Lorem ipsum', 're')).to.eq(true);
    expect(containsMatch('Lorem ipsum', 'aa')).to.eq(false);
  });
});
