---
layout: component.njk
title: Icon
tags: component
component: vscode-icon
a11y: high
kbd: high
---

# Icon

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-icon';
```

## Basic example

<component-preview>
  <vscode-icon name="account"></vscode-icon>
  <vscode-icon name="account" size="32"></vscode-icon>
  <vscode-icon name="account" size="48"></vscode-icon>
  <vscode-icon name="account" size="64"></vscode-icon>
</component-preview>

### HTML

```html
<!--
  Download codicons from https://github.com/microsoft/vscode-codicons
-->
<link
  rel="stylesheet"
  href="path/to/codicon.css"
  id="vscode-codicon-stylesheet"
/>
```

```html
<vscode-icon name="account"></vscode-icon>
<vscode-icon name="account" size="32"></vscode-icon>
<vscode-icon name="account" size="48"></vscode-icon>
<vscode-icon name="account" size="64"></vscode-icon>
```

## Action icons

<component-preview>
  <vscode-icon name="account" action-icon></vscode-icon>
  <vscode-icon name="add" action-icon></vscode-icon>
  <vscode-icon name="git-compare" action-icon></vscode-icon>
</component-preview>

### HTML

```html
<vscode-icon name="account" action-icon></vscode-icon>
<vscode-icon name="add" action-icon></vscode-icon>
<vscode-icon name="git-compare" action-icon></vscode-icon>
```

## Animated icons

<component-preview>
  <vscode-icon name="loading" spin spin-duration="1"></vscode-icon>
  <vscode-icon name="sync" spin></vscode-icon>
  <vscode-icon name="gear" spin spin-duration="2"></vscode-icon>
</component-preview>

### HTML

```html
<!--
  Download codicons from https://github.com/microsoft/vscode-codicons
-->
<link
  rel="stylesheet"
  href="path/to/codicon.css"
  id="vscode-codicon-stylesheet"
/>
```

```html
<vscode-icon name="loading" spin spin-duration="1"></vscode-icon>
<vscode-icon name="sync" spin></vscode-icon>
<vscode-icon name="gear" spin spin-duration="2"></vscode-icon>
```

## List of icons

For the searchable list, see the [project page](https://microsoft.github.io/vscode-codicons/dist/codicon.html).

<component-preview>
  <vscode-icon name="account" title="account"></vscode-icon>
  <vscode-icon name="activate-breakpoints" title="activate-breakpoints"></vscode-icon>
  <vscode-icon name="add" title="add"></vscode-icon>
  <vscode-icon name="alert" title="alert"></vscode-icon>
  <vscode-icon name="archive" title="archive"></vscode-icon>
  <vscode-icon name="array" title="array"></vscode-icon>
  <vscode-icon name="arrow-both" title="arrow-both"></vscode-icon>
  <vscode-icon name="arrow-circle-down" title="arrow-circle-down"></vscode-icon>
  <vscode-icon name="arrow-circle-left" title="arrow-circle-left"></vscode-icon>
  <vscode-icon name="arrow-circle-right" title="arrow-circle-right"></vscode-icon>
  <vscode-icon name="arrow-circle-up" title="arrow-circle-up"></vscode-icon>
  <vscode-icon name="arrow-down" title="arrow-down"></vscode-icon>
  <vscode-icon name="arrow-left" title="arrow-left"></vscode-icon>
  <vscode-icon name="arrow-right" title="arrow-right"></vscode-icon>
  <vscode-icon name="arrow-small-down" title="arrow-small-down"></vscode-icon>
  <vscode-icon name="arrow-small-left" title="arrow-small-left"></vscode-icon>
  <vscode-icon name="arrow-small-right" title="arrow-small-right"></vscode-icon>
  <vscode-icon name="arrow-small-up" title="arrow-small-up"></vscode-icon>
  <vscode-icon name="arrow-swap" title="arrow-swap"></vscode-icon>
  <vscode-icon name="arrow-up" title="arrow-up"></vscode-icon>
  <vscode-icon name="azure" title="azure"></vscode-icon>
  <vscode-icon name="azure-devops" title="azure-devops"></vscode-icon>
  <vscode-icon name="beaker" title="beaker"></vscode-icon>
  <vscode-icon name="beaker-stop" title="beaker-stop"></vscode-icon>
  <vscode-icon name="bell" title="bell"></vscode-icon>
  <vscode-icon name="bell-dot" title="bell-dot"></vscode-icon>
  <vscode-icon name="bell-slash" title="bell-slash"></vscode-icon>
  <vscode-icon name="bell-slash-dot" title="bell-slash-dot"></vscode-icon>
  <vscode-icon name="blank" title="blank"></vscode-icon>
  <vscode-icon name="bold" title="bold"></vscode-icon>
  <vscode-icon name="book" title="book"></vscode-icon>
  <vscode-icon name="bookmark" title="bookmark"></vscode-icon>
  <vscode-icon name="bracket" title="bracket"></vscode-icon>
  <vscode-icon name="bracket-dot" title="bracket-dot"></vscode-icon>
  <vscode-icon name="bracket-error" title="bracket-error"></vscode-icon>
  <vscode-icon name="briefcase" title="briefcase"></vscode-icon>
  <vscode-icon name="broadcast" title="broadcast"></vscode-icon>
  <vscode-icon name="browser" title="browser"></vscode-icon>
  <vscode-icon name="bug" title="bug"></vscode-icon>
  <vscode-icon name="calendar" title="calendar"></vscode-icon>
  <vscode-icon name="call-incoming" title="call-incoming"></vscode-icon>
  <vscode-icon name="call-outgoing" title="call-outgoing"></vscode-icon>
  <vscode-icon name="case-sensitive" title="case-sensitive"></vscode-icon>
  <vscode-icon name="check" title="check"></vscode-icon>
  <vscode-icon name="check-all" title="check-all"></vscode-icon>
  <vscode-icon name="checklist" title="checklist"></vscode-icon>
  <vscode-icon name="chevron-down" title="chevron-down"></vscode-icon>
  <vscode-icon name="chevron-left" title="chevron-left"></vscode-icon>
  <vscode-icon name="chevron-right" title="chevron-right"></vscode-icon>
  <vscode-icon name="chevron-up" title="chevron-up"></vscode-icon>
  <vscode-icon name="chrome-close" title="chrome-close"></vscode-icon>
  <vscode-icon name="chrome-maximize" title="chrome-maximize"></vscode-icon>
  <vscode-icon name="chrome-minimize" title="chrome-minimize"></vscode-icon>
  <vscode-icon name="chrome-restore" title="chrome-restore"></vscode-icon>
  <vscode-icon name="circle" title="circle"></vscode-icon>
  <vscode-icon name="circle-filled" title="circle-filled"></vscode-icon>
  <vscode-icon name="circle-large" title="circle-large"></vscode-icon>
  <vscode-icon name="circle-large-filled" title="circle-large-filled"></vscode-icon>
  <vscode-icon name="circle-large-outline" title="circle-large-outline"></vscode-icon>
  <vscode-icon name="circle-outline" title="circle-outline"></vscode-icon>
  <vscode-icon name="circle-slash" title="circle-slash"></vscode-icon>
  <vscode-icon name="circle-small" title="circle-small"></vscode-icon>
  <vscode-icon name="circle-small-filled" title="circle-small-filled"></vscode-icon>
  <vscode-icon name="circuit-board" title="circuit-board"></vscode-icon>
  <vscode-icon name="clear-all" title="clear-all"></vscode-icon>
  <vscode-icon name="clippy" title="clippy"></vscode-icon>
  <vscode-icon name="clock" title="clock"></vscode-icon>
  <vscode-icon name="clone" title="clone"></vscode-icon>
  <vscode-icon name="close" title="close"></vscode-icon>
  <vscode-icon name="close-all" title="close-all"></vscode-icon>
  <vscode-icon name="close-dirty" title="close-dirty"></vscode-icon>
  <vscode-icon name="cloud" title="cloud"></vscode-icon>
  <vscode-icon name="cloud-download" title="cloud-download"></vscode-icon>
  <vscode-icon name="cloud-upload" title="cloud-upload"></vscode-icon>
  <vscode-icon name="code" title="code"></vscode-icon>
  <vscode-icon name="collapse-all" title="collapse-all"></vscode-icon>
  <vscode-icon name="color-mode" title="color-mode"></vscode-icon>
  <vscode-icon name="combine" title="combine"></vscode-icon>
  <vscode-icon name="comment" title="comment"></vscode-icon>
  <vscode-icon name="comment-add" title="comment-add"></vscode-icon>
  <vscode-icon name="comment-discussion" title="comment-discussion"></vscode-icon>
  <vscode-icon name="comment-draft" title="comment-draft"></vscode-icon>
  <vscode-icon name="comment-unresolved" title="comment-unresolved"></vscode-icon>
  <vscode-icon name="compare-changes" title="compare-changes"></vscode-icon>
  <vscode-icon name="compass" title="compass"></vscode-icon>
  <vscode-icon name="compass-active" title="compass-active"></vscode-icon>
  <vscode-icon name="compass-dot" title="compass-dot"></vscode-icon>
  <vscode-icon name="console" title="console"></vscode-icon>
  <vscode-icon name="copy" title="copy"></vscode-icon>
  <vscode-icon name="credit-card" title="credit-card"></vscode-icon>
  <vscode-icon name="dash" title="dash"></vscode-icon>
  <vscode-icon name="dashboard" title="dashboard"></vscode-icon>
  <vscode-icon name="database" title="database"></vscode-icon>
  <vscode-icon name="debug" title="debug"></vscode-icon>
  <vscode-icon name="debug-all" title="debug-all"></vscode-icon>
  <vscode-icon name="debug-alt" title="debug-alt"></vscode-icon>
  <vscode-icon name="debug-alt-small" title="debug-alt-small"></vscode-icon>
  <vscode-icon name="debug-breakpoint" title="debug-breakpoint"></vscode-icon>
  <vscode-icon name="debug-breakpoint-conditional" title="debug-breakpoint-conditional"></vscode-icon>
  <vscode-icon name="debug-breakpoint-conditional-disabled" title="debug-breakpoint-conditional-disabled"></vscode-icon>
  <vscode-icon name="debug-breakpoint-conditional-unverified" title="debug-breakpoint-conditional-unverified"></vscode-icon>
  <vscode-icon name="debug-breakpoint-data" title="debug-breakpoint-data"></vscode-icon>
  <vscode-icon name="debug-breakpoint-data-disabled" title="debug-breakpoint-data-disabled"></vscode-icon>
  <vscode-icon name="debug-breakpoint-data-unverified" title="debug-breakpoint-data-unverified"></vscode-icon>
  <vscode-icon name="debug-breakpoint-disabled" title="debug-breakpoint-disabled"></vscode-icon>
  <vscode-icon name="debug-breakpoint-function" title="debug-breakpoint-function"></vscode-icon>
  <vscode-icon name="debug-breakpoint-function-disabled" title="debug-breakpoint-function-disabled"></vscode-icon>
  <vscode-icon name="debug-breakpoint-function-unverified" title="debug-breakpoint-function-unverified"></vscode-icon>
  <vscode-icon name="debug-breakpoint-log" title="debug-breakpoint-log"></vscode-icon>
  <vscode-icon name="debug-breakpoint-log-disabled" title="debug-breakpoint-log-disabled"></vscode-icon>
  <vscode-icon name="debug-breakpoint-log-unverified" title="debug-breakpoint-log-unverified"></vscode-icon>
  <vscode-icon name="debug-breakpoint-unsupported" title="debug-breakpoint-unsupported"></vscode-icon>
  <vscode-icon name="debug-breakpoint-unverified" title="debug-breakpoint-unverified"></vscode-icon>
  <vscode-icon name="debug-console" title="debug-console"></vscode-icon>
  <vscode-icon name="debug-continue" title="debug-continue"></vscode-icon>
  <vscode-icon name="debug-continue-small" title="debug-continue-small"></vscode-icon>
  <vscode-icon name="debug-coverage" title="debug-coverage"></vscode-icon>
  <vscode-icon name="debug-disconnect" title="debug-disconnect"></vscode-icon>
  <vscode-icon name="debug-hint" title="debug-hint"></vscode-icon>
  <vscode-icon name="debug-line-by-line" title="debug-line-by-line"></vscode-icon>
  <vscode-icon name="debug-pause" title="debug-pause"></vscode-icon>
  <vscode-icon name="debug-rerun" title="debug-rerun"></vscode-icon>
  <vscode-icon name="debug-restart" title="debug-restart"></vscode-icon>
  <vscode-icon name="debug-restart-frame" title="debug-restart-frame"></vscode-icon>
  <vscode-icon name="debug-reverse-continue" title="debug-reverse-continue"></vscode-icon>
  <vscode-icon name="debug-stackframe" title="debug-stackframe"></vscode-icon>
  <vscode-icon name="debug-stackframe-active" title="debug-stackframe-active"></vscode-icon>
  <vscode-icon name="debug-stackframe-dot" title="debug-stackframe-dot"></vscode-icon>
  <vscode-icon name="debug-stackframe-focused" title="debug-stackframe-focused"></vscode-icon>
  <vscode-icon name="debug-start" title="debug-start"></vscode-icon>
  <vscode-icon name="debug-step-back" title="debug-step-back"></vscode-icon>
  <vscode-icon name="debug-step-into" title="debug-step-into"></vscode-icon>
  <vscode-icon name="debug-step-out" title="debug-step-out"></vscode-icon>
  <vscode-icon name="debug-step-over" title="debug-step-over"></vscode-icon>
  <vscode-icon name="debug-stop" title="debug-stop"></vscode-icon>
  <vscode-icon name="desktop-download" title="desktop-download"></vscode-icon>
  <vscode-icon name="device-camera" title="device-camera"></vscode-icon>
  <vscode-icon name="device-camera-video" title="device-camera-video"></vscode-icon>
  <vscode-icon name="device-desktop" title="device-desktop"></vscode-icon>
  <vscode-icon name="device-mobile" title="device-mobile"></vscode-icon>
  <vscode-icon name="diff" title="diff"></vscode-icon>
  <vscode-icon name="diff-added" title="diff-added"></vscode-icon>
  <vscode-icon name="diff-ignored" title="diff-ignored"></vscode-icon>
  <vscode-icon name="diff-modified" title="diff-modified"></vscode-icon>
  <vscode-icon name="diff-removed" title="diff-removed"></vscode-icon>
  <vscode-icon name="diff-renamed" title="diff-renamed"></vscode-icon>
  <vscode-icon name="discard" title="discard"></vscode-icon>
  <vscode-icon name="edit" title="edit"></vscode-icon>
  <vscode-icon name="editor-layout" title="editor-layout"></vscode-icon>
  <vscode-icon name="ellipsis" title="ellipsis"></vscode-icon>
  <vscode-icon name="empty-window" title="empty-window"></vscode-icon>
  <vscode-icon name="error" title="error"></vscode-icon>
  <vscode-icon name="error-small" title="error-small"></vscode-icon>
  <vscode-icon name="exclude" title="exclude"></vscode-icon>
  <vscode-icon name="expand-all" title="expand-all"></vscode-icon>
  <vscode-icon name="export" title="export"></vscode-icon>
  <vscode-icon name="extensions" title="extensions"></vscode-icon>
  <vscode-icon name="eye" title="eye"></vscode-icon>
  <vscode-icon name="eye-closed" title="eye-closed"></vscode-icon>
  <vscode-icon name="eye-unwatch" title="eye-unwatch"></vscode-icon>
  <vscode-icon name="eye-watch" title="eye-watch"></vscode-icon>
  <vscode-icon name="feedback" title="feedback"></vscode-icon>
  <vscode-icon name="file" title="file"></vscode-icon>
  <vscode-icon name="file-add" title="file-add"></vscode-icon>
  <vscode-icon name="file-binary" title="file-binary"></vscode-icon>
  <vscode-icon name="file-code" title="file-code"></vscode-icon>
  <vscode-icon name="file-directory" title="file-directory"></vscode-icon>
  <vscode-icon name="file-directory-create" title="file-directory-create"></vscode-icon>
  <vscode-icon name="file-media" title="file-media"></vscode-icon>
  <vscode-icon name="file-pdf" title="file-pdf"></vscode-icon>
  <vscode-icon name="file-submodule" title="file-submodule"></vscode-icon>
  <vscode-icon name="file-symlink-directory" title="file-symlink-directory"></vscode-icon>
  <vscode-icon name="file-symlink-file" title="file-symlink-file"></vscode-icon>
  <vscode-icon name="file-text" title="file-text"></vscode-icon>
  <vscode-icon name="file-zip" title="file-zip"></vscode-icon>
  <vscode-icon name="files" title="files"></vscode-icon>
  <vscode-icon name="filter" title="filter"></vscode-icon>
  <vscode-icon name="filter-filled" title="filter-filled"></vscode-icon>
  <vscode-icon name="flame" title="flame"></vscode-icon>
  <vscode-icon name="fold" title="fold"></vscode-icon>
  <vscode-icon name="fold-down" title="fold-down"></vscode-icon>
  <vscode-icon name="fold-up" title="fold-up"></vscode-icon>
  <vscode-icon name="folder" title="folder"></vscode-icon>
  <vscode-icon name="folder-active" title="folder-active"></vscode-icon>
  <vscode-icon name="folder-library" title="folder-library"></vscode-icon>
  <vscode-icon name="folder-opened" title="folder-opened"></vscode-icon>
  <vscode-icon name="gather" title="gather"></vscode-icon>
  <vscode-icon name="gear" title="gear"></vscode-icon>
  <vscode-icon name="gift" title="gift"></vscode-icon>
  <vscode-icon name="gist" title="gist"></vscode-icon>
  <vscode-icon name="gist-fork" title="gist-fork"></vscode-icon>
  <vscode-icon name="gist-new" title="gist-new"></vscode-icon>
  <vscode-icon name="gist-private" title="gist-private"></vscode-icon>
  <vscode-icon name="gist-secret" title="gist-secret"></vscode-icon>
  <vscode-icon name="git-branch" title="git-branch"></vscode-icon>
  <vscode-icon name="git-branch-create" title="git-branch-create"></vscode-icon>
  <vscode-icon name="git-branch-delete" title="git-branch-delete"></vscode-icon>
  <vscode-icon name="git-commit" title="git-commit"></vscode-icon>
  <vscode-icon name="git-compare" title="git-compare"></vscode-icon>
  <vscode-icon name="git-fork-private" title="git-fork-private"></vscode-icon>
  <vscode-icon name="git-merge" title="git-merge"></vscode-icon>
  <vscode-icon name="git-pull-request" title="git-pull-request"></vscode-icon>
  <vscode-icon name="git-pull-request-abandoned" title="git-pull-request-abandoned"></vscode-icon>
  <vscode-icon name="git-pull-request-closed" title="git-pull-request-closed"></vscode-icon>
  <vscode-icon name="git-pull-request-create" title="git-pull-request-create"></vscode-icon>
  <vscode-icon name="git-pull-request-draft" title="git-pull-request-draft"></vscode-icon>
  <vscode-icon name="git-pull-request-go-to-changes" title="git-pull-request-go-to-changes"></vscode-icon>
  <vscode-icon name="git-pull-request-new-changes" title="git-pull-request-new-changes"></vscode-icon>
  <vscode-icon name="github" title="github"></vscode-icon>
  <vscode-icon name="github-action" title="github-action"></vscode-icon>
  <vscode-icon name="github-alt" title="github-alt"></vscode-icon>
  <vscode-icon name="github-inverted" title="github-inverted"></vscode-icon>
  <vscode-icon name="globe" title="globe"></vscode-icon>
  <vscode-icon name="go-to-file" title="go-to-file"></vscode-icon>
  <vscode-icon name="grabber" title="grabber"></vscode-icon>
  <vscode-icon name="graph" title="graph"></vscode-icon>
  <vscode-icon name="graph-left" title="graph-left"></vscode-icon>
  <vscode-icon name="graph-line" title="graph-line"></vscode-icon>
  <vscode-icon name="graph-scatter" title="graph-scatter"></vscode-icon>
  <vscode-icon name="gripper" title="gripper"></vscode-icon>
  <vscode-icon name="group-by-ref-type" title="group-by-ref-type"></vscode-icon>
  <vscode-icon name="heart" title="heart"></vscode-icon>
  <vscode-icon name="heart-filled" title="heart-filled"></vscode-icon>
  <vscode-icon name="history" title="history"></vscode-icon>
  <vscode-icon name="home" title="home"></vscode-icon>
  <vscode-icon name="horizontal-rule" title="horizontal-rule"></vscode-icon>
  <vscode-icon name="hubot" title="hubot"></vscode-icon>
  <vscode-icon name="inbox" title="inbox"></vscode-icon>
  <vscode-icon name="indent" title="indent"></vscode-icon>
  <vscode-icon name="info" title="info"></vscode-icon>
  <vscode-icon name="insert" title="insert"></vscode-icon>
  <vscode-icon name="inspect" title="inspect"></vscode-icon>
  <vscode-icon name="issue-closed" title="issue-closed"></vscode-icon>
  <vscode-icon name="issue-draft" title="issue-draft"></vscode-icon>
  <vscode-icon name="issue-opened" title="issue-opened"></vscode-icon>
  <vscode-icon name="issue-reopened" title="issue-reopened"></vscode-icon>
  <vscode-icon name="issues" title="issues"></vscode-icon>
  <vscode-icon name="italic" title="italic"></vscode-icon>
  <vscode-icon name="jersey" title="jersey"></vscode-icon>
  <vscode-icon name="json" title="json"></vscode-icon>
  <vscode-icon name="kebab-horizontal" title="kebab-horizontal"></vscode-icon>
  <vscode-icon name="kebab-vertical" title="kebab-vertical"></vscode-icon>
  <vscode-icon name="key" title="key"></vscode-icon>
  <vscode-icon name="keyboard" title="keyboard"></vscode-icon>
  <vscode-icon name="law" title="law"></vscode-icon>
  <vscode-icon name="layers" title="layers"></vscode-icon>
  <vscode-icon name="layers-active" title="layers-active"></vscode-icon>
  <vscode-icon name="layers-dot" title="layers-dot"></vscode-icon>
  <vscode-icon name="layout" title="layout"></vscode-icon>
  <vscode-icon name="layout-activitybar-left" title="layout-activitybar-left"></vscode-icon>
  <vscode-icon name="layout-activitybar-right" title="layout-activitybar-right"></vscode-icon>
  <vscode-icon name="layout-centered" title="layout-centered"></vscode-icon>
  <vscode-icon name="layout-menubar" title="layout-menubar"></vscode-icon>
  <vscode-icon name="layout-panel" title="layout-panel"></vscode-icon>
  <vscode-icon name="layout-panel-center" title="layout-panel-center"></vscode-icon>
  <vscode-icon name="layout-panel-justify" title="layout-panel-justify"></vscode-icon>
  <vscode-icon name="layout-panel-left" title="layout-panel-left"></vscode-icon>
  <vscode-icon name="layout-panel-off" title="layout-panel-off"></vscode-icon>
  <vscode-icon name="layout-panel-right" title="layout-panel-right"></vscode-icon>
  <vscode-icon name="layout-sidebar-left" title="layout-sidebar-left"></vscode-icon>
  <vscode-icon name="layout-sidebar-left-off" title="layout-sidebar-left-off"></vscode-icon>
  <vscode-icon name="layout-sidebar-right" title="layout-sidebar-right"></vscode-icon>
  <vscode-icon name="layout-sidebar-right-off" title="layout-sidebar-right-off"></vscode-icon>
  <vscode-icon name="layout-statusbar" title="layout-statusbar"></vscode-icon>
  <vscode-icon name="library" title="library"></vscode-icon>
  <vscode-icon name="light-bulb" title="light-bulb"></vscode-icon>
  <vscode-icon name="lightbulb" title="lightbulb"></vscode-icon>
  <vscode-icon name="lightbulb-autofix" title="lightbulb-autofix"></vscode-icon>
  <vscode-icon name="link" title="link"></vscode-icon>
  <vscode-icon name="link-external" title="link-external"></vscode-icon>
  <vscode-icon name="list-filter" title="list-filter"></vscode-icon>
  <vscode-icon name="list-flat" title="list-flat"></vscode-icon>
  <vscode-icon name="list-ordered" title="list-ordered"></vscode-icon>
  <vscode-icon name="list-selection" title="list-selection"></vscode-icon>
  <vscode-icon name="list-tree" title="list-tree"></vscode-icon>
  <vscode-icon name="list-unordered" title="list-unordered"></vscode-icon>
  <vscode-icon name="live-share" title="live-share"></vscode-icon>
  <vscode-icon name="loading" title="loading"></vscode-icon>
  <vscode-icon name="location" title="location"></vscode-icon>
  <vscode-icon name="lock" title="lock"></vscode-icon>
  <vscode-icon name="lock-small" title="lock-small"></vscode-icon>
  <vscode-icon name="log-in" title="log-in"></vscode-icon>
  <vscode-icon name="log-out" title="log-out"></vscode-icon>
  <vscode-icon name="logo-github" title="logo-github"></vscode-icon>
  <vscode-icon name="magnet" title="magnet"></vscode-icon>
  <vscode-icon name="mail" title="mail"></vscode-icon>
  <vscode-icon name="mail-read" title="mail-read"></vscode-icon>
  <vscode-icon name="mail-reply" title="mail-reply"></vscode-icon>
  <vscode-icon name="map" title="map"></vscode-icon>
  <vscode-icon name="map-filled" title="map-filled"></vscode-icon>
  <vscode-icon name="mark-github" title="mark-github"></vscode-icon>
  <vscode-icon name="markdown" title="markdown"></vscode-icon>
  <vscode-icon name="megaphone" title="megaphone"></vscode-icon>
  <vscode-icon name="mention" title="mention"></vscode-icon>
  <vscode-icon name="menu" title="menu"></vscode-icon>
  <vscode-icon name="merge" title="merge"></vscode-icon>
  <vscode-icon name="microscope" title="microscope"></vscode-icon>
  <vscode-icon name="milestone" title="milestone"></vscode-icon>
  <vscode-icon name="mirror" title="mirror"></vscode-icon>
  <vscode-icon name="mirror-private" title="mirror-private"></vscode-icon>
  <vscode-icon name="mirror-public" title="mirror-public"></vscode-icon>
  <vscode-icon name="more" title="more"></vscode-icon>
  <vscode-icon name="mortar-board" title="mortar-board"></vscode-icon>
  <vscode-icon name="move" title="move"></vscode-icon>
  <vscode-icon name="multiple-windows" title="multiple-windows"></vscode-icon>
  <vscode-icon name="mute" title="mute"></vscode-icon>
  <vscode-icon name="new-file" title="new-file"></vscode-icon>
  <vscode-icon name="new-folder" title="new-folder"></vscode-icon>
  <vscode-icon name="newline" title="newline"></vscode-icon>
  <vscode-icon name="no-newline" title="no-newline"></vscode-icon>
  <vscode-icon name="note" title="note"></vscode-icon>
  <vscode-icon name="notebook" title="notebook"></vscode-icon>
  <vscode-icon name="notebook-template" title="notebook-template"></vscode-icon>
  <vscode-icon name="octoface" title="octoface"></vscode-icon>
  <vscode-icon name="open-preview" title="open-preview"></vscode-icon>
  <vscode-icon name="organization" title="organization"></vscode-icon>
  <vscode-icon name="organization-filled" title="organization-filled"></vscode-icon>
  <vscode-icon name="organization-outline" title="organization-outline"></vscode-icon>
  <vscode-icon name="output" title="output"></vscode-icon>
  <vscode-icon name="package" title="package"></vscode-icon>
  <vscode-icon name="paintcan" title="paintcan"></vscode-icon>
  <vscode-icon name="pass" title="pass"></vscode-icon>
  <vscode-icon name="pass-filled" title="pass-filled"></vscode-icon>
  <vscode-icon name="pencil" title="pencil"></vscode-icon>
  <vscode-icon name="person" title="person"></vscode-icon>
  <vscode-icon name="person-add" title="person-add"></vscode-icon>
  <vscode-icon name="person-filled" title="person-filled"></vscode-icon>
  <vscode-icon name="person-follow" title="person-follow"></vscode-icon>
  <vscode-icon name="person-outline" title="person-outline"></vscode-icon>
  <vscode-icon name="pie-chart" title="pie-chart"></vscode-icon>
  <vscode-icon name="pin" title="pin"></vscode-icon>
  <vscode-icon name="pinned" title="pinned"></vscode-icon>
  <vscode-icon name="pinned-dirty" title="pinned-dirty"></vscode-icon>
  <vscode-icon name="play" title="play"></vscode-icon>
  <vscode-icon name="play-circle" title="play-circle"></vscode-icon>
  <vscode-icon name="plug" title="plug"></vscode-icon>
  <vscode-icon name="plus" title="plus"></vscode-icon>
  <vscode-icon name="preserve-case" title="preserve-case"></vscode-icon>
  <vscode-icon name="preview" title="preview"></vscode-icon>
  <vscode-icon name="primitive-dot" title="primitive-dot"></vscode-icon>
  <vscode-icon name="primitive-square" title="primitive-square"></vscode-icon>
  <vscode-icon name="project" title="project"></vscode-icon>
  <vscode-icon name="pulse" title="pulse"></vscode-icon>
  <vscode-icon name="question" title="question"></vscode-icon>
  <vscode-icon name="quote" title="quote"></vscode-icon>
  <vscode-icon name="radio-tower" title="radio-tower"></vscode-icon>
  <vscode-icon name="reactions" title="reactions"></vscode-icon>
  <vscode-icon name="record" title="record"></vscode-icon>
  <vscode-icon name="record-keys" title="record-keys"></vscode-icon>
  <vscode-icon name="record-small" title="record-small"></vscode-icon>
  <vscode-icon name="redo" title="redo"></vscode-icon>
  <vscode-icon name="references" title="references"></vscode-icon>
  <vscode-icon name="refresh" title="refresh"></vscode-icon>
  <vscode-icon name="regex" title="regex"></vscode-icon>
  <vscode-icon name="remote" title="remote"></vscode-icon>
  <vscode-icon name="remote-explorer" title="remote-explorer"></vscode-icon>
  <vscode-icon name="remove" title="remove"></vscode-icon>
  <vscode-icon name="remove-close" title="remove-close"></vscode-icon>
  <vscode-icon name="repl" title="repl"></vscode-icon>
  <vscode-icon name="replace" title="replace"></vscode-icon>
  <vscode-icon name="replace-all" title="replace-all"></vscode-icon>
  <vscode-icon name="reply" title="reply"></vscode-icon>
  <vscode-icon name="repo" title="repo"></vscode-icon>
  <vscode-icon name="repo-clone" title="repo-clone"></vscode-icon>
  <vscode-icon name="repo-create" title="repo-create"></vscode-icon>
  <vscode-icon name="repo-delete" title="repo-delete"></vscode-icon>
  <vscode-icon name="repo-force-push" title="repo-force-push"></vscode-icon>
  <vscode-icon name="repo-forked" title="repo-forked"></vscode-icon>
  <vscode-icon name="repo-pull" title="repo-pull"></vscode-icon>
  <vscode-icon name="repo-push" title="repo-push"></vscode-icon>
  <vscode-icon name="repo-sync" title="repo-sync"></vscode-icon>
  <vscode-icon name="report" title="report"></vscode-icon>
  <vscode-icon name="request-changes" title="request-changes"></vscode-icon>
  <vscode-icon name="rocket" title="rocket"></vscode-icon>
  <vscode-icon name="root-folder" title="root-folder"></vscode-icon>
  <vscode-icon name="root-folder-opened" title="root-folder-opened"></vscode-icon>
  <vscode-icon name="rss" title="rss"></vscode-icon>
  <vscode-icon name="ruby" title="ruby"></vscode-icon>
  <vscode-icon name="run" title="run"></vscode-icon>
  <vscode-icon name="run-above" title="run-above"></vscode-icon>
  <vscode-icon name="run-all" title="run-all"></vscode-icon>
  <vscode-icon name="run-below" title="run-below"></vscode-icon>
  <vscode-icon name="run-errors" title="run-errors"></vscode-icon>
  <vscode-icon name="save" title="save"></vscode-icon>
  <vscode-icon name="save-all" title="save-all"></vscode-icon>
  <vscode-icon name="save-as" title="save-as"></vscode-icon>
  <vscode-icon name="screen-full" title="screen-full"></vscode-icon>
  <vscode-icon name="screen-normal" title="screen-normal"></vscode-icon>
  <vscode-icon name="search" title="search"></vscode-icon>
  <vscode-icon name="search-fuzzy" title="search-fuzzy"></vscode-icon>
  <vscode-icon name="search-save" title="search-save"></vscode-icon>
  <vscode-icon name="search-stop" title="search-stop"></vscode-icon>
  <vscode-icon name="selection" title="selection"></vscode-icon>
  <vscode-icon name="send" title="send"></vscode-icon>
  <vscode-icon name="server" title="server"></vscode-icon>
  <vscode-icon name="server-environment" title="server-environment"></vscode-icon>
  <vscode-icon name="server-process" title="server-process"></vscode-icon>
  <vscode-icon name="settings" title="settings"></vscode-icon>
  <vscode-icon name="settings-gear" title="settings-gear"></vscode-icon>
  <vscode-icon name="shield" title="shield"></vscode-icon>
  <vscode-icon name="sign-in" title="sign-in"></vscode-icon>
  <vscode-icon name="sign-out" title="sign-out"></vscode-icon>
  <vscode-icon name="smiley" title="smiley"></vscode-icon>
  <vscode-icon name="sort-precedence" title="sort-precedence"></vscode-icon>
  <vscode-icon name="source-control" title="source-control"></vscode-icon>
  <vscode-icon name="sparkle" title="sparkle"></vscode-icon>
  <vscode-icon name="split-horizontal" title="split-horizontal"></vscode-icon>
  <vscode-icon name="split-vertical" title="split-vertical"></vscode-icon>
  <vscode-icon name="squirrel" title="squirrel"></vscode-icon>
  <vscode-icon name="star" title="star"></vscode-icon>
  <vscode-icon name="star-add" title="star-add"></vscode-icon>
  <vscode-icon name="star-delete" title="star-delete"></vscode-icon>
  <vscode-icon name="star-empty" title="star-empty"></vscode-icon>
  <vscode-icon name="star-full" title="star-full"></vscode-icon>
  <vscode-icon name="star-half" title="star-half"></vscode-icon>
  <vscode-icon name="stop" title="stop"></vscode-icon>
  <vscode-icon name="stop-circle" title="stop-circle"></vscode-icon>
  <vscode-icon name="symbol-array" title="symbol-array"></vscode-icon>
  <vscode-icon name="symbol-boolean" title="symbol-boolean"></vscode-icon>
  <vscode-icon name="symbol-class" title="symbol-class"></vscode-icon>
  <vscode-icon name="symbol-color" title="symbol-color"></vscode-icon>
  <vscode-icon name="symbol-constant" title="symbol-constant"></vscode-icon>
  <vscode-icon name="symbol-constructor" title="symbol-constructor"></vscode-icon>
  <vscode-icon name="symbol-enum" title="symbol-enum"></vscode-icon>
  <vscode-icon name="symbol-enum-member" title="symbol-enum-member"></vscode-icon>
  <vscode-icon name="symbol-event" title="symbol-event"></vscode-icon>
  <vscode-icon name="symbol-field" title="symbol-field"></vscode-icon>
  <vscode-icon name="symbol-file" title="symbol-file"></vscode-icon>
  <vscode-icon name="symbol-folder" title="symbol-folder"></vscode-icon>
  <vscode-icon name="symbol-function" title="symbol-function"></vscode-icon>
  <vscode-icon name="symbol-interface" title="symbol-interface"></vscode-icon>
  <vscode-icon name="symbol-key" title="symbol-key"></vscode-icon>
  <vscode-icon name="symbol-keyword" title="symbol-keyword"></vscode-icon>
  <vscode-icon name="symbol-method" title="symbol-method"></vscode-icon>
  <vscode-icon name="symbol-misc" title="symbol-misc"></vscode-icon>
  <vscode-icon name="symbol-module" title="symbol-module"></vscode-icon>
  <vscode-icon name="symbol-namespace" title="symbol-namespace"></vscode-icon>
  <vscode-icon name="symbol-null" title="symbol-null"></vscode-icon>
  <vscode-icon name="symbol-number" title="symbol-number"></vscode-icon>
  <vscode-icon name="symbol-numeric" title="symbol-numeric"></vscode-icon>
  <vscode-icon name="symbol-object" title="symbol-object"></vscode-icon>
  <vscode-icon name="symbol-operator" title="symbol-operator"></vscode-icon>
  <vscode-icon name="symbol-package" title="symbol-package"></vscode-icon>
  <vscode-icon name="symbol-parameter" title="symbol-parameter"></vscode-icon>
  <vscode-icon name="symbol-property" title="symbol-property"></vscode-icon>
  <vscode-icon name="symbol-reference" title="symbol-reference"></vscode-icon>
  <vscode-icon name="symbol-ruler" title="symbol-ruler"></vscode-icon>
  <vscode-icon name="symbol-snippet" title="symbol-snippet"></vscode-icon>
  <vscode-icon name="symbol-string" title="symbol-string"></vscode-icon>
  <vscode-icon name="symbol-struct" title="symbol-struct"></vscode-icon>
  <vscode-icon name="symbol-structure" title="symbol-structure"></vscode-icon>
  <vscode-icon name="symbol-text" title="symbol-text"></vscode-icon>
  <vscode-icon name="symbol-type-parameter" title="symbol-type-parameter"></vscode-icon>
  <vscode-icon name="symbol-unit" title="symbol-unit"></vscode-icon>
  <vscode-icon name="symbol-value" title="symbol-value"></vscode-icon>
  <vscode-icon name="symbol-variable" title="symbol-variable"></vscode-icon>
  <vscode-icon name="sync" title="sync"></vscode-icon>
  <vscode-icon name="sync-ignored" title="sync-ignored"></vscode-icon>
  <vscode-icon name="table" title="table"></vscode-icon>
  <vscode-icon name="tag" title="tag"></vscode-icon>
  <vscode-icon name="tag-add" title="tag-add"></vscode-icon>
  <vscode-icon name="tag-remove" title="tag-remove"></vscode-icon>
  <vscode-icon name="target" title="target"></vscode-icon>
  <vscode-icon name="tasklist" title="tasklist"></vscode-icon>
  <vscode-icon name="telescope" title="telescope"></vscode-icon>
  <vscode-icon name="terminal" title="terminal"></vscode-icon>
  <vscode-icon name="terminal-bash" title="terminal-bash"></vscode-icon>
  <vscode-icon name="terminal-cmd" title="terminal-cmd"></vscode-icon>
  <vscode-icon name="terminal-debian" title="terminal-debian"></vscode-icon>
  <vscode-icon name="terminal-decoration-error" title="terminal-decoration-error"></vscode-icon>
  <vscode-icon name="terminal-decoration-incomplete" title="terminal-decoration-incomplete"></vscode-icon>
  <vscode-icon name="terminal-decoration-mark" title="terminal-decoration-mark"></vscode-icon>
  <vscode-icon name="terminal-decoration-success" title="terminal-decoration-success"></vscode-icon>
  <vscode-icon name="terminal-linux" title="terminal-linux"></vscode-icon>
  <vscode-icon name="terminal-powershell" title="terminal-powershell"></vscode-icon>
  <vscode-icon name="terminal-tmux" title="terminal-tmux"></vscode-icon>
  <vscode-icon name="terminal-ubuntu" title="terminal-ubuntu"></vscode-icon>
  <vscode-icon name="text-size" title="text-size"></vscode-icon>
  <vscode-icon name="three-bars" title="three-bars"></vscode-icon>
  <vscode-icon name="thumbsdown" title="thumbsdown"></vscode-icon>
  <vscode-icon name="thumbsup" title="thumbsup"></vscode-icon>
  <vscode-icon name="tools" title="tools"></vscode-icon>
  <vscode-icon name="trash" title="trash"></vscode-icon>
  <vscode-icon name="trashcan" title="trashcan"></vscode-icon>
  <vscode-icon name="triangle-down" title="triangle-down"></vscode-icon>
  <vscode-icon name="triangle-left" title="triangle-left"></vscode-icon>
  <vscode-icon name="triangle-right" title="triangle-right"></vscode-icon>
  <vscode-icon name="triangle-up" title="triangle-up"></vscode-icon>
  <vscode-icon name="twitter" title="twitter"></vscode-icon>
  <vscode-icon name="type-hierarchy" title="type-hierarchy"></vscode-icon>
  <vscode-icon name="type-hierarchy-sub" title="type-hierarchy-sub"></vscode-icon>
  <vscode-icon name="type-hierarchy-super" title="type-hierarchy-super"></vscode-icon>
  <vscode-icon name="unfold" title="unfold"></vscode-icon>
  <vscode-icon name="ungroup-by-ref-type" title="ungroup-by-ref-type"></vscode-icon>
  <vscode-icon name="unlock" title="unlock"></vscode-icon>
  <vscode-icon name="unmute" title="unmute"></vscode-icon>
  <vscode-icon name="unverified" title="unverified"></vscode-icon>
  <vscode-icon name="variable" title="variable"></vscode-icon>
  <vscode-icon name="variable-group" title="variable-group"></vscode-icon>
  <vscode-icon name="verified" title="verified"></vscode-icon>
  <vscode-icon name="verified-filled" title="verified-filled"></vscode-icon>
  <vscode-icon name="versions" title="versions"></vscode-icon>
  <vscode-icon name="vm" title="vm"></vscode-icon>
  <vscode-icon name="vm-active" title="vm-active"></vscode-icon>
  <vscode-icon name="vm-connect" title="vm-connect"></vscode-icon>
  <vscode-icon name="vm-outline" title="vm-outline"></vscode-icon>
  <vscode-icon name="vm-running" title="vm-running"></vscode-icon>
  <vscode-icon name="wand" title="wand"></vscode-icon>
  <vscode-icon name="warning" title="warning"></vscode-icon>
  <vscode-icon name="watch" title="watch"></vscode-icon>
  <vscode-icon name="whitespace" title="whitespace"></vscode-icon>
  <vscode-icon name="whole-word" title="whole-word"></vscode-icon>
  <vscode-icon name="window" title="window"></vscode-icon>
  <vscode-icon name="word-wrap" title="word-wrap"></vscode-icon>
  <vscode-icon name="workspace-trusted" title="workspace-trusted"></vscode-icon>
  <vscode-icon name="workspace-unknown" title="workspace-unknown"></vscode-icon>
  <vscode-icon name="workspace-untrusted" title="workspace-untrusted"></vscode-icon>
  <vscode-icon name="wrench" title="wrench"></vscode-icon>
  <vscode-icon name="wrench-subaction" title="wrench-subaction"></vscode-icon>
  <vscode-icon name="x" title="x"></vscode-icon>
  <vscode-icon name="zap" title="zap"></vscode-icon>
  <vscode-icon name="zoom-in" title="zoom-in"></vscode-icon>
  <vscode-icon name="zoom-out" title="zoom-out"></vscode-icon>
</component-preview>