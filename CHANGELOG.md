# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [Unreleased]

## Fixed

- **Button**: Fixed the button border style.

### Added

- Added fallback styles to **Textarea**, **Collapsible**, **Checkbox**.

## [1.13.1] - 2025-02-16

### Fixed

- **Table**: **TableHeader** and **TableBody** now automatically move into their appropriate slots.

## [1.13.0] - 2025-02-16

### Fixed

- **SingleSelect**, **MultiSelect**: Prevent browser suggestions in single and multi-selects in combobox mode.
- **SingleSelect**, **MultiSelect**: Fixed the error when an incorrect value is typed.
- **Table**: The style attributes (`bordered`, `bordered-columns`, `bordered-rows`, `zebra`, `zebra-odd`) could not be used in React Elements.

### Added

- **Badge**: Added `tab-header-counter` variant.
- Added fallback styles to **Badge**, **Button** and **Textfield**.
  These components still look proper even if the theme variables provided by VSCode are not present.
  In such cases, the components appear with the default theme (Dark Modern).

## [1.12.0] - 2025-02-06

### Fixed

- All components are made CSP compliant. The affected components are: **Icon**, **Scrollable**, **TextArea**, **SplitLayout**, **Tree**, **Checkbox**, **Radio**, **FormHelper**.
- **TextField**: Fixed the synchronization of the inner input value.
- **ContextMenu**: Fixed mouse over styles. Fixed border styles in the Solarized Light theme.

### Added

- **Icon**: Show warning in the dev console when codicon css is missing.

## [1.11.0] - 2025-01-22

### Fixed

- **Table**: The empty component threw an error when it was deleted from the document.
- **SingleSelect**, **MultiSelect**: Fix selected state when opened by default.

### Added

- **SingleSelect**, **MultiSelect**: Added the ability to update the state of an already initialized
  component by modifying its child options.

## [1.10.0] - 2025-01-11

### Fixed

- **Checkbox**: Fix the border color in the focused state.

### Added

- **SingleSelect**, **MultiSelect**: Added `open` property.
- **Button**: Emit `click` event on enter or space key down.

## [1.9.1] - 2025-01-03

### Fixed

- **Divider**: Make component color visible in all themes.
- **SingleSelect**: Add the ability to set an option's value to empty.
- **SingleSelect**: If no option is selected, the first one should be selected by default.

## [1.9.0] - 2024-11-26

### Added

- Add support for two-way binding with form controls in Vue.
- **ContextMenu**: Added `preventClose` property.

### Fixed

- **ContextMenu**: `show` attribute was not synchronized correctly.

## [1.8.1] - 2024-11-17

### Fixed

- **SplitLayout**: The fixed pane size was set to zero initially.
- **SplitLayout**: The mouse-over state was not reset when the button was released outside the component.

## [1.8.0] - 2024-11-08

### Added

- **SplitLayout**: Added `handlePosition` property to adjust the handle position programmatically.
- **SplitLayout**: Added `fixedPane` property. When the parent element is resized, the panes adjust proportionally.
  This parameter allows you to set one of the panes to a fixed size so its dimensions won’t change during resizing.
- **SplitLayout**: Added `resetHandlePosition()` method to reset the handle position to the default value.
- **SplitLayout**: Dispatch `vsc-split-layout-change` event when a panel is resized.

### Fixed

- **SingleSelect**, **MultiSelect**: Fix the widget height when it is empty.
- **MultiSelect**: The value of `selectedIndexes` was not correctly updated.
- **Tabs**: Active tab highlights previously showed as inactive.
- **SplitLayout**: Reinitialize panes when the split layout orientation changes.
- Use fully specified import paths for better compatibility. See [#213](https://github.com/vscode-elements/elements/issues/213)

## [1.7.1] - 2024-10-22

### Fixed

- **Checkbox**: Bubbling change event in the same way as the native checkbox.
- **Checkbox**: Click event dispatched twice.
- **SingleSelect**, **MultiSelect**: The option description was not always visible on mouseover.
- **SingleSelect**, **MultiSelect**: Fixed the unfocusable element error when validation is triggered.

## [1.7.0] - 2024-10-13

### Added

- **Button**: Add the ability to modify the icon animation parameters.
- **Button**: Align and arrange any content added through the main slot.
- **SingleSelect**, **MultiSelect**: Add the ability to control the position of the select dropdown.
- **Collapsible**: Add `body` css part.
- **Collapsible**: Dispatch a toggle event when opening or closing.

## Fixed

- **Textfield**: Revalidate the element when the value is changed.
- **Checkbox**: Revalidate the element when `required` or `checked` properties are changed.
- **Badge**: Reflect `variant` property.

## [1.6.2] - 2024-10-07

### Fixed

- **SingleSelect**: Fix error throwing when non-existent option is selected.
- **SingleSelect**: Set initial form value before the first user interaction.
- **SingleSelect**: The option value was not registered when it was set as a property.
- **SingleSelect**: The option selected state was not registered when it was set as a property.

## [1.6.1] - 2024-09-22

### Fixed

- **Table**: Fix (#161)

## [1.6.0] - 2024-09-20

### Added

- Added **Divider** component
- Added **ProgressRing** component

## [1.5.0] - 2024-09-12

- **SingleSelect**, **MultiSelect**: Highlight matches in combobox mode when the list is filtered

## [1.4.0] - 2024-09-10

### Added

- **SingleSelect**, **MultiSelect**: Show dropdown on input click.
- **SingleSelect**, **MultiSelect**: The focus is delegated to the inner input in the combobox mode.

### Fixed

- **SingleSelect**, **MultiSelect**: components were be selectable in disabled mode.

## [1.3.1] - 2024-09-01

- Upgrade codicons to 0.0.36

## [1.3.0] - 2024-05-13

- **Tree**: Added tooltip property to the item configuration.

## [1.2.0] - 2024-02-20

### Added

- **Tree**: Added customizable [CSS part](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) regions

## [1.1.0] - 2024-02-11

### Added

- **Tree**: Added `deselectAll()` and `getItemByPath()` helper methods.

## [1.0.1] - 2024-01-05

### Fixed

- **Tree**: Fixed the empty payload of the `vsc-tree-select` event.

## [1.0.0] - 2024-01-04

### Added

- The form controls fully participate in the standard HTML forms. The affected components are the following:
  **Button**, **Single Select**, **Multi Select**, **Textfield**, **Textarea**, **Radio**, **Checkbox**.
- Custom events are exported as TypeScript types. Check the [react-example](https://github.com/vscode-elements/react-example/blob/c481f9fcdecdb5377ca1955b28f506bff70d1f8b/src/Demo.tsx#L11) repository for examples.
- **SplitLayout**: Added handle size property.

### Fixed

- Values from the options was not registered in the **Select** when the component is connected to the DOM.

### Changed

- Reflect `name` property of the **Input** component similar to the native textfield.
- **Textarea**, **Textfield**: `minlength` and `maxlength` property is renamed to `minLength` and `maxLength`. This
  change adheres to the naming convention of the native `<textarea>` element. The attribute names
  are not changed.
- **Textarea**, **Textfield**: Dispatching native `input` and `change` events.
- **Radio**, **Checkbox**, **SingleSelect**, **MultiSelect**: Dispatching native `change` event
- **Collapsible**: Displaying the main content using the default slot instead of the named `body` slot.
- **Split Layout**: `initial-pos` is renamed to `initial-handle-position`.
- **ContextMenu**: `vsc-select` event is renamed to `vsc-context-menu-select`.
- **Tabs**: `vsc-select` event is renamed to `vsc-tabs-select`.
- **Tree**: `vsc-run-action` event is renamed to `vsc-tree-action`.
- **Tree**: `vsc-select` event is renamed to `vsc-tree-select`.
- Lit updated to 3.x

### Deprecated

- **Textarea**, **Textfield**: `vsc-input` and `vsc-change` events are deprecated.
- **Button**: `vsc-click` event is deprecated.
- **Checkbox**: `vsc-change` event is deprecated.
- **ContextMenu**: `vsc-select` is deprecated.
- **FormContainer**: `data` property is deprecated.
- **MultiSelect**, **SingleSelect**: `vsc-change` event is deprecated.

### Removed

- Deprecated components were removed. The affected components are: **Inputbox**, **FormContainer**, **FormControl**,
  **FormDescription**, **FormItem**, **FormLabel**

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
