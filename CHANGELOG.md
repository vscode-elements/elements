# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [Unreleased]

### Fixed

- Makes styles Safari-compatible

## [0.17.0] - 2023-10-15

### Added

- Added a [React demo app](examples/react-app) to the repository.
- Added `autofocus` attribute to **Textarea** and **Textfield**
- All boolean properties are reflected. Read the [Open Web Components](https://open-wc.org/guides/knowledge/attributes-and-properties/#attribute-and-property-reflection) documentation for more details.

## [0.16.0] - 2023-09-07

### Added

- Added `indeterminate` attribute to **Checkbox**.

## [0.15.0] - 2023-08-03

### Added

- Added `invalid` boolean property and attribute to **SingleSelect** and **MultiSelect** component.

## [0.14.0] - 2023-06-17

### Added

- Added `decorations` slot to the **Collapsible** header. Decorations are always visible even if the
  collapsible is collapsed.
- Added `description` property to **Collapsible**.
- Added optional indent guides to **Tree**
- Added `description` property to **Tree** items
- Added `iconUrls` property to the tree item data to set custom icons in the **Tree**.
- Added **Tree** actions. See the [documentation](https://bendera.github.io/vscode-webview-elements/components/vscode-tree/#actions) for the examples.
- Added **Tree** decorations. See the [documentation](https://bendera.github.io/vscode-webview-elements/components/vscode-tree/#decorations) for the examples.

### Changed

- In the **Tree** item configuration, the `icons` property value can also be a boolean. If it's true,
  the default theme icons are visible: `file` for the leaf items, `folder` for the branch items, 
  `folder-opened` for the opened branch items. See the [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html)
  project for the icon references. If it's false, the icons won't be visible at all.
- **Tree** The colors have been refined to closely align with the style of VSCode.

### Fixed

- Inactivate interactive elements during scroll in **Scrollable**
- The color of the selected item focus border has been refined in **Tree**

## [0.13.2] - 2023-05-26

### Fixed

- Preventing overflowing long texts in the **Select** description. (Fix #61)

## [0.13.1] - 2023-05-13

### Fixed

- Radio button behaved as a checkbox in the **RadioGroup**. (Fix #59)

## [0.13.0] - 2023-04-16

### Added

Sometimes VSCode theme variables are renamed or removed by the VSCode authors. When this happens the appearance
of the components will change unpredictably. To prevent this, every component got a fallback style.
The components will look "good" even if no theme variables are available.

### Changed

- **Button** and **ContextMenu** styles was updated to follow VSCode changes.
- Customizable header background color and tinted row background color instead of the hard-coded ones in **Table**.

## [0.12.0] - 2023-03-17

### Changed

- **Textarea**: The default display is `inline-block`, the default size is 320 x 40. It is 
  automatically resized when `rows` or `cols` attributes are set.
- **Textarea**: Follow the source control input box styles of VSCode more closely: 
  - Change the cursor to hand when it is above the scrollbar.
  - Add an unobtrusive drop shadow when the text is scrolled.
  - Add active state to the scrollbar.
- **Textarea**: Fixed the ugly resize handler when the scrollbar is visible.
- **Textfield**: Customize the file input button styles.

## [0.11.0] - 2023-03-15

### Changed

- Add `cols` and `rows` attributes to **Textarea** by [@chrjorgensen](https://github.com/chrjorgensen)

## Fixed

- Set default color for **Textfield**.

## [0.10.3] - 2023-03-13

### Fixed

- Textfield and Textarea values were not collected in the **FormContainer** form data.
- The value of the `value` property was not syncronized properly with the value of the inner form widget in **Textfield** and **Textarea**.
- Fix top-margin of **Textfield** and **Textarea** in **FormGroup** when its `variant` is "settings-group".

## [0.10.2] - 2023-03-12

### Changed

- Allow file type in **Textfield**

## [0.10.1] - 2023-02-20

### Fixed

- Fixed whitespace in **Label** when the asterisk symbol is visible

## [0.10.0] - 2023-02-20

### Added

- **Label** Added `required` attribute

### Changed

- **SingleSelect**, **MultiSelect** Minor CSS changes to better mimic VSCode styles

## [0.9.0] - 2023-02-14

### Changed

- Adapted latest VSCode design changes on the ContextMenu and the InputBox.

## [0.8.1] - 2022-12-22

### Fixed

- Text inputs could not be edited in tab panels.

## [0.8.0] - 2022-11-10

### Breaking changes

- Attribute names have been standardized. From now every attribute name uses the kebab-case format.
- `selectedIndex` attribute was renamed to `selected-index` in the Tabs component.
- `iconAfter` attribute was renamed to `icon-after` in the Button component.
- `selectedIndexes` attribute is removed from the MultiSelect component. It still accessible as a property.
- `scrollPos` attribute was renamed to `scroll-pos` in the Scrollable component.
- `scrollMax` attribute was renamed to `scroll-max` in the Scrollable component.
- `selectedIndex` attribute was renamed to `selected-index` in the SingleSelect component.
- `resetOnDblClick` attribute was renamed to `reset-on-dbl-click` in the SplitLayout component.
- `columnLabel` attribute was renamed to `column-label` in the TableCell component.
- The Tabs component markup has been changed. See the documentation page for examples.

### Deprecated

- Inputbox has been deprecated. Use the Textarea or Textfield instead.

### Added

- Added Textfield and Textarea components.

### Changed

- Lit upgraded to 2.4.x.
- Added keyboard navigation to ContextMenu.
- Adapted the latest VSCode button styles (rounded corner).
- Added `aria-checked` attribute to the radio buttons.
- Icon component accessibility improvements.
- Tabs component is fully accessible.
- Radio and Checkbox are accessible.
- TabHeader and TabPanel were added to interoperate with Tabs.
- `addons` slot has been added to the Tabs toolbar.
- `content-before` and `content-after` slots have been added to the tab headers.
- Label automatically sets the label for radios, checkboxes, and text inputs.

### Fixed

- Fixed the active state bug in the ContextMenu
- Fixed the Select height

## [0.7.1] - 2022-11-03

### Fixed

- **Tabs** (Fix [#32](https://github.com/bendera/vscode-webview-elements/issues/32)) Select the tab when a slotted element is clicked in the tab header

## [0.7.0] - 2022-03-15

### Added

- Added scrollPos and scrollMax property to Scrollable
- Select: allow disabled single select option (thx [ununian](https://github.com/ununian))

### Fixed

- Button: Fixed-width button text aligned to center
- Select: Removed the extra whitespaces from the value
- Select: css property to set the dropdown z-index to fix the overlapping issues
- Select: set multi-select value through prop
- Scrollable: The content covered the scrollbar if its position relative or absolute
- Scrollable: The scrollbar will be resized when the content height change

## [0.6.3] - 2021-08-26

### Fixed

- The label didn't connect to the input widget in the shadow DOM.

### Added

- Added `@attr` jsdoc tag to the "name" attribute to prevent the "unknown attribute" warnings in the supported IDEs.

## [0.6.2] - 2021-08-04

### Fixed

- Tree: focused list item outline offset

## [0.6.1] - 2021-07-25

### Fixed

- Updated icon colors as in VSCode

## [0.6.0] - 2021-07-25

### Added

- Icon: 
  - added proper theme variables
  - added action icon pressed style
  - added focus border style
- Collapsible: 
  - keyboard support
  - icon visibility mimics the VSCode behavior: it is visible when the panel is open
- Table: added responsive mode
- SplitLayout: added hover color

## [0.5.2] - 2021-07-24

### Fixed

- Inputbox: Type definition fine tuning

## [0.5.1] - 2021-07-24

### Fixed

- Flexible table columns
- Small documentation changes in the Inputbox which provides better code completion

## [0.5.0] - 2021-07-19

### Added

- Added Table component
- Added action-icon mode to the Icon

### Changed

- Floating scrollbar in the Scrollable component

## [0.4.0] - 2021-07-15

### Added

- Added new components: FormContainer, FormGroup, FromHelper, Label, Radio, RadioGrop, CheckboxGroup.

### Fixed

- Theme variable names are readjusted in the Tree, SingleSelect and MultiSelect components.
- Button outline styles has been restored.

### Deprecated

- The following components will be removed: FormControl, FormDescription, FormItem, FormLabel. Use the new form components instead.

## [0.3.1] - 2021-06-12

### Fixed

- Fix #16 SingleSelect isn't updated by value and selectedIndex

## [0.3.0] - 2021-05-10

### Added

- Added keyboard navigation to the Tree component.

### Changed

- SingleSelect and MultiSelect import path have been simplified.

## [0.3.0] - 2021-05-11

### Added

- Combobox mode has been added to the SingleSelect and MultiSelect components.
- New attributes for InputBox: min, minlength, max, maxlength, multiple, 
  readonly, step.
- Changelog was introduced.

### Changed

- Select component has been split into two different component: SingleSelect and 
  MultiSelect.

### Fixed

- Multiline Inputbox resizing behavior has been fixed
- Option hover color
