import withVscodeThemes from './withVscodeThemes';

export default {
  title: 'Context menu',
  decorators: [
    withVscodeThemes,
  ]
};

export const defaultState = () => `
  <vscode-context-menu>
    <vscode-context-menu-item label="Lorem"></vscode-context-menu-item>
    <vscode-context-menu-item label="Ipsum"></vscode-context-menu-item>
  </vscode-context-menu>
`;
defaultState.story = {
  name: 'Default',
};
