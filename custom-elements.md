# `src/vscode-button.ts`:

## class: `VscodeButton`, `vscode-button`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name                | Privacy | Type      | Default    | Description                                                                                    | Inherited From |
| ------------------- | ------- | --------- | ---------- | ---------------------------------------------------------------------------------------------- | -------------- |
| `tabindex`          |         | `number`  | `0`        |                                                                                                |                |
| `secondary`         |         | `boolean` | `false`    |                                                                                                |                |
| `role`              |         | `string`  | `'button'` |                                                                                                |                |
| `disabled`          |         | `boolean` | `false`    |                                                                                                |                |
| `icon`              |         | `string`  | `''`       | A \[Codicon]\(https\://microsoft.github.io/vscode-codicons/dist/codicon.html) before the label |                |
| `iconAfter`         |         | `string`  | `''`       | A \[Codicon]\(https\://microsoft.github.io/vscode-codicons/dist/codicon.html) after the label  |                |
| `focused`           |         | `boolean` | `false`    |                                                                                                |                |
| `_prevTabindex`     | private | `number`  | `0`        |                                                                                                |                |
| `_handleFocusBound` | private |           |            |                                                                                                |                |
| `_handleBlurBound`  | private |           |            |                                                                                                |                |

### Methods

| Name             | Privacy | Description | Parameters             | Return | Inherited From |
| ---------------- | ------- | ----------- | ---------------------- | ------ | -------------- |
| `_handleKeyDown` | private |             | `event: KeyboardEvent` |        |                |
| `_handleClick`   | private |             | `event: MouseEvent`    |        |                |
| `_handleFocus`   | private |             |                        |        |                |
| `_handleBlur`    | private |             |                        |        |                |

### Events

| Name        | Type          | Description                                         | Inherited From |
| ----------- | ------------- | --------------------------------------------------- | -------------- |
| `vsc-click` | `CustomEvent` | Dispatched only if the disabled attribute is false. |                |

### Attributes

| Name        | Field     | Inherited From |
| ----------- | --------- | -------------- |
| `tabindex`  | tabindex  |                |
| `secondary` | secondary |                |
| `role`      | role      |                |
| `disabled`  | disabled  |                |
| `icon`      | icon      |                |
| `iconAfter` | iconAfter |                |
| `focused`   | focused   |                |

### Slots

| Name | Description          |
| ---- | -------------------- |
|      | Slot for button text |

<hr/>

## Exports

| Kind                        | Name            | Declaration  | Module               | Package |
| --------------------------- | --------------- | ------------ | -------------------- | ------- |
| `js`                        | `VscodeButton`  | VscodeButton | src/vscode-button.ts |         |
| `custom-element-definition` | `vscode-button` | VscodeButton | src/vscode-button.ts |         |

# `src/vscode-checkbox-group.ts`:

## class: `VscodeCheckboxGroup`, `vscode-checkbox-group`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name      | Privacy | Type                         | Default        | Description | Inherited From |
| --------- | ------- | ---------------------------- | -------------- | ----------- | -------------- |
| `variant` |         | `'horizontal' \| 'vertical'` | `'horizontal'` |             |                |

### Attributes

| Name      | Field   | Inherited From |
| --------- | ------- | -------------- |
| `variant` | variant |                |

<hr/>

## Exports

| Kind                        | Name                    | Declaration         | Module                       | Package |
| --------------------------- | ----------------------- | ------------------- | ---------------------------- | ------- |
| `js`                        | `VscodeCheckboxGroup`   | VscodeCheckboxGroup | src/vscode-checkbox-group.ts |         |
| `custom-element-definition` | `vscode-checkbox-group` | VscodeCheckboxGroup | src/vscode-checkbox-group.ts |         |

# `src/vscode-checkbox.ts`:

## class: `VscodeCheckbox`, `vscode-checkbox`

### Superclass

| Name                   | Module                                                | Package |
| ---------------------- | ----------------------------------------------------- | ------- |
| `FormButtonWidgetBase` | /src/includes/form-button-widget/FormButtonWidgetBase |         |

### Fields

| Name          | Privacy | Type      | Default | Description | Inherited From |
| ------------- | ------- | --------- | ------- | ----------- | -------------- |
| `checked`     |         | `boolean` | `false` |             |                |
| `label`       |         | `string`  | `''`    |             |                |
| `value`       |         | `string`  | `''`    |             |                |
| `disabled`    |         | `boolean` | `false` |             |                |
| `isSlotEmpty` | private | `boolean` | `true`  |             |                |

### Methods

| Name                | Privacy   | Description | Parameters             | Return | Inherited From |
| ------------------- | --------- | ----------- | ---------------------- | ------ | -------------- |
| `_handleClick`      | protected |             |                        | `void` |                |
| `_handleKeyDown`    | protected |             | `event: KeyboardEvent` | `void` |                |
| `_handleSlotChange` | private   |             |                        |        |                |

### Events

| Name         | Type          | Description | Inherited From |
| ------------ | ------------- | ----------- | -------------- |
| `vsc-change` | `CustomEvent` |             |                |

### Attributes

| Name       | Field    | Inherited From |
| ---------- | -------- | -------------- |
| `name`     |          |                |
| `checked`  | checked  |                |
| `label`    | label    |                |
| `value`    | value    |                |
| `disabled` | disabled |                |

<hr/>

## Exports

| Kind                        | Name              | Declaration    | Module                 | Package |
| --------------------------- | ----------------- | -------------- | ---------------------- | ------- |
| `js`                        | `VscodeCheckbox`  | VscodeCheckbox | src/vscode-checkbox.ts |         |
| `custom-element-definition` | `vscode-checkbox` | VscodeCheckbox | src/vscode-checkbox.ts |         |

# `src/vscode-collapsible.ts`:

## class: `VscodeCollapsible`, `vscode-collapsible`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name    | Privacy | Type      | Default | Description | Inherited From |
| ------- | ------- | --------- | ------- | ----------- | -------------- |
| `title` |         | `string`  | `''`    |             |                |
| `open`  |         | `boolean` | `false` |             |                |

### Methods

| Name               | Privacy | Description | Parameters             | Return | Inherited From |
| ------------------ | ------- | ----------- | ---------------------- | ------ | -------------- |
| `_onHeaderClick`   | private |             |                        |        |                |
| `_onHeaderKeyDown` | private |             | `event: KeyboardEvent` |        |                |

### Attributes

| Name    | Field | Inherited From |
| ------- | ----- | -------------- |
| `title` | title |                |
| `open`  | open  |                |

### Slots

| Name      | Description                |
| --------- | -------------------------- |
| `body`    | Main content               |
| `actions` | Action icons in the header |

<hr/>

## Exports

| Kind                        | Name                 | Declaration       | Module                    | Package |
| --------------------------- | -------------------- | ----------------- | ------------------------- | ------- |
| `js`                        | `VscodeCollapsible`  | VscodeCollapsible | src/vscode-collapsible.ts |         |
| `custom-element-definition` | `vscode-collapsible` | VscodeCollapsible | src/vscode-collapsible.ts |         |

# `src/vscode-context-menu-item.ts`:

## class: `VscodeContextMenuItem`, `vscode-context-menu-item`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name         | Privacy | Type      | Default | Description | Inherited From |
| ------------ | ------- | --------- | ------- | ----------- | -------------- |
| `label`      |         | `string`  | `''`    |             |                |
| `keybinding` |         | `string`  | `''`    |             |                |
| `value`      |         | `string`  | `''`    |             |                |
| `separator`  |         | `boolean` | `false` |             |                |
| `tabindex`   |         | `number`  | `0`     |             |                |

### Methods

| Name          | Privacy | Description | Parameters | Return | Inherited From |
| ------------- | ------- | ----------- | ---------- | ------ | -------------- |
| `onItemClick` | private |             |            |        |                |

### Events

| Name        | Type          | Description | Inherited From |
| ----------- | ------------- | ----------- | -------------- |
| `vsc-click` | `CustomEvent` |             |                |

### Attributes

| Name         | Field      | Inherited From |
| ------------ | ---------- | -------------- |
| `label`      | label      |                |
| `keybinding` | keybinding |                |
| `value`      | value      |                |
| `separator`  | separator  |                |
| `tabindex`   | tabindex   |                |

<hr/>

## Exports

| Kind                        | Name                       | Declaration           | Module                          | Package |
| --------------------------- | -------------------------- | --------------------- | ------------------------------- | ------- |
| `js`                        | `VscodeContextMenuItem`    | VscodeContextMenuItem | src/vscode-context-menu-item.ts |         |
| `custom-element-definition` | `vscode-context-menu-item` | VscodeContextMenuItem | src/vscode-context-menu-item.ts |         |

# `src/vscode-context-menu.ts`:

## class: `VscodeContextMenu`, `vscode-context-menu`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name   | Privacy | Type             | Default | Description                                                                                                                                                                                                                                                                    | Inherited From |
| ------ | ------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `data` |         | `MenuItemData[]` | `[]`    | \<pre>\<code>interface MenuItemData {&#xD;&#xA;\&nbsp;\&nbsp;label: string;&#xD;&#xA;\&nbsp;\&nbsp;keybinding?: string;&#xD;&#xA;\&nbsp;\&nbsp;value?: string;&#xD;&#xA;\&nbsp;\&nbsp;separator?: boolean;&#xD;&#xA;\&nbsp;\&nbsp;tabindex?: number;&#xD;&#xA;}\</code>\</pre> |                |
| `show` |         | `boolean`        | `false` |                                                                                                                                                                                                                                                                                |                |

### Methods

| Name          | Privacy | Description | Parameters           | Return | Inherited From |
| ------------- | ------- | ----------- | -------------------- | ------ | -------------- |
| `onItemClick` | private |             | `event: CustomEvent` |        |                |

### Events

| Name         | Type          | Description | Inherited From |
| ------------ | ------------- | ----------- | -------------- |
| `vsc-select` | `CustomEvent` |             |                |

### Attributes

| Name   | Field | Inherited From |
| ------ | ----- | -------------- |
| `data` | data  |                |
| `show` | show  |                |

<hr/>

## Exports

| Kind                        | Name                  | Declaration       | Module                     | Package |
| --------------------------- | --------------------- | ----------------- | -------------------------- | ------- |
| `js`                        | `VscodeContextMenu`   | VscodeContextMenu | src/vscode-context-menu.ts |         |
| `custom-element-definition` | `vscode-context-menu` | VscodeContextMenu | src/vscode-context-menu.ts |         |

# `src/vscode-form-container.ts`:

## class: `VscodeFormContainer`, `vscode-form-container`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name                           | Privacy | Type                     | Default | Description | Inherited From |
| ------------------------------ | ------- | ------------------------ | ------- | ----------- | -------------- |
| `responsive`                   |         | `boolean`                |         |             |                |
| `breakpoint`                   |         | `number`                 | `490`   |             |                |
| `data`                         |         | `FormData`               |         |             |                |
| `_resizeObserver`              | private | `ResizeObserver \| null` |         |             |                |
| `_wrapperElement`              | private | `Element`                |         |             |                |
| `_assignedNodes`               | private | `VscodeFormGroup[]`      |         |             |                |
| `_responsive`                  | private | `boolean`                | `false` |             |                |
| `_firstUpdateComplete`         | private | `boolean`                | `false` |             |                |
| `_currentFormGroupLayout`      | private | `FormGroupLayout`        |         |             |                |
| `_resizeObserverCallbackBound` | private |                          |         |             |                |

### Methods

| Name                        | Privacy | Description | Parameters                       | Return | Inherited From |
| --------------------------- | ------- | ----------- | -------------------------------- | ------ | -------------- |
| `_collectFormData`          | private |             |                                  |        |                |
| `_toggleCompactLayout`      | private |             | `layout: FormGroupLayout`        |        |                |
| `_resizeObserverCallback`   | private |             | `entries: ResizeObserverEntry[]` |        |                |
| `_activateResponsiveLayout` | private |             |                                  |        |                |
| `_deactivateResizeObserver` | private |             |                                  |        |                |

### Attributes

| Name         | Field      | Inherited From |
| ------------ | ---------- | -------------- |
| `responsive` | responsive |                |
| `breakpoint` | breakpoint |                |
| `data`       | data       |                |

<hr/>

## Exports

| Kind                        | Name                    | Declaration         | Module                       | Package |
| --------------------------- | ----------------------- | ------------------- | ---------------------------- | ------- |
| `js`                        | `VscodeFormContainer`   | VscodeFormContainer | src/vscode-form-container.ts |         |
| `custom-element-definition` | `vscode-form-container` | VscodeFormContainer | src/vscode-form-container.ts |         |

# `src/vscode-form-control.ts`:

## class: `VscodeFormControl`, `vscode-form-control`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

<hr/>

## Exports

| Kind                        | Name                  | Declaration       | Module                     | Package |
| --------------------------- | --------------------- | ----------------- | -------------------------- | ------- |
| `js`                        | `VscodeFormControl`   | VscodeFormControl | src/vscode-form-control.ts |         |
| `custom-element-definition` | `vscode-form-control` | VscodeFormControl | src/vscode-form-control.ts |         |

# `src/vscode-form-description.ts`:

## class: `VscodeFormDescription`, `vscode-form-description`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

<hr/>

## Exports

| Kind                        | Name                      | Declaration           | Module                         | Package |
| --------------------------- | ------------------------- | --------------------- | ------------------------------ | ------- |
| `js`                        | `VscodeFormDescription`   | VscodeFormDescription | src/vscode-form-description.ts |         |
| `custom-element-definition` | `vscode-form-description` | VscodeFormDescription | src/vscode-form-description.ts |         |

# `src/vscode-form-group.ts`:

## class: `VscodeFormGroup`, `vscode-form-group`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name      | Privacy | Type               | Default        | Description | Inherited From |
| --------- | ------- | ------------------ | -------------- | ----------- | -------------- |
| `variant` |         | `FormGroupVariant` | `'horizontal'` |             |                |

### Attributes

| Name      | Field   | Inherited From |
| --------- | ------- | -------------- |
| `variant` | variant |                |

<hr/>

## Exports

| Kind                        | Name                | Declaration     | Module                   | Package |
| --------------------------- | ------------------- | --------------- | ------------------------ | ------- |
| `js`                        | `VscodeFormGroup`   | VscodeFormGroup | src/vscode-form-group.ts |         |
| `custom-element-definition` | `vscode-form-group` | VscodeFormGroup | src/vscode-form-group.ts |         |

# `src/vscode-form-helper.ts`:

## class: `VscodeFormHelper`, `vscode-form-helper`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

<hr/>

## Exports

| Kind                        | Name                 | Declaration      | Module                    | Package |
| --------------------------- | -------------------- | ---------------- | ------------------------- | ------- |
| `js`                        | `VscodeFormHelper`   | VscodeFormHelper | src/vscode-form-helper.ts |         |
| `custom-element-definition` | `vscode-form-helper` | VscodeFormHelper | src/vscode-form-helper.ts |         |

# `src/vscode-form-item.ts`:

## class: `VscodeFormItem`, `vscode-form-item`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

<hr/>

## Exports

| Kind                        | Name               | Declaration    | Module                  | Package |
| --------------------------- | ------------------ | -------------- | ----------------------- | ------- |
| `js`                        | `VscodeFormItem`   | VscodeFormItem | src/vscode-form-item.ts |         |
| `custom-element-definition` | `vscode-form-item` | VscodeFormItem | src/vscode-form-item.ts |         |

# `src/vscode-form-label.ts`:

## class: `VscodeFormLabel`, `vscode-form-label`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

<hr/>

## Exports

| Kind                        | Name                | Declaration     | Module                   | Package |
| --------------------------- | ------------------- | --------------- | ------------------------ | ------- |
| `js`                        | `VscodeFormLabel`   | VscodeFormLabel | src/vscode-form-label.ts |         |
| `custom-element-definition` | `vscode-form-label` | VscodeFormLabel | src/vscode-form-label.ts |         |

# `src/vscode-icon.ts`:

## class: `VscodeIcon`, `vscode-icon`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name           | Privacy | Type      | Default | Description                                                                            | Inherited From |
| -------------- | ------- | --------- | ------- | -------------------------------------------------------------------------------------- | -------------- |
| `name`         |         | `string`  | `''`    | Codicon icon name. @see https\://microsoft.github.io/vscode-codicons/dist/codicon.html |                |
| `size`         |         | `number`  | `16`    | Icon size in pixels                                                                    |                |
| `spin`         |         | `boolean` | `false` | Enable rotation animation                                                              |                |
| `spinDuration` |         | `number`  | `1.5`   | Animation duration in seconds                                                          |                |
| `actionIcon`   |         | `boolean` |         |                                                                                        |                |
| `_actionIcon`  | private | `boolean` | `false` |                                                                                        |                |

### Methods

| Name                   | Privacy | Description | Parameters | Return                                                                    | Inherited From |
| ---------------------- | ------- | ----------- | ---------- | ------------------------------------------------------------------------- | -------------- |
| `_getStylesheetConfig` | private |             |            | `{
    href: string \| undefined;
    nonce: string \| undefined;
  }` |                |

### Attributes

| Name            | Field        | Inherited From |
| --------------- | ------------ | -------------- |
| `name`          | name         |                |
| `size`          | size         |                |
| `spin`          | spin         |                |
| `spin-duration` | spinDuration |                |
| `action-icon`   | actionIcon   |                |

<hr/>

## Exports

| Kind                        | Name          | Declaration | Module             | Package |
| --------------------------- | ------------- | ----------- | ------------------ | ------- |
| `js`                        | `VscodeIcon`  | VscodeIcon  | src/vscode-icon.ts |         |
| `custom-element-definition` | `vscode-icon` | VscodeIcon  | src/vscode-icon.ts |         |

# `src/vscode-inputbox.ts`:

## class: `VscodeInputbox`, `vscode-inputbox`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name                       | Privacy | Type                                                                                                                      | Default     | Description           | Inherited From |
| -------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------- | -------------- |
| `label`                    |         | `string`                                                                                                                  | `''`        |                       |                |
| `multiline`                |         | `boolean`                                                                                                                 | `false`     |                       |                |
| `message`                  |         | `string`                                                                                                                  | `''`        |                       |                |
| `severity`                 |         | `string`                                                                                                                  |             |                       |                |
| `panelInput`               |         | `boolean`                                                                                                                 | `false`     |                       |                |
| `type`                     |         | `"color"\|"date"\|"datetime-local"\|"email"\|"file"\|"month"\|"number"\|"password"\|"tel"\|"text"\|"time"\|"url"\|"week"` | `'text'`    | Text-like input types |                |
| `focused`                  |         | `boolean`                                                                                                                 | `false`     |                       |                |
| `value`                    |         | `string`                                                                                                                  | `''`        |                       |                |
| `placeholder`              |         | `string`                                                                                                                  | `''`        |                       |                |
| `lines`                    |         | `number`                                                                                                                  | `2`         |                       |                |
| `maxLines`                 |         | `number`                                                                                                                  | `5`         |                       |                |
| `min`                      |         | `number \| undefined`                                                                                                     | `undefined` |                       |                |
| `minLength`                |         | `number \| undefined`                                                                                                     | `undefined` |                       |                |
| `max`                      |         | `number \| undefined`                                                                                                     | `undefined` |                       |                |
| `maxLength`                |         | `number \| undefined`                                                                                                     | `undefined` |                       |                |
| `multiple`                 |         | `boolean`                                                                                                                 | `false`     |                       |                |
| `readonly`                 |         | `boolean`                                                                                                                 | `false`     |                       |                |
| `step`                     |         | `number \| undefined`                                                                                                     | `undefined` |                       |                |
| `_measurerEl`              | private | `HTMLDivElement`                                                                                                          |             |                       |                |
| `_inputElement`            | private | `HTMLInputElement \| HTMLTextAreaElement`                                                                                 |             |                       |                |
| `_textareaHeight`          | private | `number`                                                                                                                  | `0`         |                       |                |
| `_severity`                | private | `Severity`                                                                                                                |             |                       |                |
| `_textareaDefaultCursor`   | private | `boolean`                                                                                                                 | `false`     |                       |                |
| `focusElement`             |         | `HTMLInputElement \| HTMLTextAreaElement`                                                                                 |             |                       |                |
| `onInputFocus`             | private |                                                                                                                           |             |                       |                |
| `onInputBlur`              | private |                                                                                                                           |             |                       |                |
| `onInputInput`             | private |                                                                                                                           |             |                       |                |
| `onInputChange`            | private |                                                                                                                           |             |                       |                |
| `onTextareaMouseMove`      | private |                                                                                                                           |             |                       |                |
| `resizeTextareaIfRequired` | private |                                                                                                                           |             |                       |                |

### Methods

| Name       | Privacy | Description | Parameters | Return   | Inherited From |
| ---------- | ------- | ----------- | ---------- | -------- | -------------- |
| `focus`    |         |             |            | `void`   |                |
| `toString` |         |             |            | `string` |                |

### Attributes

| Name          | Field       | Inherited From |
| ------------- | ----------- | -------------- |
| `panelInput`  | panelInput  |                |
| `type`        | type        |                |
| `variant`     |             |                |
| `name`        |             |                |
| `label`       | label       |                |
| `multiline`   | multiline   |                |
| `message`     | message     |                |
| `severity`    | severity    |                |
| `focused`     | focused     |                |
| `value`       | value       |                |
| `placeholder` | placeholder |                |
| `lines`       | lines       |                |
| `maxLines`    | maxLines    |                |
| `min`         | min         |                |
| `minLength`   | minLength   |                |
| `max`         | max         |                |
| `maxLength`   | maxLength   |                |
| `multiple`    | multiple    |                |
| `readonly`    | readonly    |                |
| `step`        | step        |                |

### CSS Properties

| Name                                         | Default | Description |
| -------------------------------------------- | ------- | ----------- |
| `--vscode-scrollbarSlider-background`        |         |             |
| `--vscode-scrollbarSlider-hoverBackground`   |         |             |
| `--vscode-scrollbarSlider-activeBackground`  |         |             |
| `--vscode-input-background`                  |         |             |
| `--vscode-settings-textInputBorder`          |         |             |
| `--vscode-input-foreground`                  |         |             |
| `--vscode-input-placeholderForeground`       |         |             |
| `--vscode-focusBorder`                       |         |             |
| `--vscode-panelInput-border`                 |         |             |
| `--vscode-focusBorder`                       |         |             |
| `--vscode-inputValidation-infoBackground`    |         |             |
| `--vscode-inputValidation-infoBorder`        |         |             |
| `--vscode-inputValidation-warningBackground` |         |             |
| `--vscode-inputValidation-warningBorder`     |         |             |
| `--vscode-inputValidation-errorBackground`   |         |             |
| `--vscode-inputValidation-errorBorder`       |         |             |
| `--vscode-editor-background`                 |         |             |

<hr/>

## Exports

| Kind                        | Name              | Declaration    | Module                 | Package |
| --------------------------- | ----------------- | -------------- | ---------------------- | ------- |
| `js`                        | `VscodeInputbox`  | VscodeInputbox | src/vscode-inputbox.ts |         |
| `custom-element-definition` | `vscode-inputbox` | VscodeInputbox | src/vscode-inputbox.ts |         |

# `src/vscode-label.ts`:

## class: `VscodeLabel`, `vscode-label`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name  | Privacy | Type     | Default | Description | Inherited From |
| ----- | ------- | -------- | ------- | ----------- | -------------- |
| `for` |         | `string` | `''`    |             |                |

### Methods

| Name           | Privacy | Description | Parameters | Return | Inherited From |
| -------------- | ------- | ----------- | ---------- | ------ | -------------- |
| `_handleClick` | private |             |            |        |                |

### Attributes

| Name  | Field | Inherited From |
| ----- | ----- | -------------- |
| `for` | for   |                |

<hr/>

## Exports

| Kind                        | Name           | Declaration | Module              | Package |
| --------------------------- | -------------- | ----------- | ------------------- | ------- |
| `js`                        | `VscodeLabel`  | VscodeLabel | src/vscode-label.ts |         |
| `custom-element-definition` | `vscode-label` | VscodeLabel | src/vscode-label.ts |         |

# `src/vscode-multi-select.ts`:

## class: `VscodeMultiSelect`, `vscode-multi-select`

### Superclass

| Name               | Module                                         | Package |
| ------------------ | ---------------------------------------------- | ------- |
| `VscodeSelectBase` | /src/includes/vscode-select/vscode-select-base |         |

### Fields

| Name              | Privacy | Type       | Default | Description | Inherited From |
| ----------------- | ------- | ---------- | ------- | ----------- | -------------- |
| `selectedIndexes` |         | `number[]` |         |             |                |
| `value`           |         | `string[]` |         |             |                |
| `_multiple`       |         | `boolean`  | `true`  |             |                |

### Methods

| Name                       | Privacy   | Description | Parameters       | Return           | Inherited From |
| -------------------------- | --------- | ----------- | ---------------- | ---------------- | -------------- |
| `_onOptionClick`           | private   |             | `ev: MouseEvent` |                  |                |
| `_onMultiAcceptClick`      | private   |             |                  | `void`           |                |
| `_onMultiDeselectAllClick` | private   |             |                  | `void`           |                |
| `_onMultiSelectAllClick`   | private   |             |                  | `void`           |                |
| `_renderLabel`             | private   |             |                  |                  |                |
| `_renderSelectFace`        | protected |             |                  | `TemplateResult` |                |
| `_renderComboboxFace`      | protected |             |                  | `TemplateResult` |                |
| `_renderOptions`           | protected |             |                  | `TemplateResult` |                |
| `_renderDropdownControls`  | protected |             |                  | `TemplateResult` |                |

### Attributes

| Name              | Field           | Inherited From |
| ----------------- | --------------- | -------------- |
| `name`            |                 |                |
| `selectedIndexes` | selectedIndexes |                |
| `value`           | value           |                |

<hr/>

## Exports

| Kind                        | Name                  | Declaration       | Module                     | Package |
| --------------------------- | --------------------- | ----------------- | -------------------------- | ------- |
| `js`                        | `VscodeMultiSelect`   | VscodeMultiSelect | src/vscode-multi-select.ts |         |
| `custom-element-definition` | `vscode-multi-select` | VscodeMultiSelect | src/vscode-multi-select.ts |         |

# `src/vscode-option.ts`:

## class: `VscodeOption`, `vscode-option`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name          | Privacy | Type      | Default | Description | Inherited From |
| ------------- | ------- | --------- | ------- | ----------- | -------------- |
| `value`       |         | `string`  | `''`    |             |                |
| `description` |         | `string`  | `''`    |             |                |
| `selected`    |         | `boolean` | `false` |             |                |
| `disabled`    |         | `boolean` | `false` |             |                |

### Attributes

| Name          | Field       | Inherited From |
| ------------- | ----------- | -------------- |
| `value`       | value       |                |
| `description` | description |                |
| `selected`    | selected    |                |
| `disabled`    | disabled    |                |

<hr/>

## Exports

| Kind                        | Name            | Declaration  | Module               | Package |
| --------------------------- | --------------- | ------------ | -------------------- | ------- |
| `js`                        | `VscodeOption`  | VscodeOption | src/vscode-option.ts |         |
| `custom-element-definition` | `vscode-option` | VscodeOption | src/vscode-option.ts |         |

# `src/vscode-radio-group.ts`:

## class: `VscodeRadioGroup`, `vscode-radio-group`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name      | Privacy | Type                         | Default        | Description | Inherited From |
| --------- | ------- | ---------------------------- | -------------- | ----------- | -------------- |
| `variant` |         | `'horizontal' \| 'vertical'` | `'horizontal'` |             |                |
| `inline`  |         | `boolean`                    | `false`        |             |                |

### Attributes

| Name      | Field   | Inherited From |
| --------- | ------- | -------------- |
| `variant` | variant |                |
| `inline`  | inline  |                |

<hr/>

## Exports

| Kind                        | Name                 | Declaration      | Module                    | Package |
| --------------------------- | -------------------- | ---------------- | ------------------------- | ------- |
| `js`                        | `VscodeRadioGroup`   | VscodeRadioGroup | src/vscode-radio-group.ts |         |
| `custom-element-definition` | `vscode-radio-group` | VscodeRadioGroup | src/vscode-radio-group.ts |         |

# `src/vscode-radio.ts`:

## class: `VscodeRadio`, `vscode-radio`

### Superclass

| Name                   | Module                                                | Package |
| ---------------------- | ----------------------------------------------------- | ------- |
| `FormButtonWidgetBase` | /src/includes/form-button-widget/FormButtonWidgetBase |         |

### Fields

| Name          | Privacy | Type      | Default | Description | Inherited From |
| ------------- | ------- | --------- | ------- | ----------- | -------------- |
| `checked`     |         | `boolean` |         |             |                |
| `label`       |         | `string`  | `''`    |             |                |
| `name`        |         | `string`  | `''`    |             |                |
| `value`       |         | `string`  | `''`    |             |                |
| `disabled`    |         | `boolean` | `false` |             |                |
| `_checked`    |         | `boolean` | `false` |             |                |
| `isSlotEmpty` | private | `boolean` | `true`  |             |                |

### Methods

| Name                | Privacy   | Description | Parameters             | Return | Inherited From |
| ------------------- | --------- | ----------- | ---------------------- | ------ | -------------- |
| `_checkButton`      | private   |             |                        |        |                |
| `_handleClick`      | protected |             |                        | `void` |                |
| `_handleKeyDown`    | protected |             | `event: KeyboardEvent` | `void` |                |
| `_handleSlotChange` | private   |             |                        |        |                |

### Events

| Name         | Type          | Description | Inherited From |
| ------------ | ------------- | ----------- | -------------- |
| `vsc-change` | `CustomEvent` |             |                |

### Attributes

| Name       | Field    | Inherited From |
| ---------- | -------- | -------------- |
| `name`     | name     |                |
| `checked`  | checked  |                |
| `label`    | label    |                |
| `value`    | value    |                |
| `disabled` | disabled |                |

<hr/>

## Exports

| Kind                        | Name           | Declaration | Module              | Package |
| --------------------------- | -------------- | ----------- | ------------------- | ------- |
| `js`                        | `VscodeRadio`  | VscodeRadio | src/vscode-radio.ts |         |
| `custom-element-definition` | `vscode-radio` | VscodeRadio | src/vscode-radio.ts |         |

# `src/vscode-scrollable.ts`:

## class: `VscodeScrollable`, `vscode-scrollable`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name                           | Privacy | Type             | Default | Description | Inherited From |
| ------------------------------ | ------- | ---------------- | ------- | ----------- | -------------- |
| `shadow`                       |         | `boolean`        | `true`  |             |                |
| `scrolled`                     |         | `boolean`        | `false` |             |                |
| `scrollPos`                    |         | `number`         |         |             |                |
| `scrollMax`                    |         | `number`         |         |             |                |
| `_isDragging`                  | private | `boolean`        | `false` |             |                |
| `_thumbHeight`                 | private | `number`         | `0`     |             |                |
| `_thumbY`                      | private | `number`         | `0`     |             |                |
| `_thumbVisible`                | private | `boolean`        | `false` |             |                |
| `_thumbFade`                   | private | `boolean`        | `false` |             |                |
| `_thumbActive`                 | private | `boolean`        | `false` |             |                |
| `_contentElement`              | private | `HTMLDivElement` |         |             |                |
| `_scrollThumbElement`          | private | `HTMLDivElement` |         |             |                |
| `_scrollableContainer`         | private | `HTMLDivElement` |         |             |                |
| `_assignedNodes`               | private | `NodeList`       |         |             |                |
| `_resizeObserver`              | private | `ResizeObserver` |         |             |                |
| `_scrollThumbStartY`           | private | `number`         | `0`     |             |                |
| `_mouseStartY`                 | private | `number`         | `0`     |             |                |
| `_scrollbarVisible`            | private | `boolean`        | `true`  |             |                |
| `_scrollbarTrackZ`             | private | `number`         | `0`     |             |                |
| `_resizeObserverCallbackBound` | private |                  |         |             |                |
| `_onScrollThumbMouseMoveBound` | private |                  |         |             |                |
| `_onScrollThumbMouseUpBound`   | private |                  |         |             |                |
| `_onComponentMouseOverBound`   | private |                  |         |             |                |
| `_onComponentMouseOutBound`    | private |                  |         |             |                |

### Methods

| Name                           | Privacy | Description | Parameters          | Return | Inherited From |
| ------------------------------ | ------- | ----------- | ------------------- | ------ | -------------- |
| `_resizeObserverCallback`      | private |             |                     |        |                |
| `_updateScrollbar`             | private |             |                     |        |                |
| `_zIndexFix`                   | private |             |                     |        |                |
| `_onSlotChange`                | private |             |                     |        |                |
| `_onScrollThumbMouseDown`      | private |             | `event: MouseEvent` |        |                |
| `_onScrollThumbMouseMove`      | private |             | `event: MouseEvent` |        |                |
| `_onScrollThumbMouseUp`        | private |             | `event: MouseEvent` |        |                |
| `_onScrollableContainerScroll` | private |             |                     |        |                |
| `_onComponentMouseOver`        | private |             |                     |        |                |
| `_onComponentMouseOut`         | private |             |                     |        |                |

### Attributes

| Name        | Field     | Inherited From |
| ----------- | --------- | -------------- |
| `shadow`    | shadow    |                |
| `scrolled`  | scrolled  |                |
| `scrollPos` | scrollPos |                |
| `scrollMax` | scrollMax |                |

<hr/>

## Exports

| Kind                        | Name                | Declaration      | Module                   | Package |
| --------------------------- | ------------------- | ---------------- | ------------------------ | ------- |
| `js`                        | `VscodeScrollable`  | VscodeScrollable | src/vscode-scrollable.ts |         |
| `custom-element-definition` | `vscode-scrollable` | VscodeScrollable | src/vscode-scrollable.ts |         |

# `src/vscode-single-select.ts`:

## class: `VscodeSingleSelect`, `vscode-single-select`

### Superclass

| Name               | Module                                         | Package |
| ------------------ | ---------------------------------------------- | ------- |
| `VscodeSelectBase` | /src/includes/vscode-select/vscode-select-base |         |

### Fields

| Name            | Privacy | Type      | Default     | Description | Inherited From |
| --------------- | ------- | --------- | ----------- | ----------- | -------------- |
| `role`          |         | `string`  | `'listbox'` |             |                |
| `selectedIndex` |         | `number`  |             |             |                |
| `value`         |         | `string`  |             |             |                |
| `_labelText`    | private | `string`  | `''`        |             |                |
| `_multiple`     |         | `boolean` | `false`     |             |                |

### Methods

| Name                  | Privacy   | Description | Parameters       | Return           | Inherited From |
| --------------------- | --------- | ----------- | ---------------- | ---------------- | -------------- |
| `updateInputValue`    | private   |             |                  |                  |                |
| `_onSlotChange`       | protected |             |                  | `void`           |                |
| `_onArrowUpKeyDown`   | protected |             |                  | `void`           |                |
| `_onArrowDownKeyDown` | protected |             |                  | `void`           |                |
| `_onEnterKeyDown`     | protected |             |                  | `void`           |                |
| `_onOptionClick`      | private   |             | `ev: MouseEvent` |                  |                |
| `_renderLabel`        | private   |             |                  |                  |                |
| `_renderSelectFace`   | protected |             |                  | `TemplateResult` |                |
| `_renderComboboxFace` | protected |             |                  | `TemplateResult` |                |
| `_renderOptions`      | protected |             |                  | `TemplateResult` |                |

### Attributes

| Name            | Field         | Inherited From |
| --------------- | ------------- | -------------- |
| `name`          |               |                |
| `role`          | role          |                |
| `selectedIndex` | selectedIndex |                |
| `value`         | value         |                |

<hr/>

## Exports

| Kind                        | Name                   | Declaration        | Module                      | Package |
| --------------------------- | ---------------------- | ------------------ | --------------------------- | ------- |
| `js`                        | `VscodeSingleSelect`   | VscodeSingleSelect | src/vscode-single-select.ts |         |
| `custom-element-definition` | `vscode-single-select` | VscodeSingleSelect | src/vscode-single-select.ts |         |

# `src/vscode-split-layout.ts`:

## class: `VscodeSplitLayout`, `vscode-split-layout`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name                    | Privacy | Type                         | Default         | Description | Inherited From |
| ----------------------- | ------- | ---------------------------- | --------------- | ----------- | -------------- |
| `split`                 |         | `'horizontal' \| 'vertical'` | `'vertical'`    |             |                |
| `resetOnDblClick`       |         | `boolean`                    | `false`         |             |                |
| `initialPos`            |         | `string`                     | `'50%'`         |             |                |
| `_startPaneRight`       |         | `number`                     | `0`             |             |                |
| `_startPaneBottom`      |         | `number`                     | `0`             |             |                |
| `_endPaneTop`           |         | `number`                     | `0`             |             |                |
| `_endPaneLeft`          |         | `number`                     | `0`             |             |                |
| `_handleLeft`           |         | `number`                     | `0`             |             |                |
| `_handleTop`            |         | `number`                     | `0`             |             |                |
| `_isDragActive`         |         | `boolean`                    | `false`         |             |                |
| `_hover`                | private | `boolean`                    | `false`         |             |                |
| `_hide`                 | private | `boolean`                    | `false`         |             |                |
| `_boundRect`            | private | `DOMRect`                    | `new DOMRect()` |             |                |
| `_handleOffset`         | private | `number`                     | `0`             |             |                |
| `_handleMouseUpBound`   | private |                              |                 |             |                |
| `_handleMouseMoveBound` | private |                              |                 |             |                |

### Methods

| Name               | Privacy | Description | Parameters          | Return | Inherited From |
| ------------------ | ------- | ----------- | ------------------- | ------ | -------------- |
| `_initPosition`    | private |             |                     |        |                |
| `_handleMouseOver` | private |             |                     |        |                |
| `_handleMouseOut`  | private |             | `event: MouseEvent` |        |                |
| `_handleMouseDown` | private |             | `event: MouseEvent` |        |                |
| `_handleMouseUp`   | private |             |                     |        |                |
| `_handleMouseMove` | private |             | `event: MouseEvent` |        |                |
| `_handleDblClick`  | private |             |                     |        |                |

### Attributes

| Name              | Field           | Inherited From |
| ----------------- | --------------- | -------------- |
| `split`           | split           |                |
| `resetOnDblClick` | resetOnDblClick |                |
| `initialPos`      | initialPos      |                |

<hr/>

## Exports

| Kind                        | Name                  | Declaration       | Module                     | Package |
| --------------------------- | --------------------- | ----------------- | -------------------------- | ------- |
| `js`                        | `VscodeSplitLayout`   | VscodeSplitLayout | src/vscode-split-layout.ts |         |
| `custom-element-definition` | `vscode-split-layout` | VscodeSplitLayout | src/vscode-split-layout.ts |         |

# `src/vscode-table-body.ts`:

## class: `VscodeTableBody`, `vscode-table-body`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name   | Privacy | Type     | Default      | Description | Inherited From |
| ------ | ------- | -------- | ------------ | ----------- | -------------- |
| `role` |         | `string` | `'rowgroup'` |             |                |

### Attributes

| Name   | Field | Inherited From |
| ------ | ----- | -------------- |
| `role` | role  |                |

<hr/>

## Exports

| Kind                        | Name                | Declaration     | Module                   | Package |
| --------------------------- | ------------------- | --------------- | ------------------------ | ------- |
| `js`                        | `VscodeTableBody`   | VscodeTableBody | src/vscode-table-body.ts |         |
| `custom-element-definition` | `vscode-table-body` | VscodeTableBody | src/vscode-table-body.ts |         |

# `src/vscode-table-cell.ts`:

## class: `VscodeTableCell`, `vscode-table-cell`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name          | Privacy | Type      | Default  | Description                                                                   | Inherited From |
| ------------- | ------- | --------- | -------- | ----------------------------------------------------------------------------- | -------------- |
| `role`        |         | `string`  | `'cell'` |                                                                               |                |
| `columnLabel` |         | `string`  | `''`     | Cell label in the compact view of the responsive mode. For internal use only. |                |
| `compact`     |         | `boolean` | `false`  | Enable compact view in the responsive mode. For internal use only.            |                |

### Attributes

| Name          | Field       | Inherited From |
| ------------- | ----------- | -------------- |
| `role`        | role        |                |
| `columnLabel` | columnLabel |                |
| `compact`     | compact     |                |

<hr/>

## Exports

| Kind                        | Name                | Declaration     | Module                   | Package |
| --------------------------- | ------------------- | --------------- | ------------------------ | ------- |
| `js`                        | `VscodeTableCell`   | VscodeTableCell | src/vscode-table-cell.ts |         |
| `custom-element-definition` | `vscode-table-cell` | VscodeTableCell | src/vscode-table-cell.ts |         |

# `src/vscode-table-header-cell.ts`:

## class: `VscodeTableHeaderCell`, `vscode-table-header-cell`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name   | Privacy | Type     | Default          | Description | Inherited From |
| ------ | ------- | -------- | ---------------- | ----------- | -------------- |
| `role` |         | `string` | `'columnheader'` |             |                |

### Attributes

| Name   | Field | Inherited From |
| ------ | ----- | -------------- |
| `role` | role  |                |

<hr/>

## Exports

| Kind                        | Name                       | Declaration           | Module                          | Package |
| --------------------------- | -------------------------- | --------------------- | ------------------------------- | ------- |
| `js`                        | `VscodeTableHeaderCell`    | VscodeTableHeaderCell | src/vscode-table-header-cell.ts |         |
| `custom-element-definition` | `vscode-table-header-cell` | VscodeTableHeaderCell | src/vscode-table-header-cell.ts |         |

# `src/vscode-table-header.ts`:

## class: `VscodeTableHeader`, `vscode-table-header`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name   | Privacy | Type     | Default      | Description | Inherited From |
| ------ | ------- | -------- | ------------ | ----------- | -------------- |
| `role` |         | `string` | `'rowgroup'` |             |                |

### Attributes

| Name   | Field | Inherited From |
| ------ | ----- | -------------- |
| `role` | role  |                |

<hr/>

## Exports

| Kind                        | Name                  | Declaration       | Module                     | Package |
| --------------------------- | --------------------- | ----------------- | -------------------------- | ------- |
| `js`                        | `VscodeTableHeader`   | VscodeTableHeader | src/vscode-table-header.ts |         |
| `custom-element-definition` | `vscode-table-header` | VscodeTableHeader | src/vscode-table-header.ts |         |

# `src/vscode-table-row.ts`:

## class: `VscodeTableRow`, `vscode-table-row`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name   | Privacy | Type     | Default | Description | Inherited From |
| ------ | ------- | -------- | ------- | ----------- | -------------- |
| `role` |         | `string` | `'row'` |             |                |

### Attributes

| Name   | Field | Inherited From |
| ------ | ----- | -------------- |
| `role` | role  |                |

<hr/>

## Exports

| Kind                        | Name               | Declaration    | Module                   | Package |
| --------------------------- | ------------------ | -------------- | ------------------------ | ------- |
| `js`                        | `VscodeTableRow`   | VscodeTableRow | src/vscode-table-row\.ts |         |
| `custom-element-definition` | `vscode-table-row` | VscodeTableRow | src/vscode-table-row\.ts |         |

# `src/vscode-table.ts`:

## class: `VscodeTable`, `vscode-table`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name                                    | Privacy | Type                            | Default   | Description                                                                                                                                                                                                                                                                             | Inherited From |
| --------------------------------------- | ------- | ------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `role`                                  |         | `string`                        | `'table'` |                                                                                                                                                                                                                                                                                         |                |
| `resizable`                             |         | `boolean`                       | `false`   |                                                                                                                                                                                                                                                                                         |                |
| `responsive`                            |         | `boolean`                       | `false`   |                                                                                                                                                                                                                                                                                         |                |
| `breakpoint`                            |         | `number`                        | `300`     |                                                                                                                                                                                                                                                                                         |                |
| `columns`                               |         | `string[]`                      |           | Initial column sizes in a JSON-encoded array.&#xD;&#xA;Accepted values are:&#xD;&#xA;- number&#xD;&#xA;- string-type number (ex.: "100")&#xD;&#xA;- px value (ex.: "100px")&#xD;&#xA;- percentage value (ex.: "50%")&#xD;&#xA;- percentage value (ex.: "50%")&#xD;&#xA;- "auto" keyword |                |
| `minColumnWidth`                        |         | `string`                        | `'50px'`  | Minimum column width. Valid values are:&#xD;&#xA;- number&#xD;&#xA;- string-type number (ex.: "100")&#xD;&#xA;- px value (ex.: "100px")&#xD;&#xA;- percentage value (ex.: "50%")&#xD;&#xA;- percentage value (ex.: "50%")&#xD;&#xA;- "auto" keyword                                     |                |
| `delayedResizing`                       |         | `boolean`                       | `false`   |                                                                                                                                                                                                                                                                                         |                |
| `compact`                               |         | `boolean`                       | `false`   | For internal use only                                                                                                                                                                                                                                                                   |                |
| `_bodySlot`                             | private | `HTMLSlotElement`               |           |                                                                                                                                                                                                                                                                                         |                |
| `_headerElement`                        | private | `HTMLDivElement`                |           |                                                                                                                                                                                                                                                                                         |                |
| `_scrollableElement`                    | private | `VscodeScrollable`              |           |                                                                                                                                                                                                                                                                                         |                |
| `_sashVisibleElements`                  | private | `HTMLDivElement[]`              |           |                                                                                                                                                                                                                                                                                         |                |
| `_assignedHeaderElements`               | private | `NodeListOf<VscodeTableHeader>` |           |                                                                                                                                                                                                                                                                                         |                |
| `_assignedBodyElements`                 | private | `NodeListOf<VscodeTableBody>`   |           |                                                                                                                                                                                                                                                                                         |                |
| `_sashPositions`                        | private | `number[]`                      | `[]`      | Sash positions in percentage                                                                                                                                                                                                                                                            |                |
| `_isDragging`                           | private | `boolean`                       | `false`   |                                                                                                                                                                                                                                                                                         |                |
| `_sashHovers`                           | private | `boolean[]`                     | `[]`      | Sash hover state flags, used in the render.                                                                                                                                                                                                                                             |                |
| `_columns`                              | private | `string[]`                      | `[]`      |                                                                                                                                                                                                                                                                                         |                |
| `_componentResizeObserver`              | private | `ResizeObserver`                |           |                                                                                                                                                                                                                                                                                         |                |
| `_headerResizeObserver`                 | private | `ResizeObserver`                |           |                                                                                                                                                                                                                                                                                         |                |
| `_activeSashElementIndex`               | private | `number`                        | `-1`      |                                                                                                                                                                                                                                                                                         |                |
| `_activeSashCursorOffset`               | private | `number`                        | `0`       |                                                                                                                                                                                                                                                                                         |                |
| `_componentX`                           | private | `number`                        | `0`       |                                                                                                                                                                                                                                                                                         |                |
| `_componentH`                           | private | `number`                        | `0`       |                                                                                                                                                                                                                                                                                         |                |
| `_componentW`                           | private | `number`                        | `0`       |                                                                                                                                                                                                                                                                                         |                |
| `_headerCells`                          | private | `VscodeTableHeaderCell[]`       | `[]`      | Cached querySelectorAll result. Updated when the header slot changes.&#xD;&#xA;It shouldn't be used directly, check the "\_getHeaderCells" function.                                                                                                                                    |                |
| `_cellsOfFirstRow`                      | private | `VscodeTableCell[]`             | `[]`      | Cached querySelectorAll result. Updated when the body slot changes.&#xD;&#xA;It shouldn't be used directly, check the "\_getCellsOfFirstRow" function.                                                                                                                                  |                |
| `_cellsToResize`                        | private | `VscodeTableCell[]`             |           |                                                                                                                                                                                                                                                                                         |                |
| `_headerCellsToResize`                  | private | `VscodeTableHeaderCell[]`       |           |                                                                                                                                                                                                                                                                                         |                |
| `_prevHeaderHeight`                     | private | `number`                        | `0`       |                                                                                                                                                                                                                                                                                         |                |
| `_prevComponentHeight`                  | private | `number`                        | `0`       |                                                                                                                                                                                                                                                                                         |                |
| `_componentResizeObserverCallbackBound` | private |                                 |           |                                                                                                                                                                                                                                                                                         |                |
| `_headerResizeObserverCallbackBound`    | private |                                 |           |                                                                                                                                                                                                                                                                                         |                |
| `_onResizingMouseMoveBound`             | private |                                 |           |                                                                                                                                                                                                                                                                                         |                |
| `_onResizingMouseUpBound`               | private |                                 |           |                                                                                                                                                                                                                                                                                         |                |

### Methods

| Name                               | Privacy | Description                   | Parameters            | Return                                                                             | Inherited From |
| ---------------------------------- | ------- | ----------------------------- | --------------------- | ---------------------------------------------------------------------------------- | -------------- |
| `_px2Percent`                      | private |                               | `px: number`          |                                                                                    |                |
| `_percent2Px`                      | private |                               | `percent: number`     |                                                                                    |                |
| `_memoizeComponentDimensions`      | private |                               |                       |                                                                                    |                |
| `_queryHeaderCells`                | private |                               |                       |                                                                                    |                |
| `_getHeaderCells`                  | private | Get cached header cells       |                       |                                                                                    |                |
| `_queryCellsOfFirstRow`            | private |                               |                       |                                                                                    |                |
| `_getCellsOfFirstRow`              | private | Get cached cells of first row |                       |                                                                                    |                |
| `_initResizeObserver`              | private |                               |                       |                                                                                    |                |
| `_componentResizeObserverCallback` | private |                               |                       |                                                                                    |                |
| `_headerResizeObserverCallback`    | private |                               |                       |                                                                                    |                |
| `_calcColWidthPercentages`         | private |                               |                       | `number[]`                                                                         |                |
| `_initHeaderCellSizes`             | private |                               | `colWidths: number[]` |                                                                                    |                |
| `_initBodyColumnSizes`             | private |                               | `colWidths: number[]` |                                                                                    |                |
| `_initSashes`                      | private |                               | `colWidths: number[]` |                                                                                    |                |
| `_initDefaultColumnSizes`          | private |                               |                       |                                                                                    |                |
| `_updateScrollpaneSize`            | private |                               |                       |                                                                                    |                |
| `_applyCompactViewColumnLabels`    | private |                               |                       |                                                                                    |                |
| `_clearCompactViewColumnLabels`    | private |                               |                       |                                                                                    |                |
| `_toggleCompactView`               | private |                               |                       |                                                                                    |                |
| `_onHeaderSlotChange`              | private |                               |                       |                                                                                    |                |
| `_onBodySlotChange`                | private |                               |                       |                                                                                    |                |
| `_onSashMouseOver`                 | private |                               | `event: MouseEvent`   |                                                                                    |                |
| `_onSashMouseOut`                  | private |                               | `event: MouseEvent`   |                                                                                    |                |
| `_onSashMouseDown`                 | private |                               | `event: MouseEvent`   |                                                                                    |                |
| `_updateActiveSashPosition`        | private |                               | `mouseX: number`      |                                                                                    |                |
| `_getSashPositions`                | private |                               |                       | `{
    sashPos: number;
    prevSashPos: number;
    nextSashPos: number;
  }` |                |
| `_resizeColumns`                   | private |                               | `resizeBodyCells`     |                                                                                    |                |
| `_onResizingMouseMove`             | private |                               | `event: MouseEvent`   |                                                                                    |                |
| `_onResizingMouseUp`               | private |                               | `event: MouseEvent`   |                                                                                    |                |

### Attributes

| Name               | Field           | Inherited From |
| ------------------ | --------------- | -------------- |
| `zebra`            |                 |                |
| `bordered`         |                 |                |
| `role`             | role            |                |
| `resizable`        | resizable       |                |
| `responsive`       | responsive      |                |
| `breakpoint`       | breakpoint      |                |
| `columns`          | columns         |                |
| `min-column-width` | minColumnWidth  |                |
| `delayed-resizing` | delayedResizing |                |
| `compact`          | compact         |                |

<hr/>

## Exports

| Kind                        | Name           | Declaration | Module              | Package |
| --------------------------- | -------------- | ----------- | ------------------- | ------- |
| `js`                        | `VscodeTable`  | VscodeTable | src/vscode-table.ts |         |
| `custom-element-definition` | `vscode-table` | VscodeTable | src/vscode-table.ts |         |

# `src/vscode-tabs.ts`:

## class: `VscodeTabs`, `vscode-tabs`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name             | Privacy | Type                      | Default | Description | Inherited From |
| ---------------- | ------- | ------------------------- | ------- | ----------- | -------------- |
| `selectedIndex`  |         | `number`                  |         |             |                |
| `_headerSlot`    | private | `HTMLSlotElement \| null` | `null`  |             |                |
| `_mainSlot`      | private | `HTMLSlotElement \| null` | `null`  |             |                |
| `_selectedIndex` | private | `number`                  | `0`     |             |                |

### Methods

| Name             | Privacy | Description | Parameters          | Return | Inherited From |
| ---------------- | ------- | ----------- | ------------------- | ------ | -------------- |
| `_setActiveTab`  | private |             |                     |        |                |
| `_onSlotChanged` | private |             |                     |        |                |
| `_onHeaderClick` | private |             | `event: MouseEvent` |        |                |

### Events

| Name         | Type          | Description | Inherited From |
| ------------ | ------------- | ----------- | -------------- |
| `vsc-select` | `CustomEvent` |             |                |

### Attributes

| Name            | Field         | Inherited From |
| --------------- | ------------- | -------------- |
| `selectedIndex` | selectedIndex |                |

<hr/>

## Exports

| Kind                        | Name          | Declaration | Module             | Package |
| --------------------------- | ------------- | ----------- | ------------------ | ------- |
| `js`                        | `VscodeTabs`  | VscodeTabs  | src/vscode-tabs.ts |         |
| `custom-element-definition` | `vscode-tabs` | VscodeTabs  | src/vscode-tabs.ts |         |

# `src/vscode-tree.ts`:

## class: `VscodeTree`, `vscode-tree`

### Superclass

| Name         | Module                   | Package |
| ------------ | ------------------------ | ------- |
| `VscElement` | /src/includes/VscElement |         |

### Fields

| Name                      | Privacy | Type               | Default | Description | Inherited From |
| ------------------------- | ------- | ------------------ | ------- | ----------- | -------------- |
| `data`                    |         | `TreeItem[]`       |         |             |                |
| `indent`                  |         | `number`           | `8`     |             |                |
| `arrows`                  |         | `boolean`          | `false` |             |                |
| `multiline`               |         | `boolean`          | `false` |             |                |
| `tabindex`                |         | `number`           | `0`     |             |                |
| `_data`                   | private | `TreeItem[]`       | `[]`    |             |                |
| `_selectedItem`           | private | `TreeItem \| null` | `null`  |             |                |
| `_focusedItem`            | private | `TreeItem \| null` | `null`  |             |                |
| `onComponentKeyDownBound` | private |                    |         |             |                |

### Methods

| Name                      | Privacy | Description | Parameters                                                                                                                                                                                                                                                                                                                                                                       | Return                | Inherited From |
| ------------------------- | ------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------------- |
| `getItemByPath`           | private |             | `path: number[]`                                                                                                                                                                                                                                                                                                                                                                 | `TreeItem \| null`    |                |
| `getItemType`             | private |             | `item: TreeItem`                                                                                                                                                                                                                                                                                                                                                                 | `ItemType`            |                |
| `getIconName`             | private |             | `element: TreeItem`                                                                                                                                                                                                                                                                                                                                                              | `string \| undefined` |                |
| `renderTreeItem`          | private |             | `{
    indentLevel,
    label,
    path,
    iconName,
    open = false,
    itemType,
    selected = false,
    focused = false,
    subItems,
  }: {
    indentLevel: number;
    label: string;
    path: number[];
    iconName: string \| undefined;
    open: boolean;
    itemType: ItemType;
    selected: boolean;
    focused: boolean;
    subItems: TreeItem[];
  }` |                       |                |
| `renderTree`              | private |             | `tree: TreeItem[], oldPath: number[]`                                                                                                                                                                                                                                                                                                                                            |                       |                |
| `toggleSubTreeOpen`       | private |             | `item: TreeItem`                                                                                                                                                                                                                                                                                                                                                                 |                       |                |
| `selectTreeItem`          | private |             | `item: TreeItem`                                                                                                                                                                                                                                                                                                                                                                 |                       |                |
| `focusTreeItem`           | private |             | `item: TreeItem`                                                                                                                                                                                                                                                                                                                                                                 |                       |                |
| `closeSubTreeRecursively` | private |             | `tree: TreeItem[]`                                                                                                                                                                                                                                                                                                                                                               |                       |                |
| `emitSelectEvent`         | private |             | `item: TreeItem, path: string`                                                                                                                                                                                                                                                                                                                                                   |                       |                |
| `_focusItem`              | private |             | `item: TreeItem`                                                                                                                                                                                                                                                                                                                                                                 |                       |                |
| `_focusPrevItem`          | private |             |                                                                                                                                                                                                                                                                                                                                                                                  |                       |                |
| `_focusNextItem`          | private |             |                                                                                                                                                                                                                                                                                                                                                                                  |                       |                |
| `onComponentClick`        | private |             | `event: MouseEvent`                                                                                                                                                                                                                                                                                                                                                              |                       |                |
| `onComponentKeyDown`      | private |             | `ev: KeyboardEvent`                                                                                                                                                                                                                                                                                                                                                              |                       |                |
| `closeAll`                | public  |             |                                                                                                                                                                                                                                                                                                                                                                                  | `void`                |                |

### Events

| Name         | Type          | Description | Inherited From |
| ------------ | ------------- | ----------- | -------------- |
| `vsc-select` | `CustomEvent` |             |                |

### Attributes

| Name        | Field     | Inherited From |
| ----------- | --------- | -------------- |
| `data`      | data      |                |
| `indent`    | indent    |                |
| `arrows`    | arrows    |                |
| `multiline` | multiline |                |
| `tabindex`  | tabindex  |                |

<hr/>

## Exports

| Kind                        | Name          | Declaration | Module             | Package |
| --------------------------- | ------------- | ----------- | ------------------ | ------- |
| `js`                        | `VscodeTree`  | VscodeTree  | src/vscode-tree.ts |         |
| `custom-element-definition` | `vscode-tree` | VscodeTree  | src/vscode-tree.ts |         |
