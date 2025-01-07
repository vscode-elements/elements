import sinon from 'sinon';
import {VscodeButton} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';

describe('vscode-button', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-button');
    expect(el).to.instanceOf(VscodeButton);
  });

  it('dispatches click event when enter key is pressed', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button>test</vscode-button>`
    );
    const spy = sinon.spy();

    el.addEventListener('click', spy);
    el.focus();
    el.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));

    expect(spy.called).to.be.true;
  });

  it('dispatches click event when space key is pressed', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button>test</vscode-button>`
    );
    const spy = sinon.spy();

    el.addEventListener('click', spy);
    el.focus();
    el.dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));

    expect(spy.called).to.be.true;
  });

  // TODO
  it('is disabled');
  it('is secondary');
  it('icon is set');
  it('iconSpin is set');
  it('iconSpinDuration is set');
  it('iconAfter is set');
  it('iconAfterSpin is set');
  it('iconAfterSpinDuration is set');
  it('reset the assigned form');
  it('submit the assigned form');
  it('sets the form value');
});
