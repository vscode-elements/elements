import withVscodeThemes from './withVscodeThemes';
import { withKnobs, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Context menu',
  decorators: [
    withKnobs,
    withVscodeThemes,
  ]
};

export const defaultState = () => {
  const menu = document.createElement('vscode-context-menu');

  const data = [
    {
      label: 'Command Palette...',
      keybinding: 'Ctrl+Shift+P',
      value: 'Custom value',
      tabindex: '0',
    },
    {
      separator: true,
    },
    {
      label: 'Settings',
      keybinding: 'Ctrl+,',
    },
    {
      label: 'Online Services Settings',
    },
    {
      label: 'Extensions',
      keybinding: 'Ctrl+Shift+X',
    },
    {
      separator: true,
    },
    {
      label: 'Keyboard shortcuts',
      keybinding: 'Ctrl+K Ctrl+S',
    },
    {
      label: 'Keymaps',
      keybinding: 'Ctrl+K Ctrl+M',
    },
    {
      separator: true,
    },
    {
      label: 'User snippets',
    },
    {
      separator: true,
    },
    {
      label: 'Color Theme',
      keybinding: 'Ctrl+K Ctrl+T',
    },
    {
      label: 'File Icon Theme',
    },
    {
      separator: true,
    },
    {
      label: 'Check for Updates...',
    },
  ];

  menu.data = data;
  menu.style.display = 'flex';
  menu.show = boolean('show', true);

  menu.addEventListener('vsc-select', (event) => {
    console.log(event);
  });

  return menu;
};

defaultState.story = {
  name: 'Default',
};
