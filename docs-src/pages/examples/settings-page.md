---
layout: page.njk
title: Settings page
tags: example
weight: 2
---

# Settings page

You can create your own settings pages that look like a real VSCode settings page.

<component-preview>
  <vscode-form-container id="settings-form">
    <vscode-form-group variant="settings-group">
      <vscode-label><span class="lightened">Editor:</span> Font Size</vscode-label>
      <vscode-form-helper>
        <p>Controls the font size in pixels.</p>
      </vscode-form-helper>
      <vscode-textfield size-variant="narrow" name="font-size" value="14"></vscode-textfield>
    </vscode-form-group>
    <vscode-form-group variant="settings-group">
      <vscode-label><span class="lightened">Editor:</span> Font Family</vscode-label>
      <vscode-form-helper>
        <p>Controls the font family.</p>
      </vscode-form-helper>
      <vscode-textfield size-variant="wide" name="font-family" value="'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace"></vscode-textfield>
    </vscode-form-group>
    <vscode-form-group variant="settings-group">
      <vscode-label><span class="lightened">Editor:</span> Insert Spaces</vscode-label>
      <vscode-checkbox name="flags" value="insert-spaces"><p>Insert spaces when pressing <code>Tab</code>. This setting is overridden based on the file contents when <a href="#" title="#editor.detectIndentation">Editor: Detect Indentation</a> is on.</p></vscode-checkbox>
    </vscode-form-group>
    <vscode-form-group variant="settings-group">
      <vscode-label><span class="lightened">Editor:</span> Word Wrap</vscode-label>
      <vscode-form-helper><p>Controls how lines should wrap.</p></vscode-form-helper>
      <vscode-single-select name="word-wrap">
        <vscode-option>on</vscode-option>
        <vscode-option>off</vscode-option>
      </vscode-single-select>
    </vscode-form-group>
    <vscode-form-group variant="settings-group">
      <vscode-label>Title</vscode-label>
      <vscode-form-helper>
        <p>Controls the window title based on the active editor. Variables are substituted based on the context:</p>
        <ul>
          <li><code>${activeEditorShort}</code>: the file name (e.g. myFile.txt).</li>
          <li><code>${activeEditorMedium}</code>: the path of the file relative to the workspace folder (e.g. myFolder/myFileFolder/myFile.txt).</li>
          <li><code>${activeEditorLong}</code>: the full path of the file (e.g. /Users/Development/myFolder/myFileFolder/myFile.txt).</li>
          <li><code>${activeFolderShort}</code>: the name of the folder the file is contained in (e.g. myFileFolder).</li>
          <li><code>${activeFolderMedium}</code>: the path of the folder the file is contained in, relative to the workspace folder (e.g. myFolder/myFileFolder).</li>
          <li><code>${activeFolderLong}</code>: the full path of the folder the file is contained in (e.g. /Users/Development/myFolder/myFileFolder).</li>
          <li><code>${folderName}</code>: name of the workspace folder the file is contained in (e.g. myFolder).</li>
          <li><code>${folderPath}</code>: file path of the workspace folder the file is contained in (e.g. /Users/Development/myFolder).</li>
          <li><code>${rootName}</code>: name of the opened workspace or folder (e.g. myFolder or myWorkspace).</li>
          <li><code>${rootPath}</code>: file path of the opened workspace or folder (e.g. /Users/Development/myWorkspace).</li>
          <li><code>${appName}</code>: e.g. VS Code.</li>
          <li><code>${remoteName}</code>: e.g. SSH</li>
          <li><code>${dirty}</code>: a dirty indicator if the active editor is dirty.</li>
          <li><code>${separator}</code>: a conditional separator (" - ") that only shows when surrounded by variables with values or static text.</li>
        </ul>
      </vscode-form-helper>
      <vscode-textfield name="window-title" size-variant="wide"></vscode-textfield>
    </vscode-form-group>
  </vscode-form-container>
</component-preview>

<button class="form-data-button">Show form data</button>
<pre class="form-data-log"></pre>

<script type="module">
  const log = document.querySelector('.form-data-log');
  const button = document.querySelector('.form-data-button');

  button.addEventListener('click', () => {
    log.innerHTML = JSON.stringify(document.querySelector('#settings-form').data, null, 2);
  });
</script>

```html
<vscode-form-container id="settings-form">

  <vscode-form-group variant="settings-group">
    <vscode-label><span class="lightened">Editor:</span> Font Size</vscode-label>
    <vscode-form-helper>
      <p>Controls the font size in pixels.</p>
    </vscode-form-helper>
    <vscode-textfield size-variant="narrow" name="font-size" value="14"></vscode-textfield>
  </vscode-form-group>

  <vscode-form-group variant="settings-group">
    <vscode-label><span class="lightened">Editor:</span> Font Family</vscode-label>
    <vscode-form-helper>
      <p>Controls the font family.</p>
    </vscode-form-helper>
    <vscode-textfield size-variant="wide" name="font-family" value="'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace"></vscode-textfield>
  </vscode-form-group>

  <vscode-form-group variant="settings-group">
    <vscode-label><span class="lightened">Editor:</span> Insert Spaces</vscode-label>
    <vscode-checkbox name="flags" value="insert-spaces"><p>Insert spaces when pressing <code>Tab</code>. This setting is overridden based on the file contents when <a href="#" title="#editor.detectIndentation">Editor: Detect Indentation</a> is on.</p></vscode-checkbox>
  </vscode-form-group>

  <vscode-form-group variant="settings-group">
    <vscode-label><span class="lightened">Editor:</span> Word Wrap</vscode-label>
    <vscode-form-helper><p>Controls how lines should wrap.</p></vscode-form-helper>
    <vscode-single-select name="word-wrap">
      <vscode-option>on</vscode-option>
      <vscode-option>off</vscode-option>
    </vscode-single-select>
  </vscode-form-group>

  <vscode-form-group variant="settings-group">
    <vscode-label>Title</vscode-label>
    <vscode-form-helper>
      <p>Controls the window title based on the active editor. Variables are substituted based on the context:</p>
      <ul>
        <li><code>${activeEditorShort}</code>: the file name (e.g. myFile.txt).</li>
        <li><code>${activeEditorMedium}</code>: the path of the file relative to the workspace folder (e.g. myFolder/myFileFolder/myFile.txt).</li>
        <li><code>${activeEditorLong}</code>: the full path of the file (e.g. /Users/Development/myFolder/myFileFolder/myFile.txt).</li>
        <li><code>${activeFolderShort}</code>: the name of the folder the file is contained in (e.g. myFileFolder).</li>
        <li><code>${activeFolderMedium}</code>: the path of the folder the file is contained in, relative to the workspace folder (e.g. myFolder/myFileFolder).</li>
        <li><code>${activeFolderLong}</code>: the full path of the folder the file is contained in (e.g. /Users/Development/myFolder/myFileFolder).</li>
        <li><code>${folderName}</code>: name of the workspace folder the file is contained in (e.g. myFolder).</li>
        <li><code>${folderPath}</code>: file path of the workspace folder the file is contained in (e.g. /Users/Development/myFolder).</li>
        <li><code>${rootName}</code>: name of the opened workspace or folder (e.g. myFolder or myWorkspace).</li>
        <li><code>${rootPath}</code>: file path of the opened workspace or folder (e.g. /Users/Development/myWorkspace).</li>
        <li><code>${appName}</code>: e.g. VS Code.</li>
        <li><code>${remoteName}</code>: e.g. SSH</li>
        <li><code>${dirty}</code>: a dirty indicator if the active editor is dirty.</li>
        <li><code>${separator}</code>: a conditional separator (" - ") that only shows when surrounded by variables with values or static text.</li>
      </ul>
    </vscode-form-helper>
    <vscode-textfield name="window-title" size-variant="wide"></vscode-textfield>
  </vscode-form-group>
  
</vscode-form-container>

<button class="form-data-button">Show form data</button>
<pre class="form-data-log"></pre>
```

## JavaScript

```javascript
const log = document.querySelector('.form-data-log');
const button = document.querySelector('.form-data-button');

button.addEventListener('click', () => {
  log.innerHTML = JSON.stringify(document.querySelector('#settings-form').data, null, 2);
});
```