import sinon from 'sinon';
import {VscodeToolbarButton} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';
import {clickOnElement} from '../includes/test-helpers.js';

describe('vscode-toolbar-button', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-toolbar-button');
    expect(el).to.instanceOf(VscodeToolbarButton);
  });

  it('is accessible', async () => {
    const el = await fixture(
      html`<vscode-toolbar-button icon="account" toggleable checked
        >Test button</vscode-toolbar-button
      >`
    );

    await expect(el).to.be.accessible();
  });

  it('sets accessible label to icon button', async () => {
    const el = await fixture(
      html`<vscode-toolbar-button
        icon="account"
        label="Test label"
      ></vscode-toolbar-button>`
    );

    await expect(el).to.be.accessible();
  });

  it('dispatch change event', async () => {
    const el = await fixture(
      html`<vscode-toolbar-button
        icon="account"
        label="Test label"
        toggleable
      ></vscode-toolbar-button>`
    );
    const spy = sinon.spy();
    el.addEventListener('change', spy);

    await clickOnElement(el);

    expect(spy.called).to.be.true;
  });
});
