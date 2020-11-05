---
layout: page.11ty.cjs
title: <vscode-inputbox> ⌲ API
---

# vscode-inputbox

## Properties

| Property      | Attribute     | Type      | Default |
|---------------|---------------|-----------|---------|
| `focused`     | `focused`     | `boolean` | false   |
| `lines`       | `lines`       | `number`  | 2       |
| `maxLines`    | `maxLines`    | `number`  | 5       |
| `message`     | `message`     | `string`  | ""      |
| `multiline`   | `multiline`   | `boolean` | false   |
| `panelInput`  | `panelInput`  | `boolean` | false   |
| `placeholder` | `placeholder` | `string`  | ""      |
| `severity`    | `severity`    | `string`  |         |
| `type`        | `type`        | `string`  |         |
| `value`       | `value`       | `string`  | ""      |

## Events

| Event        |
|--------------|
| `vsc-change` |
| `vsc-input`  |
