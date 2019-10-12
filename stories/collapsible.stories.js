import { document } from 'global';

export default {
  title: 'Collapsible',
  decorators: [
    (story) => {
      document.body.classList.add('vscode-light');
      return story();
    }
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
