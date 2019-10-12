import { document } from 'global';

export default {
  title: 'Icon',
  decorators: [
    (story) => {
      document.body.classList.add('vscode-light');
      return story();
    }
  ]
};

export const defaultState = () => `
  <vscode-icon name="activate-breakpoints"></vscode-icon>
  <vscode-icon name="add"></vscode-icon>
  <vscode-icon name="archive"></vscode-icon>
  <vscode-icon name="array"></vscode-icon>
  <vscode-icon name="arrow-both"></vscode-icon>
`;
defaultState.story = {
  name: 'Default',
};

export const largerSize = () => `
  <vscode-icon name="files" size="24"></vscode-icon>
  <vscode-icon name="search" size="24"></vscode-icon>
  <vscode-icon name="source-control" size="24"></vscode-icon>
  <vscode-icon name="debug" size="24"></vscode-icon>
  <vscode-icon name="extensions" size="24"></vscode-icon>
`;
