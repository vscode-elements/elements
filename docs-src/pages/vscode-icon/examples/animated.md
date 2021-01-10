---
layout: example.11ty.cjs
title: <vscode-icon> ⌲ Examples ⌲ Animated
tags: example
name: Animated
description: Animated icons
---

<vscode-icon name="loading" spin spin-duration="1"></vscode-icon>
<vscode-icon name="sync" spin></vscode-icon>
<vscode-icon name="gear" spin spin-duration="2"></vscode-icon>

<h3>HTML</h3>

```html
<!--
  Download codicons from https://github.com/microsoft/vscode-codicons
-->
<link rel="stylesheet" href="path/to/codicon.css" id="vscode-codicon-stylesheet">

```

```html
<vscode-icon name="loading" spin spin-duration="1"></vscode-icon>
<vscode-icon name="sync" spin></vscode-icon>
<vscode-icon name="gear" spin spin-duration="2"></vscode-icon>
```