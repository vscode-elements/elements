---
layout: component.njk
title: Checkbox
tags: api
component: vscode-checkbox
---

<!-- This file is auto-generated. Do not edit! -->

# VscodeCheckbox

## Attributes

| Attribute | Description                                      |
|-----------|--------------------------------------------------|
| `name`    | Name which is used as a variable name in the data of the form-container. |

## Properties

| Property   | Attribute  | Type      | Default |
|------------|------------|-----------|---------|
| `checked`  | `checked`  | `boolean` | false   |
| `disabled` | `disabled` | `boolean` | false   |
| `focused`  | `focused`  | `boolean` | false   |
| `label`    | `label`    | `string`  | ""      |
| `tabindex` | `tabindex` | `number`  | 0       |
| `value`    | `value`    | `string`  | ""      |

## Events

| Event        | Type                                             |
|--------------|--------------------------------------------------|
| `vsc-change` | `CustomEvent<{ checked: boolean; label: string; value: string; }>` |
