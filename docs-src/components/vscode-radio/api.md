---
layout: component.njk
title: Radio
tags: api
component: vscode-radio
---

<!-- This file is auto-generated. Do not edit! -->

# VscodeRadio

## Properties

| Property   | Attribute  | Type      | Default | Description                                      |
|------------|------------|-----------|---------|--------------------------------------------------|
| `checked`  | `checked`  | `boolean` |         |                                                  |
| `disabled` | `disabled` | `boolean` | false   |                                                  |
| `focused`  | `focused`  | `boolean` | false   |                                                  |
| `label`    | `label`    | `string`  | ""      |                                                  |
| `name`     | `name`     | `string`  | ""      | Name which is used as a variable name in the data of the form-container. |
| `tabindex` | `tabindex` | `number`  | 0       |                                                  |
| `value`    | `value`    | `string`  | ""      |                                                  |

## Events

| Event        | Type                                             |
|--------------|--------------------------------------------------|
| `vsc-change` | `CustomEvent<{ checked: boolean; label: string; value: string; }>` |
