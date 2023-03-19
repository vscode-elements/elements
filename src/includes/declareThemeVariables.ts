import {unsafeCSS} from 'lit';

type ThemeKind = 'dark' | 'light' | 'high-contrast';

type VscodeThemeVariableName =
  | '--vsc-foreground-translucent'
  | '--vscode-activityBarBadge-background'
  | '--vscode-activityBarBadge-foreground'
  | '--vscode-badge-background'
  | '--vscode-badge-foreground'
  | '--vscode-button-background'
  | '--vscode-button-foreground'
  | '--vscode-button-hoverBackground'
  | '--vscode-button-secondaryBackground'
  | '--vscode-button-secondaryForeground'
  | '--vscode-button-secondaryHoverBackground'
  | '--vscode-focusBorder'
  | '--vscode-font-family'
  | '--vscode-font-size'
  | '--vscode-font-weight'
  | '--vscode-foreground'
  | '--vscode-icon-foreground'
  | '--vscode-menu-background'
  | '--vscode-menu-border'
  | '--vscode-menu-foreground'
  | '--vscode-menu-selectionBackground'
  | '--vscode-menu-selectionBorder'
  | '--vscode-menu-selectionForeground'
  | '--vscode-menu-separatorBackground'
  | '--vscode-settings-checkboxBackground'
  | '--vscode-settings-checkboxBorder'
  | '--vscode-settings-checkboxForeground'
  | '--vscode-sideBar-background'
  | '--vscode-sideBarSectionHeader-background'
  | '--vscode-sideBarTitle-foreground'
  | '--vscode-toolbar-activeBackground'
  | '--vscode-toolbar-hoverBackground'
  | '--vscode-toolbar-hoverOutline';

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
    '--vscode-button-foreground': '#ffffff',
    '--vscode-button-hoverBackground': '#1177bb',
    '--vscode-button-secondaryBackground': '#3a3d41',
    '--vscode-button-secondaryForeground': '#ffffff',
    '--vscode-button-secondaryHoverBackground': '#45494e',
    '--vscode-focusBorder': '#007fd4',
    '--vscode-font-family': '"Segoe WPC", "Segoe UI", sans-serif',
    '--vscode-font-size': '13px',
    '--vscode-font-weight': 'normal',
    '--vscode-foreground': '#cccccc',
    '--vscode-icon-foreground': '#c5c5c5',
    '--vscode-menu-background': '#252526',
    '--vscode-menu-border': '#454545',
    '--vscode-menu-foreground': '#cccccc',
    '--vscode-menu-selectionBackground': '#04395e',
    '--vscode-menu-selectionBorder': 'transparent',
    '--vscode-menu-selectionForeground': '#ffffff',
    '--vscode-menu-separatorBackground': '#454545',
    '--vscode-settings-checkboxBackground': '#3c3c3c',
    '--vscode-settings-checkboxBorder': '#6b6b6b',
    '--vscode-settings-checkboxForeground': '#f0f0f0',
    '--vscode-sideBar-background': '#252526',
    '--vscode-sideBarSectionHeader-background': 'rgba(0, 0, 0, 0)',
    '--vscode-sideBarTitle-foreground': '#bbbbbb',
    '--vscode-toolbar-activeBackground': 'rgba(99, 102, 103, 0.31)',
    '--vscode-toolbar-hoverBackground': 'rgba(90, 93, 94, 0.31)',
    '--vscode-toolbar-hoverOutline': 'transparent',
  },
  light: {
    '--vsc-foreground-translucent': 'rgba(97, 97, 97, 0.9)',
    '--vscode-activityBarBadge-background': '#007acc',
    '--vscode-activityBarBadge-foreground': '#ffffff',
    '--vscode-badge-background': '#c4c4c4',
    '--vscode-badge-foreground': '#333333',
    '--vscode-button-background': '#007acc',
    '--vscode-button-foreground': '#ffffff',
    '--vscode-button-hoverBackground': '#0062a3',
    '--vscode-button-secondaryBackground': '#5f6a79',
    '--vscode-button-secondaryForeground': '#ffffff',
    '--vscode-button-secondaryHoverBackground': '#4c556',
    '--vscode-focusBorder': '#0090f1',
    '--vscode-font-family': '"Segoe WPC", "Segoe UI", sans-serif',
    '--vscode-font-size': '13px',
    '--vscode-font-weight': 'normal',
    '--vscode-foreground': '#616161',
    '--vscode-icon-foreground': '#424242',
    '--vscode-menu-background': '#ffffff',
    '--vscode-menu-border': '#d4d4d4',
    '--vscode-menu-foreground': '#616161',
    '--vscode-menu-selectionBackground': '#0060c0',
    '--vscode-menu-selectionBorder': 'transparent',
    '--vscode-menu-selectionForeground': '#ffffff',
    '--vscode-menu-separatorBackground': '#d4d4d4',
    '--vscode-settings-checkboxBackground': '#ffffff',
    '--vscode-settings-checkboxBorder': '#919191',
    '--vscode-settings-checkboxForeground': '#616161',
    '--vscode-sideBar-background': '#f3f3f3',
    '--vscode-sideBarSectionHeader-background': 'rgba(0, 0, 0, 0)',
    '--vscode-sideBarTitle-foreground': '#6f6f6f',
    '--vscode-toolbar-activeBackground': 'rgba(166, 166, 166, 0.31)',
    '--vscode-toolbar-hoverBackground': 'rgba(184, 184, 184, 0.31)',
    '--vscode-toolbar-hoverOutline': 'transparent',
  },
  'high-contrast': {
    '--vsc-foreground-translucent': 'rgba(255, 255, 255, 0.9)',
    '--vscode-activityBarBadge-background': '#000000',
    '--vscode-activityBarBadge-foreground': '#ffffff',
    '--vscode-badge-background': '#000000',
    '--vscode-badge-foreground': '#ffffff',
    '--vscode-button-background': 'transparent',
    '--vscode-button-foreground': '#ffffff',
    '--vscode-button-hoverBackground': 'transparent',
    '--vscode-button-secondaryBackground': 'transparent',
    '--vscode-button-secondaryForeground': '#ffffff',
    '--vscode-button-secondaryHoverBackground': 'transparent',
    '--vscode-focusBorder': '#f38518',
    '--vscode-font-family': '"Segoe WPC", "Segoe UI", sans-serif',
    '--vscode-font-size': '13px',
    '--vscode-font-weight': 'normal',
    '--vscode-foreground': '#616161',
    '--vscode-icon-foreground': '#ffffff',
    '--vscode-menu-background': '#000000',
    '--vscode-menu-border': '#6fc3df',
    '--vscode-menu-foreground': '#ffffff',
    '--vscode-menu-selectionBorder': '#f38518',
    '--vscode-menu-separatorBackground': '#d4d4d4',
    '--vscode-menu-selectionBackground': 'transparent',
    '--vscode-menu-selectionForeground': '#ffffff',
    '--vscode-settings-checkboxBackground': '#000000',
    '--vscode-settings-checkboxBorder': '#6fc3df',
    '--vscode-settings-checkboxForeground': '#ffffff',
    '--vscode-sideBar-background': '#000000',
    '--vscode-sideBarSectionHeader-background': 'transparent',
    '--vscode-sideBarTitle-foreground': '#ffffff',
    '--vscode-toolbar-activeBackground': 'transparent',
    '--vscode-toolbar-hoverBackground': 'transparent',
    '--vscode-toolbar-hoverOutline': '#f38518',
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
