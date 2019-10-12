import { document } from 'global';

export default {
  title: 'Inputbox',
  decorators: [
    (story) => {
      document.body.classList.add('vscode-light');
      return story();
    }
  ]
};

export const defaultState = () => `
  <vscode-inputbox></vscode-inputbox>
`;
defaultState.story = {
  name: 'Default',
};
