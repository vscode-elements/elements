import { document, console } from 'global';
import { withKnobs, text, boolean, number, radios } from '@storybook/addon-knobs';
import withVscodeThemes from './withVscodeThemes';

export default {
  title: 'Checkbox',
  decorators: [
    withKnobs,
    withVscodeThemes,
  ]
};

export const defaultState = () => '<vscode-checkbox label="Checkbox test"></vscode-checkbox>';
defaultState.story = {
  name: 'Default',
};

export const slottedContent = () => '<vscode-checkbox>Accept <a href="#">EULA</a></vscode-checkbox>';
