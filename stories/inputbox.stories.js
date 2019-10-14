import { document } from 'global';
import withVscodeThemes from './utils/withVscodeThemes';

export default {
  title: 'Inputbox',
  decorators: [
    withVscodeThemes,
  ]
};

export const defaultState = () => `
  <vscode-inputbox></vscode-inputbox>
`;
defaultState.story = {
  name: 'Default',
};
