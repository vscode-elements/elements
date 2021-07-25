# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

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
