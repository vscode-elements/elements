---
layout: component.njk
title: Button
tags: api
component: vscode-button
---

<!-- This file is auto-generated. Do not edit! -->

# VscodeButton

## Properties

| Property    | Attribute   | Type      | Default  | Description                                      |
|-------------|-------------|-----------|----------|--------------------------------------------------|
| `disabled`  | `disabled`  | `boolean` | false    |                                                  |
| `focused`   | `focused`   | `boolean` | false    |                                                  |
| `icon`      | `icon`      | `string`  | ""       | A [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html) before the label |
| `iconAfter` | `iconAfter` | `string`  | ""       | A [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html) after the label |
| `role`      | `role`      | `string`  | "button" |                                                  |
| `secondary` | `secondary` | `boolean` | false    |                                                  |
| `tabindex`  | `tabindex`  | `number`  | 0        |                                                  |

## Events

| Event       | Type                                          | Description                                      |
|-------------|-----------------------------------------------|--------------------------------------------------|
| `click`     | `MouseEvent`                                  |                                                  |
| `vsc-click` | `CustomEvent<{ originalEvent: MouseEvent; }>` | Dispatched only if the disabled attribute is false. |
