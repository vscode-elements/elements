---
layout: page.njk
title: Inline form example 2
tags: example
weight: 4
---

# Inline form example 2

<style>
  .new-request-form {
    display: flex;
  }

  .select-method {
    margin-right: -1px;
    width: 80px;
  }

  .button-send {
    margin-left: -1px;
  }

  .select-method[focused],
  .textfield-url[focused],
  .button-send[focused] {
    position: relative;
    z-index: 1;
  }
</style>

<component-preview>
  <vscode-form-container id="example-form">
    <div class="new-request-form">
      <vscode-single-select class="select-method" name="method">
        <vscode-option selected>GET</vscode-option>
        <vscode-option>POST</vscode-option>
        <vscode-option>PUT</vscode-option>
        <vscode-option>DELETE</vscode-option>
        <vscode-option>PATCH</vscode-option>
        <vscode-option>HEAD</vscode-option>
        <vscode-option>OPTION</vscode-option>
      </vscode-single-select>
      <vscode-textfield class="textfield-url" name="url"></vscode-textfield>
      <vscode-button class="button-send">Send</vscode-button>
    </div>
  </vscode-form-container>
</component-preview>

<button class="form-data-button">Show form data</button>
<pre class="form-data-log"></pre>

<script type="module">
  const log = document.querySelector('.form-data-log');
  const button = document.querySelector('.form-data-button');

  button.addEventListener('click', () => {
    log.innerHTML = JSON.stringify(document.querySelector('#example-form').data, null, 2);
  });
</script>

## HTML

```html
<vscode-form-container id="example-form">
  <div class="new-request-form">
    <vscode-single-select class="select-method" name="method">
      <vscode-option selected>GET</vscode-option>
      <vscode-option>POST</vscode-option>
      <vscode-option>PUT</vscode-option>
      <vscode-option>DELETE</vscode-option>
      <vscode-option>PATCH</vscode-option>
      <vscode-option>HEAD</vscode-option>
      <vscode-option>OPTION</vscode-option>
    </vscode-single-select>
    <vscode-textfield class="textfield-url" name="url"></vscode-textfield>
    <vscode-button class="button-send">Send</vscode-button>
  </div>
</vscode-form-container>
```

## CSS

```css
.new-request-form {
  display: flex;
}

.select-method {
  margin-right: -1px;
  width: 80px;
}

.button-send {
  margin-left: -1px;
}

.select-method[focused],
.textfield-url[focused],
.button-send[focused] {
  position: relative;
  z-index: 1;
}
```

## JavaScript

```javascript
const log = document.querySelector('.form-data-log');
const button = document.querySelector('.form-data-button');

button.addEventListener('click', () => {
  log.innerHTML = JSON.stringify(document.querySelector('#example-form').data, null, 2);
});
```