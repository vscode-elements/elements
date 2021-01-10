---
layout: page.11ty.cjs
title: <vscode-inputbox> ⌲ API
tags: api
customElement: vscode-inputbox
---

<!-- This file is auto-generated. Do not edit! -->

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

| Event        | Type                  |
|--------------|-----------------------|
| `vsc-change` | `CustomEvent<string>` |
| `vsc-input`  | `CustomEvent<string>` |
