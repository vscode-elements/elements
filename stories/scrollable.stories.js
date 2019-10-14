import { document } from 'global';
import withVscodeThemes from './utils/withVscodeThemes';

export default {
  title: 'Scrollable',
  decorators: [
    withVscodeThemes,
  ]
};

export const defaultState = () => `
  <vscode-scrollable style="width: 200px; height: 200px;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales vitae magna bibendum consequat. Morbi facilisis lacus quis semper ultrices. Nullam egestas ipsum at lorem luctus, eget tempor tellus malesuada. Aliquam erat volutpat. Nam molestie lorem eu erat molestie facilisis. Aliquam vitae ultrices metus. Morbi quis nisi ac diam cursus eleifend. Quisque aliquet lorem non ultricies euismod. Nulla in massa mi. Aliquam semper massa sodales vehicula egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin placerat dignissim ornare. Nullam bibendum semper dui vitae pulvinar. Sed viverra aliquet quam vulputate elementum. Suspendisse mattis gravida rutrum.
  </vscode-scrollable>
`;
defaultState.story = {
  name: 'Default',
};
