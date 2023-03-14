# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## Unreleased

### Changed

- Add `cols` and `rows` attributes to **Textarea** by [@chrjorgensen](https://github.com/chrjorgensen)

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
