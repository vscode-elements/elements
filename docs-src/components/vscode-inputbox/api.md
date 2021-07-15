---
layout: component.njk
title: Inputbox
tags: api
component: vscode-inputbox
---

<!-- This file is auto-generated. Do not edit! -->

# VscodeInputbox

## Attributes

| Attribute | Type             | Description      |
|-----------|------------------|------------------|
| `variant` | `narrow | wide` | Predefined sizes |

## Properties

| Property       | Attribute     | Modifiers | Type                                             | Default     | Description           |
|----------------|---------------|-----------|--------------------------------------------------|-------------|-----------------------|
| `focusElement` |               | readonly  | `HTMLInputElement | HTMLTextAreaElement`        |             |                       |
| `focused`      | `focused`     |           | `boolean`                                        | false       |                       |
| `label`        | `label`       |           | `string`                                         | ""          |                       |
| `lines`        | `lines`       |           | `number`                                         | 2           |                       |
| `max`          | `max`         |           | `number | undefined`                            | "undefined" |                       |
| `maxLength`    | `maxLength`   |           | `number | undefined`                            | "undefined" |                       |
| `maxLines`     | `maxLines`    |           | `number`                                         | 5           |                       |
| `message`      | `message`     |           | `string`                                         | ""          |                       |
| `min`          | `min`         |           | `number | undefined`                            | "undefined" |                       |
| `minLength`    | `minLength`   |           | `number | undefined`                            | "undefined" |                       |
| `multiline`    | `multiline`   |           | `boolean`                                        | false       |                       |
| `multiple`     | `multiple`    |           | `boolean`                                        | false       |                       |
| `panelInput`   | `panelInput`  |           | `boolean`                                        | false       |                       |
| `placeholder`  | `placeholder` |           | `string`                                         | ""          |                       |
| `readonly`     | `readonly`    |           | `boolean`                                        | false       |                       |
| `severity`     | `severity`    |           | `string`                                         |             |                       |
| `step`         | `step`        |           | `number | undefined`                            | "undefined" |                       |
| `type`         | `type`        |           | `"color"|"date"|"datetime-local"|"email"|"file"|"month"|"number"|"password"|"tel"|"text"|"time"|"url"|"week"` | "text"      | Text-like input types |
| `value`        | `value`       |           | `string`                                         | ""          |                       |

## Methods

| Method     | Type         |
|------------|--------------|
| `focus`    | `(): void`   |
| `toString` | `(): string` |

## Events

| Event        | Type                  |
|--------------|-----------------------|
| `vsc-change` | `CustomEvent<string>` |
| `vsc-input`  | `CustomEvent<string>` |

## CSS Custom Properties

| Property                                     |
|----------------------------------------------|
| `--vscode-editor-background`                 |
| `--vscode-focusBorder`                       |
| `--vscode-input-background`                  |
| `--vscode-input-foreground`                  |
| `--vscode-input-placeholderForeground`       |
| `--vscode-inputValidation-errorBackground`   |
| `--vscode-inputValidation-errorBorder`       |
| `--vscode-inputValidation-infoBackground`    |
| `--vscode-inputValidation-infoBorder`        |
| `--vscode-inputValidation-warningBackground` |
| `--vscode-inputValidation-warningBorder`     |
| `--vscode-panelInput-border`                 |
| `--vscode-scrollbarSlider-activeBackground`  |
| `--vscode-scrollbarSlider-background`        |
| `--vscode-scrollbarSlider-hoverBackground`   |
| `--vscode-settings-textInputBorder`          |
