import {expect} from '@open-wc/testing';
import {
  fuzzyMatch,
  startsWithPerTermMatch,
  startsWithMatch,
  containsMatch,
} from '../includes/vscode-select/helpers';

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

  it('startsWithPerTermMatch', () => {
    expect(startsWithMatch('Lorem ipsum', 'lo')).to.eq(true);
    expect(startsWithMatch('Lorem ipsum', 'ip')).to.eq(false);
  });

  it('containsMatch', () => {
    expect(containsMatch('Lorem ipsum', 're')).to.eq(true);
    expect(containsMatch('Lorem ipsum', 'aa')).to.eq(false);
  });
});
