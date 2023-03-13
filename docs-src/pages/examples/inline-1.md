---
layout: page.njk
title: Inline form example 1
tags: example
weight: 3
---

# Inline form example 1

<style>
  vscode-form-container {
    max-width: none;
  }

  .log-settings-row {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
  }

  .log-settings-row vscode-label,
  .log-settings-row vscode-single-select,
  .log-settings-row vscode-checkbox,
  .log-settings-row vscode-textfield,
  .log-settings-row vscode-button {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .select,
  .checkbox,
  .input {
    margin-left: 4px;
  }

  .label {
    white-space: nowrap;
    width: auto;
  }

  .select-container {
    margin-right: 10px;
  }

  .checkbox {
    margin-right: 10px;
  }

  .input-since,
  .input-tail {
    width: 50px;
  }

  .input-tail {
    margin-right: 10px;
  }

  .select-since {
    margin-right: 10px;
    width: 100px;
  }

  .buttons {
    display: flex;
  }

  .button-run {
    margin-left: auto;
    margin-right: 4px;
  }

  .select-filter {
    width: 120px;
  }

  .input-keywords {
    margin-right: 10px;
  }

  .button-scroll {
    margin-left: auto;
  }
</style>

<component-preview>
  <vscode-form-container id="log-settings-form">
    <div class="log-settings-row">
      <vscode-label for="select-container" class="label">Container:</vscode-label>
      <vscode-single-select id="select-container" name="select-container" class="select select-container">
        <vscode-option>nginx-container</vscode-option>
        <vscode-option>redis-container</vscode-option>
      </vscode-single-select>
      <vscode-label for="checkbox-follow-logs" class="label">Follow Logs:</vscode-label>
      <vscode-checkbox label="" id="checkbox-follow-logs" name="flags" value="follow-logs" class="checkbox"></vscode-checkbox>
      <vscode-label for="checkbox-show-timestamp" class="label">Show timestamp:</vscode-label>
      <vscode-checkbox label="" id="checkbox-show-timestamp" name="flags" value="show-timestamps" value="true" class="checkbox"></vscode-checkbox>
      <vscode-label for="input-since" class="label">Since:</vscode-label>
      <vscode-textfield value="0" id="input-since" name="since" class="input input-since"></vscode-textfield>
      <vscode-single-select name="time-unit" class="select select-since">
        <vscode-option>minutes</vscode-option>
        <vscode-option>hours</vscode-option>
      </vscode-single-select>
      <vscode-label for="input-tail" class="label">Tail:</vscode-label>
      <vscode-textfield value="-1" id="input-tail" name="tail" class="input input-tail"></vscode-textfield>
      <vscode-label for="checkbox-to-terminal" class="label">To terminal:</vscode-label>
      <vscode-checkbox id="checkbox-to-terminal" name="flags" value="to-terminal" class="checkbox"></vscode-checkbox>
      <div class="buttons">
        <vscode-button class="button-run">Run</vscode-button>
        <vscode-button>Reset</vscode-button>
      </div>
    </div>
    <div class="log-settings-row">
      <vscode-label for="select-filter" class="label">Filter:</vscode-label>
      <vscode-single-select id="select-filter" name="filter" class="select select-filter">
        <vscode-option>all</vscode-option>
      </vscode-single-select>
      <vscode-textfield placeholder="Enter your keywords" name="keyword" class="input input-keywords"></vscode-textfield>
      <vscode-label for="checkbox-wrap-lines" class="label">Wrap lines:</vscode-label>
      <vscode-checkbox id="checkbox-wrap-lines" name="flags" value="wrap-lines" class="checkbox"></vscode-checkbox>
      <vscode-button class="button-scroll">Scroll To Bottom</vscode-button>
    </div>
  </vscode-form-container>
</component-preview>
<button class="form-data-button">Show form data</button>
<pre class="form-data-log"></pre>

<script type="module">
  const log = document.querySelector('.form-data-log');
  const button = document.querySelector('.form-data-button');

  button.addEventListener('click', () => {
    log.innerHTML = JSON.stringify(document.querySelector('#log-settings-form').data, null, 2);
  });
</script>

## CSS
```css
vscode-form-container {
  max-width: none;
}

.log-settings-row {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}

.log-settings-row vscode-label,
.log-settings-row vscode-single-select,
.log-settings-row vscode-checkbox,
.log-settings-row vscode-textfield,
.log-settings-row vscode-button {
  margin-top: 2px;
  margin-bottom: 2px;
}

.select,
.checkbox,
.input {
  margin-left: 4px;
}

.label {
  white-space: nowrap;
  width: auto;
}

.select-container {
  margin-right: 10px;
}

.checkbox {
  margin-right: 10px;
}

.input-since,
.input-tail {
  width: 50px;
}

.input-tail {
  margin-right: 10px;
}

.select-since {
  margin-right: 10px;
  width: 100px;
}

.buttons {
  display: flex;
}

.button-run {
  margin-left: auto;
  margin-right: 4px;
}

.select-filter {
  width: 120px;
}

.input-keywords {
  margin-right: 10px;
}

.button-scroll {
  margin-left: auto;
}
```
## HTML

```html
<vscode-form-container id="log-settings-form">

  <div class="log-settings-row">

    <vscode-label for="select-container" class="label">Container:</vscode-label>
    <vscode-single-select id="select-container" name="select-container" class="select select-container">
      <vscode-option>nginx-container</vscode-option>
      <vscode-option>redis-container</vscode-option>
    </vscode-single-select>

    <vscode-label for="checkbox-follow-logs" class="label">Follow Logs:</vscode-label>
    <vscode-checkbox label="" id="checkbox-follow-logs" name="flags" value="follow-logs" class="checkbox"></vscode-checkbox>

    <vscode-label for="checkbox-show-timestamp" class="label">Show timestamp:</vscode-label>
    <vscode-checkbox label="" id="checkbox-show-timestamp" name="flags" value="show-timestamps" value="true" class="checkbox"></vscode-checkbox>

    <vscode-label for="input-since" class="label">Since:</vscode-label>
    <vscode-textfield value="0" id="input-since" name="since" class="input input-since"></vscode-textfield>
    <vscode-single-select name="time-unit" class="select select-since">
      <vscode-option>minutes</vscode-option>
      <vscode-option>hours</vscode-option>
    </vscode-single-select>

    <vscode-label for="input-tail" class="label">Tail:</vscode-label>
    <vscode-textfield value="-1" id="input-tail" name="tail" class="input input-tail"></vscode-textfield>

    <vscode-label for="checkbox-to-terminal" class="label">To terminal:</vscode-label>
    <vscode-checkbox id="checkbox-to-terminal" name="flags" value="to-terminal" class="checkbox"></vscode-checkbox>

    <div class="buttons">
      <vscode-button class="button-run">Run</vscode-button>
      <vscode-button>Reset</vscode-button>
    </div>
  </div>

  <div class="log-settings-row">
    <vscode-label for="select-filter" class="label">Filter:</vscode-label>
    <vscode-single-select id="select-filter" name="filter" class="select select-filter">
      <vscode-option>all</vscode-option>
    </vscode-single-select>
    <vscode-textfield placeholder="Enter your keywords" name="keyword" class="input input-keywords"></vscode-textfield>

    <vscode-label for="checkbox-wrap-lines" class="label">Wrap lines:</vscode-label>
    <vscode-checkbox id="checkbox-wrap-lines" name="flags" value="wrap-lines" class="checkbox"></vscode-checkbox>
    
    <vscode-button class="button-scroll">Scroll To Bottom</vscode-button>
  </div>

</vscode-form-container>

<button class="form-data-button">Show form data</button>
<pre class="form-data-log"></pre>
```

## JavaScript

```javascript
const log = document.querySelector('.form-data-log');
const button = document.querySelector('.form-data-button');

button.addEventListener('click', () => {
  log.innerHTML = JSON.stringify(document.querySelector('#log-settings-form').data, null, 2);
});
```
