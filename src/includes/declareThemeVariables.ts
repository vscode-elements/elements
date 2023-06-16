import {unsafeCSS} from 'lit';

type ThemeKind = 'dark' | 'light' | 'high-contrast' | 'high-contrast-light';

type VscodeThemeVariableName =
  | '--vsc-foreground-translucent'
  | '--vscode-activityBarBadge-background'
  | '--vscode-activityBarBadge-foreground'
  | '--vscode-badge-background'
  | '--vscode-badge-foreground'
  | '--vscode-button-background'
  | '--vscode-button-border'
  | '--vscode-button-foreground'
  | '--vscode-button-hoverBackground'
  | '--vscode-button-secondaryBackground'
  | '--vscode-button-secondaryForeground'
  | '--vscode-button-secondaryHoverBackground'
  | '--vscode-editorGroup-border'
  | '--vscode-editor-background'
  | '--vscode-editor-font-family'
  | '--vscode-editor-font-size'
  | '--vscode-editor-font-weight'
  | '--vscode-editor-foreground'
  | '--vscode-editor-inlineValuesForeground'
  | '--vscode-focusBorder'
  | '--vscode-font-family'
  | '--vscode-font-size'
  | '--vscode-font-weight'
  | '--vscode-foreground'
  | '--vscode-icon-foreground'
  | '--vscode-input-background'
  | '--vscode-input-placeholderForeground'
  | '--vscode-keybindingTable-headerBackground'
  | '--vscode-keybindingTable-rowsBackground'
  | '--vscode-list-activeSelectionBackground'
  | '--vscode-list-activeSelectionForeground'
  | '--vscode-list-activeSelectionIconForeground'
  | '--vscode-list-focusAndSelectionOutline'
  | '--vscode-list-focusBackground'
  | '--vscode-list-focusForeground'
  | '--vscode-list-focusOutline'
  | '--vscode-list-focusAndSelectionOutline'
  | '--vscode-list-hoverBackground'
  | '--vscode-list-hoverForeground'
  | '--vscode-list-inactiveFocusBackground'
  | '--vscode-list-inactiveFocusOutline'
  | '--vscode-list-inactiveSelectionBackground'
  | '--vscode-list-inactiveSelectionForeground'
  | '--vscode-list-inactiveSelectionIconForeground'
  | '--vscode-menu-background'
  | '--vscode-menu-border'
  | '--vscode-menu-foreground'
  | '--vscode-menu-selectionBackground'
  | '--vscode-menu-selectionBorder'
  | '--vscode-menu-selectionForeground'
  | '--vscode-menu-separatorBackground'
  | '--vscode-panel-background'
  | '--vscode-panelTitle-activeBorder'
  | '--vscode-panelTitle-activeForeground'
  | '--vscode-panelTitle-inactiveForeground'
  | '--vscode-sash-hoverBorder'
  | '--vscode-scrollbar-shadow'
  | '--vscode-scrollbarSlider-background'
  | '--vscode-scrollbarSlider-hoverBackground'
  | '--vscode-scrollbarSlider-activeBackground'
  | '--vscode-settings-checkboxBackground'
  | '--vscode-settings-checkboxBorder'
  | '--vscode-settings-checkboxForeground'
  | '--vscode-settings-dropdownBackground'
  | '--vscode-settings-dropdownBorder'
  | '--vscode-settings-dropdownListBorder'
  | '--vscode-settings-headerBorder'
  | '--vscode-settings-headerForeground'
  | '--vscode-settings-textInputBackground'
  | '--vscode-settings-textInputBorder'
  | '--vscode-settings-textInputForeground'
  | '--vscode-sideBar-background'
  | '--vscode-sideBarSectionHeader-background'
  | '--vscode-sideBarTitle-foreground'
  | '--vscode-toolbar-activeBackground'
  | '--vscode-toolbar-hoverBackground'
  | '--vscode-toolbar-hoverOutline'
  | '--vscode-tree-inactiveIndentGuidesStroke'
  | '--vscode-tree-indentGuidesStroke'
  | '--vscode-quickInputList-focusBackground'
  | '--vscode-quickInputList-focusForeground'
  | '--vscode-widget-shadow';

type FallbackThemeDefinition = Record<VscodeThemeVariableName, string>;

type DefaultStyleRegistry = Record<ThemeKind, FallbackThemeDefinition>;

const defaultStyles: DefaultStyleRegistry = {
  dark: {
    '--vsc-foreground-translucent': 'rgba(204, 204, 204, 0.9)',
    '--vscode-activityBarBadge-background': '#2188ff',
    '--vscode-activityBarBadge-foreground': '#ffffff',
    '--vscode-badge-background': '#4d4d4d',
    '--vscode-badge-foreground': '#ffffff',
    '--vscode-button-background': '#0e639c',
    '--vscode-button-border': 'transparent',
    '--vscode-button-foreground': '#ffffff',
    '--vscode-button-hoverBackground': '#1177bb',
    '--vscode-button-secondaryBackground': '#3a3d41',
    '--vscode-button-secondaryForeground': '#ffffff',
    '--vscode-button-secondaryHoverBackground': '#45494e',
    '--vscode-editor-background': '#1e1e1e',
    '--vscode-editor-font-family': 'Consolas, "Courier New", monospace',
    '--vscode-editor-font-size': '14px',
    '--vscode-editor-font-weight': 'normal',
    '--vscode-editor-foreground': '#d4d4d4',
    '--vscode-editor-inlineValuesForeground': 'rgba(255, 255, 255, 0.5)',
    '--vscode-editorGroup-border': '#444444',
    '--vscode-focusBorder': '#007fd4',
    '--vscode-font-family': '"Segoe WPC", "Segoe UI", sans-serif',
    '--vscode-font-size': '13px',
    '--vscode-font-weight': 'normal',
    '--vscode-foreground': '#cccccc',
    '--vscode-icon-foreground': '#c5c5c5',
    '--vscode-input-background': '#3c3c3c',
    '--vscode-input-placeholderForeground': '#a6a6a6',
    '--vscode-keybindingTable-headerBackground': 'rgba(204, 204, 204, 0.04)',
    '--vscode-keybindingTable-rowsBackground': 'rgba(204, 204, 204, 0.04)',
    '--vscode-list-activeSelectionBackground': '#04395e',
    '--vscode-list-activeSelectionForeground': '#ffffff',
    '--vscode-list-activeSelectionIconForeground': 'currentColor',
    '--vscode-list-focusAndSelectionOutline': '#007fd4',
    '--vscode-list-focusBackground': 'transparent',
    '--vscode-list-focusForeground': 'currentColor',
    '--vscode-list-focusOutline': '#007fd4',
    '--vscode-list-hoverBackground': '#2a2d2e',
    '--vscode-list-hoverForeground': '#cccccc',
    '--vscode-list-inactiveFocusBackground': 'transparent',
    '--vscode-list-inactiveFocusOutline': 'transparent',
    '--vscode-list-inactiveSelectionBackground': '#37373d',
    '--vscode-list-inactiveSelectionForeground': 'currentColor',
    '--vscode-list-inactiveSelectionIconForeground': 'currentColor',
    '--vscode-menu-background': '#252526',
    '--vscode-menu-border': '#454545',
    '--vscode-menu-foreground': '#cccccc',
    '--vscode-menu-selectionBackground': '#04395e',
    '--vscode-menu-selectionBorder': 'transparent',
    '--vscode-menu-selectionForeground': '#ffffff',
    '--vscode-menu-separatorBackground': '#454545',
    '--vscode-panel-background': '#1e1e1e',
    '--vscode-panelTitle-activeBorder': '#e7e7e7',
    '--vscode-panelTitle-activeForeground': '#e7e7e7',
    '--vscode-panelTitle-inactiveForeground': 'rgba(231, 231, 231, 0.6)',
    '--vscode-quickInputList-focusBackground': '#04395e',
    '--vscode-quickInputList-focusForeground': '#ffffff',
    '--vscode-sash-hoverBorder': '#007fd4',
    '--vscode-scrollbar-shadow': '#000000',
    '--vscode-scrollbarSlider-activeBackground': 'rgba(191, 191, 191, 0.4)',
    '--vscode-scrollbarSlider-background': 'rgba(121, 121, 121, 0.4)',
    '--vscode-scrollbarSlider-hoverBackground': 'rgba(100, 100, 100, 0.7)',
    '--vscode-settings-checkboxBackground': '#3c3c3c',
    '--vscode-settings-checkboxBorder': '#6b6b6b',
    '--vscode-settings-checkboxForeground': '#f0f0f0',
    '--vscode-settings-dropdownBackground': '#3c3c3c',
    '--vscode-settings-dropdownBorder': '#3c3c3c',
    '--vscode-settings-dropdownListBorder': '#454545',
    '--vscode-settings-headerBorder': 'rgba(128, 128, 128, 0.35)',
    '--vscode-settings-headerForeground': '#e7e7e7',
    '--vscode-settings-textInputBackground': '#3c3c3c',
    '--vscode-settings-textInputBorder': 'transparent',
    '--vscode-settings-textInputForeground': '#cccccc',
    '--vscode-sideBar-background': '#252526',
    '--vscode-sideBarSectionHeader-background': 'rgba(0, 0, 0, 0)',
    '--vscode-sideBarTitle-foreground': '#bbbbbb',
    '--vscode-toolbar-activeBackground': 'rgba(99, 102, 103, 0.31)',
    '--vscode-toolbar-hoverBackground': 'rgba(90, 93, 94, 0.31)',
    '--vscode-toolbar-hoverOutline': 'transparent',
    '--vscode-tree-inactiveIndentGuidesStroke': 'rgba(88, 88, 88, 0.4)',
    '--vscode-tree-indentGuidesStroke': '#585858',
    '--vscode-widget-shadow': 'rgba(0, 0, 0, 0.36)',
  },
  light: {
    '--vsc-foreground-translucent': 'rgba(97, 97, 97, 0.9)',
    '--vscode-activityBarBadge-background': '#007acc',
    '--vscode-activityBarBadge-foreground': '#ffffff',
    '--vscode-badge-background': '#c4c4c4',
    '--vscode-badge-foreground': '#333333',
    '--vscode-button-background': '#007acc',
    '--vscode-button-border': 'transparent',
    '--vscode-button-foreground': '#ffffff',
    '--vscode-button-hoverBackground': '#0062a3',
    '--vscode-button-secondaryBackground': '#5f6a79',
    '--vscode-button-secondaryForeground': '#ffffff',
    '--vscode-button-secondaryHoverBackground': '#4c5561',
    '--vscode-editor-background': '#ffffff',
    '--vscode-editor-font-family': 'Consolas, "Courier New", monospace',
    '--vscode-editor-font-size': '14px',
    '--vscode-editor-font-weight': 'normal',
    '--vscode-editor-foreground': '#000000',
    '--vscode-editor-inlineValuesForeground': 'rgba(0, 0, 0, 0.5)',
    '--vscode-editorGroup-border': '#e7e7e7',
    '--vscode-focusBorder': '#0090f1',
    '--vscode-font-family': '"Segoe WPC", "Segoe UI", sans-serif',
    '--vscode-font-size': '13px',
    '--vscode-font-weight': 'normal',
    '--vscode-foreground': '#616161',
    '--vscode-icon-foreground': '#424242',
    '--vscode-input-background': '#ffffff',
    '--vscode-input-placeholderForeground': '#767676',
    '--vscode-keybindingTable-headerBackground': 'rgba(97, 97, 97, 0.04)',
    '--vscode-keybindingTable-rowsBackground': 'rgba(97, 97, 97, 0.04)',
    '--vscode-list-activeSelectionBackground': '#0060c0',
    '--vscode-list-activeSelectionForeground': '#ffffff',
    '--vscode-list-activeSelectionIconForeground': 'currentColor',
    '--vscode-list-focusAndSelectionOutline': '#90c2f9',
    '--vscode-list-focusBackground': 'transparent',
    '--vscode-list-focusForeground': 'currentColor',
    '--vscode-list-focusOutline': '#0090f1',
    '--vscode-list-hoverBackground': '#e8e8e8',
    '--vscode-list-hoverForeground': '#616161',
    '--vscode-list-inactiveFocusBackground': 'transparent',
    '--vscode-list-inactiveFocusOutline': 'transparent',
    '--vscode-list-inactiveSelectionBackground': '#e4e6f1',
    '--vscode-list-inactiveSelectionForeground': 'currentColor',
    '--vscode-list-inactiveSelectionIconForeground': 'currentColor',
    '--vscode-menu-background': '#ffffff',
    '--vscode-menu-border': '#d4d4d4',
    '--vscode-menu-foreground': '#616161',
    '--vscode-menu-selectionBackground': '#0060c0',
    '--vscode-menu-selectionBorder': 'transparent',
    '--vscode-menu-selectionForeground': '#ffffff',
    '--vscode-menu-separatorBackground': '#d4d4d4',
    '--vscode-panel-background': '#ffffff',
    '--vscode-panelTitle-activeBorder': '#424242',
    '--vscode-panelTitle-activeForeground': '#424242',
    '--vscode-panelTitle-inactiveForeground': 'rgba(66, 66, 66, 0.75)',
    '--vscode-quickInputList-focusBackground': '#0060c0',
    '--vscode-quickInputList-focusForeground': '#ffffff',
    '--vscode-sash-hoverBorder': '#0090f1',
    '--vscode-scrollbar-shadow': '#dddddd',
    '--vscode-scrollbarSlider-activeBackground': 'rgba(0, 0, 0, 0.6)',
    '--vscode-scrollbarSlider-background': 'rgba(100, 100, 100, 0.4)',
    '--vscode-scrollbarSlider-hoverBackground': 'rgba(100, 100, 100, 0.7)',
    '--vscode-settings-checkboxBackground': '#ffffff',
    '--vscode-settings-checkboxBorder': '#919191',
    '--vscode-settings-checkboxForeground': '#616161',
    '--vscode-settings-dropdownBackground': '#ffffff',
    '--vscode-settings-dropdownBorder': '#cecece',
    '--vscode-settings-dropdownListBorder': '#c8c8c8',
    '--vscode-settings-headerBorder': 'rgba(128, 128, 128, 0.35)',
    '--vscode-settings-headerForeground': '#444444',
    '--vscode-settings-textInputBackground': '#ffffff',
    '--vscode-settings-textInputBorder': '#cecece',
    '--vscode-settings-textInputForeground': '#616161',
    '--vscode-sideBar-background': '#f3f3f3',
    '--vscode-sideBarSectionHeader-background': 'rgba(0, 0, 0, 0)',
    '--vscode-sideBarTitle-foreground': '#6f6f6f',
    '--vscode-toolbar-activeBackground': 'rgba(166, 166, 166, 0.31)',
    '--vscode-toolbar-hoverBackground': 'rgba(184, 184, 184, 0.31)',
    '--vscode-toolbar-hoverOutline': 'transparent',
    '--vscode-tree-inactiveIndentGuidesStroke': 'rgba(169, 169, 169, 0.4)',
    '--vscode-tree-indentGuidesStroke': '#a9a9a9',
    '--vscode-widget-shadow': 'rgba(0, 0, 0, 0.16)',
  },
  'high-contrast': {
    '--vsc-foreground-translucent': 'rgba(255, 255, 255, 0.9)',
    '--vscode-activityBarBadge-background': '#000000',
    '--vscode-activityBarBadge-foreground': '#ffffff',
    '--vscode-badge-background': '#000000',
    '--vscode-badge-foreground': '#ffffff',
    '--vscode-button-background': 'transparent',
    '--vscode-button-border': '#6fc3df',
    '--vscode-button-foreground': '#ffffff',
    '--vscode-button-hoverBackground': 'transparent',
    '--vscode-button-secondaryBackground': 'transparent',
    '--vscode-button-secondaryForeground': '#ffffff',
    '--vscode-button-secondaryHoverBackground': 'transparent',
    '--vscode-editor-background': '#000000',
    '--vscode-editor-font-family': 'Consolas, "Courier New", monospace',
    '--vscode-editor-font-size': '14px',
    '--vscode-editor-font-weight': 'normal',
    '--vscode-editor-foreground': '#ffffff',
    '--vscode-editor-inlineValuesForeground': 'rgba(255, 255, 255, 0.5)',
    '--vscode-editorGroup-border': '#6fc3df',
    '--vscode-focusBorder': '#f38518',
    '--vscode-font-family': '"Segoe WPC", "Segoe UI", sans-serif',
    '--vscode-font-size': '13px',
    '--vscode-font-weight': 'normal',
    '--vscode-foreground': '#616161',
    '--vscode-icon-foreground': '#ffffff',
    '--vscode-input-background': '#000000',
    '--vscode-input-placeholderForeground': 'rgba(255, 255, 255, 0.7)',
    '--vscode-keybindingTable-headerBackground': 'transparent',
    '--vscode-keybindingTable-rowsBackground': 'transparent',
    '--vscode-list-activeSelectionBackground': '#000000',
    '--vscode-list-activeSelectionForeground': '#ffffff',
    '--vscode-list-activeSelectionIconForeground': 'currentColor',
    '--vscode-list-focusAndSelectionOutline': '#f38518',
    '--vscode-list-focusBackground': 'transparent',
    '--vscode-list-focusForeground': 'currentColor',
    '--vscode-list-focusOutline': '#f38518',
    '--vscode-list-hoverBackground': 'rgba(255, 255, 255, 0.1)',
    '--vscode-list-hoverForeground': '#ffffff',
    '--vscode-list-inactiveFocusBackground': 'transparent',
    '--vscode-list-inactiveFocusOutline': 'transparent',
    '--vscode-list-inactiveSelectionBackground': 'transparent',
    '--vscode-list-inactiveSelectionForeground': 'currentColor',
    '--vscode-list-inactiveSelectionIconForeground': 'currentColor',
    '--vscode-menu-background': '#000000',
    '--vscode-menu-border': '#6fc3df',
    '--vscode-menu-foreground': '#ffffff',
    '--vscode-menu-selectionBackground': 'transparent',
    '--vscode-menu-selectionBorder': '#f38518',
    '--vscode-menu-selectionForeground': '#ffffff',
    '--vscode-menu-separatorBackground': '#d4d4d4',
    '--vscode-panel-background': '#000000',
    '--vscode-panelTitle-activeBorder': '#6fc3df',
    '--vscode-panelTitle-activeForeground': '#ffffff',
    '--vscode-panelTitle-inactiveForeground': '#ffffff',
    '--vscode-quickInputList-focusBackground': '#000000',
    '--vscode-quickInputList-focusForeground': '#ffffff',
    '--vscode-sash-hoverBorder': '#f38518',
    '--vscode-scrollbar-shadow': 'transparent',
    '--vscode-scrollbarSlider-activeBackground': '#6fc3df',
    '--vscode-scrollbarSlider-background': 'rgba(111, 195, 223, 0.6)',
    '--vscode-scrollbarSlider-hoverBackground': 'rgba(111, 195, 223, 0.8)',
    '--vscode-settings-checkboxBackground': '#000000',
    '--vscode-settings-checkboxBorder': '#6fc3df',
    '--vscode-settings-checkboxForeground': '#ffffff',
    '--vscode-settings-dropdownBackground': '#000000',
    '--vscode-settings-dropdownBorder': '#6fc3df',
    '--vscode-settings-dropdownListBorder': '#6fc3df',
    '--vscode-settings-headerBorder': '#6fc3df',
    '--vscode-settings-headerForeground': '#ffffff',
    '--vscode-settings-textInputBackground': '#000000',
    '--vscode-settings-textInputBorder': '#6fc3df',
    '--vscode-settings-textInputForeground': '#ffffff',
    '--vscode-sideBar-background': '#000000',
    '--vscode-sideBarSectionHeader-background': 'transparent',
    '--vscode-sideBarTitle-foreground': '#ffffff',
    '--vscode-toolbar-activeBackground': 'transparent',
    '--vscode-toolbar-hoverBackground': 'transparent',
    '--vscode-toolbar-hoverOutline': '#f38518',
    '--vscode-tree-inactiveIndentGuidesStroke': 'rgba(169, 169, 169, 0.4)',
    '--vscode-tree-indentGuidesStroke': '#a9a9a9',
    '--vscode-widget-shadow': 'transparent',
  },
  'high-contrast-light': {
    '--vsc-foreground-translucent': 'rgba(41, 41, 41, 0.9)',
    '--vscode-activityBarBadge-background': '#0f4a85',
    '--vscode-activityBarBadge-foreground': '#ffffff',
    '--vscode-badge-background': '#0f4a85',
    '--vscode-badge-foreground': '#ffffff',
    '--vscode-button-background': '#0f4a85',
    '--vscode-button-border': '#0f4a85',
    '--vscode-button-foreground': '#ffffff',
    '--vscode-button-hoverBackground': '#0f4a85',
    '--vscode-button-secondaryBackground': '#ffffff',
    '--vscode-button-secondaryForeground': '#292929',
    '--vscode-button-secondaryHoverBackground': '#ffffff',
    '--vscode-editor-background': '#ffffff',
    '--vscode-editor-font-family': 'Consolas, "Courier New", monospace',
    '--vscode-editor-font-size': '14px',
    '--vscode-editor-font-weight': 'normal',
    '--vscode-editor-foreground': '#292929',
    '--vscode-editor-inlineValuesForeground': 'rgba(0, 0, 0, 0.5)',
    '--vscode-editorGroup-border': '#0f4a85',
    '--vscode-focusBorder': '#006bbd',
    '--vscode-font-family': '"Segoe WPC", "Segoe UI", sans-serif',
    '--vscode-font-size': '13px',
    '--vscode-font-weight': 'normal',
    '--vscode-foreground': '#292929',
    '--vscode-icon-foreground': '#292929',
    '--vscode-input-background': '#ffffff',
    '--vscode-input-placeholderForeground': 'rgba(41, 41, 41, 0.7)',
    '--vscode-keybindingTable-headerBackground': 'transparent',
    '--vscode-keybindingTable-rowsBackground': 'transparent',
    '--vscode-list-activeSelectionBackground': 'rgba(15, 74, 133, 0.1)',
    '--vscode-list-activeSelectionForeground': '#292929',
    '--vscode-list-activeSelectionIconForeground': 'currentColor',
    '--vscode-list-focusAndSelectionOutline': '#006bbd',
    '--vscode-list-focusBackground': 'transparent',
    '--vscode-list-focusForeground': 'currentColor',
    '--vscode-list-focusOutline': '#006bbd',
    '--vscode-list-hoverBackground': 'rgba(15, 74, 133, 0.1)',
    '--vscode-list-hoverForeground': '#292929',
    '--vscode-list-inactiveFocusBackground': 'transparent',
    '--vscode-list-inactiveFocusOutline': 'transparent',
    '--vscode-list-inactiveSelectionBackground': 'rgba(15, 74, 133, 0.1)',
    '--vscode-list-inactiveSelectionForeground': 'currentColor',
    '--vscode-list-inactiveSelectionIconForeground': 'currentColor',
    '--vscode-menu-background': '#ffffff',
    '--vscode-menu-border': '#0f4a85',
    '--vscode-menu-foreground': '#292929',
    '--vscode-menu-selectionBackground': 'rgba(15, 74, 133, 0.1)',
    '--vscode-menu-selectionBorder': '#006bbd',
    '--vscode-menu-selectionForeground': '#292929',
    '--vscode-menu-separatorBackground': '#0f4a85',
    '--vscode-panel-background': '#ffffff',
    '--vscode-panelTitle-activeBorder': '#b5200d',
    '--vscode-panelTitle-activeForeground': '#292929',
    '--vscode-panelTitle-inactiveForeground': '#292929',
    '--vscode-quickInputList-focusBackground': '#ffffff',
    '--vscode-quickInputList-focusForeground': '#292929',
    '--vscode-sash-hoverBorder': '#006bbd',
    '--vscode-scrollbar-shadow': 'transparent',
    '--vscode-scrollbarSlider-activeBackground': '#0f4a85',
    '--vscode-scrollbarSlider-background': 'rgba(15, 74, 133, 0.4)',
    '--vscode-scrollbarSlider-hoverBackground': 'rgba(15, 74, 133, 0.8)',
    '--vscode-settings-checkboxBackground': '#ffffff',
    '--vscode-settings-checkboxBorder': '#0f4a85',
    '--vscode-settings-checkboxForeground': '#292929',
    '--vscode-settings-dropdownBackground': '#ffffff',
    '--vscode-settings-dropdownBorder': '#0f4a85',
    '--vscode-settings-dropdownListBorder': '#0f4a85',
    '--vscode-settings-headerBorder': '#0f4a85',
    '--vscode-settings-headerForeground': '#292929',
    '--vscode-settings-textInputBackground': '#ffffff',
    '--vscode-settings-textInputBorder': '#0f4a85',
    '--vscode-settings-textInputForeground': '#292929',
    '--vscode-sideBar-background': '#ffffff',
    '--vscode-sideBarSectionHeader-background': 'transparent',
    '--vscode-sideBarTitle-foreground': '#292929',
    '--vscode-toolbar-activeBackground': 'transparent',
    '--vscode-toolbar-hoverBackground': 'transparent',
    '--vscode-toolbar-hoverOutline': '#006bbd',
    '--vscode-tree-inactiveIndentGuidesStroke': 'rgba(165, 165, 165, 0.4)',
    '--vscode-tree-indentGuidesStroke': '#a9a9a9',
    '--vscode-widget-shadow': 'transparent',
  },
};

const createPropDeclaration = (
  componentProp: string,
  vscodeProp: string,
  fallbackVal: string
) => `${componentProp}: var(${vscodeProp}, ${fallbackVal});`;

/**
 * Declare custom CSS variables and initialize them with a default value in
 * light, dark, and high contrast versions.
 */
const declareThemeVariables = (
  themeVariableMap: {
    componentProp: string;
    vscodeProp: VscodeThemeVariableName;
  }[]
) => {
  const variationDeclarations: Record<ThemeKind, string> = {
    dark: '',
    light: '',
    'high-contrast': '',
    'high-contrast-light': '',
  };
  const variations = Object.keys(variationDeclarations) as ThemeKind[];

  themeVariableMap.forEach((t) => {
    const {componentProp, vscodeProp} = t;

    variations.forEach((themeKind) => {
      const fallbackVal = defaultStyles[themeKind][vscodeProp];
      const varDeclaration = createPropDeclaration(
        componentProp,
        vscodeProp,
        fallbackVal
      );
      variationDeclarations[themeKind] += varDeclaration;
    });
  });

  let rawCSS = '';

  variations.forEach((v) => {
    let css = `:host-context(body.vscode-${v}){`;
    css += variationDeclarations[v];
    css += '}';

    rawCSS += css;
  });

  return unsafeCSS(rawCSS);
};

export default declareThemeVariables;
