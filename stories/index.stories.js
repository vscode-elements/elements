import { document, console } from 'global';
import { withKnobs, text, boolean, number, radios } from '@storybook/addon-knobs';

export default {
  title: 'Demo',
  decorators: [withKnobs]
};

export const heading = () => '<h1>Hello World</h1>';

export const button = () => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = 'Hello Button';
  btn.addEventListener('click', e => console.log(e));
  return btn;
};

export const greeterElement = () => {
  const cmp = document.createElement('greeter-element');

  cmp.name = 'World';

  return cmp;
}

export const vscodeTextarea = () => {
  const cmp = document.createElement('vscode-textarea');

  cmp.message = text('message', '');
  cmp.messageSeverity = radios('Message severity', {
    info: 'info',
    warning: 'warning',
    error: 'error',
  });
  cmp.multiline = boolean('multiline', false);

  return cmp;
}
