import sinon from 'sinon';
import {VscodeButton} from './index.js';
import {expect, fixture, html} from '@open-wc/testing';
import {$} from '../includes/test-helpers.js';

describe('vscode-button', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-button');
    expect(el).to.instanceOf(VscodeButton);
  });

  it('is accessible', async () => {
    const el = await fixture(html`<vscode-button>Test button</vscode-button>`);

    await expect(el).to.be.accessible();
  });

  it('is focused automatically', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button autofocus>test</vscode-button>`
    );

    expect(el.focused).to.be.true;
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

  it('is disabled', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button></vscode-button>`
    );
    el.disabled = true;
    await el.updateComplete;

    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.tabIndex).to.eq(-1);
  });

  it('is secondary', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button></vscode-button>`
    );
    el.secondary = true;
    await el.updateComplete;

    expect(el.hasAttribute('secondary')).to.be.true;
  });

  it('icon is set', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button icon="account"></vscode-button>`
    );

    expect(el).shadowDom.to.eq(
      `
      <div class="base" part="base">
        <slot name="content-before"></slot>
        <vscode-icon name="account" class="icon"></vscode-icon>
        <slot></slot>
        <slot name="content-after"></slot>
      </div>
    `
    );
  });

  it('iconSpin is set', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button icon="account" icon-spin></vscode-button>`
    );

    expect(el).shadowDom.to.eq(
      `
      <div class="base" part="base">
        <slot name="content-before"></slot>
        <vscode-icon name="account" spin class="icon"></vscode-icon>
        <slot></slot>
        <slot name="content-after"></slot>
      </div>
    `
    );
  });

  it('iconSpinDuration is set', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button
        icon="account"
        icon-spin-duration="5"
      ></vscode-button>`
    );

    expect(el).shadowDom.to.eq(
      `
      <div class="base" part="base">
        <slot name="content-before"></slot>
        <vscode-icon name="account" class="icon" spin-duration="5"></vscode-icon>
        <slot></slot>
        <slot name="content-after"></slot>
      </div>
    `
    );
  });

  it('iconAfter is set', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button icon-after="account"></vscode-button>`
    );

    expect(el).shadowDom.to.eq(
      `
      <div class="base" part="base">
        <slot name="content-before"></slot>
        <slot></slot>
        <vscode-icon name="account" class="icon-after"></vscode-icon>
        <slot name="content-after"></slot>
      </div>
    `
    );
  });

  it('iconAfterSpin is set', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button icon-after="account" icon-after-spin></vscode-button>`
    );

    expect(el).shadowDom.to.eq(
      `
      <div class="base" part="base">
        <slot name="content-before"></slot>
        <slot></slot>
        <vscode-icon name="account" class="icon-after" spin></vscode-icon>
        <slot name="content-after"></slot>
      </div>
    `
    );
  });

  it('iconAfterSpinDuration is set', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button
        icon-after="account"
        icon-after-spin-duration="5"
      ></vscode-button>`
    );

    expect(el).shadowDom.to.eq(
      `
      <div class="base" part="base">
        <slot name="content-before"></slot>
        <slot></slot>
        <vscode-icon name="account" class="icon-after" spin-duration="5"></vscode-icon>
        <slot name="content-after"></slot>
      </div>
    `
    );
  });

  it('resets the assigned form', async () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.setAttribute('value', 'Default value');

    const el = await fixture<VscodeButton>(
      html`<vscode-button type="reset">Reset</vscode-button>`,
      {parentNode: form}
    );

    form.appendChild(input);
    input.value = 'Modified value';
    el.dispatchEvent(new MouseEvent('click'));

    expect(input.value).to.eq('Default value');
  });

  it('submit the assigned form', async () => {
    const submitSpy = sinon.spy((ev) => {
      ev.preventDefault();
    });
    const form = document.createElement('form');
    form.addEventListener('submit', submitSpy);

    const el = await fixture<VscodeButton>(
      html`<vscode-button type="submit">Submit</vscode-button>`,
      {parentNode: form}
    );

    el.dispatchEvent(new MouseEvent('click'));

    expect(submitSpy.called).to.be.true;
  });

  it('adds custom class to wrapper if content-before slot is not empty', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button><b slot="content-before">b</b></vscode-button>`
    );

    const base = $(el.shadowRoot!, '.base');

    expect(base.classList.contains('has-content-before')).to.be.true;
  });

  it('adds custom class to wrapper if content-after slot is not empty', async () => {
    const el = await fixture<VscodeButton>(
      html`<vscode-button><b slot="content-after">b</b></vscode-button>`
    );

    const base = $(el.shadowRoot!, '.base');

    expect(base.classList.contains('has-content-after')).to.be.true;
  });

  it('sets the form value');
});
