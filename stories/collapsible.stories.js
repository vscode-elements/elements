import { document } from 'global';
import withVscodeThemes from './utils/withVscodeThemes';

export default {
  title: 'Collapsible',
  decorators: [
    withVscodeThemes,
  ]
};

export const defaultState = () => `
  <vscode-collapsible title="Collapsible example">
    <div slot="body">
      <p>test content</p>
      <p>test content</p>
      <p>test content</p>
      <p>test content</p>
      <p>test content</p>
      <p>test content</p>
    </div>
  </vscode-collapsible>
`;
defaultState.story = {
  name: 'Default',
};
