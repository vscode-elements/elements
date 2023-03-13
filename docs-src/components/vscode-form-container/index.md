---
layout: component.njk
title: FormContainer
tags: component
component: vscode-form-container
toc:
  - label: Basic form
    path: basic-form
  - label: Responsive form
    path: responsive-form
  - label: Collecting the form data
    path: collecting-the-form-data
---

# FormContainer

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-form-container';
```

## Basic form

<component-preview>
  <vscode-form-container>
    <vscode-form-group>
      <vscode-label for="basic-textfield-01">
        Lorem <span class="normal">ipsum</span>:
      </vscode-label>
      <vscode-textfield id="basic-textfield-01" placeholder="Placeholder example"></vscode-textfield>
      <vscode-form-helper>
        <p>Lorem ipsum <code>let dolor = sit amet</code>, consectetur adipiscing elit. <span class="error">Suspendisse</span> faucibus imperdiet sapien, a gravida <a href="#">dolor</a>.</p>
      </vscode-form-helper>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-button>Save</vscode-button>
      <vscode-button secondary>Cancel</vscode-button>
    </vscode-form-group>
  </vscode-form-container>
</component-preview>

### HTML

```html
<vscode-form-container>
  <vscode-form-group>
    <vscode-label for="basic-textfield-01">
      Lorem <span class="normal">ipsum</span>:
    </vscode-label>
    <vscode-textfield id="basic-textfield-01" placeholder="Placeholder example"></vscode-textfield>
    <vscode-form-helper>
      <p>Lorem ipsum <code>let dolor = sit amet</code>, consectetur adipiscing elit. <span class="error">Suspendisse</span> faucibus imperdiet sapien, a gravida <a href="#">dolor</a>.</p>
    </vscode-form-helper>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-button>Save</vscode-button>
    <vscode-button secondary>Cancel</vscode-button>
  </vscode-form-group>
</vscode-form-container>
```

## Responsive form

Try to resize the browser window. The children elements will be resized to the container.

<component-preview>
  <vscode-form-container responsive breakpoint="500">
    <vscode-form-group>
      <vscode-label for="responsive-textfield-01">
        Lorem <span class="normal">ipsum</span>:
      </vscode-label>
      <vscode-textfield id="responsive-textfield-01" placeholder="Placeholder example"></vscode-textfield>
      <vscode-form-helper>
        <p>Lorem ipsum <code>let dolor = sit amet</code>, consectetur adipiscing elit. <span class="error">Suspendisse</span> faucibus imperdiet sapien, a gravida <a href="#">dolor</a>.</p>
      </vscode-form-helper>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-button>Save</vscode-button>
      <vscode-button secondary>Cancel</vscode-button>
    </vscode-form-group>
  </vscode-form-container>
</component-preview>

### HTML

```html
<vscode-form-container responsive breakpoint="500">
  <vscode-form-group>
    <vscode-label for="responsive-textfield-01">
      Lorem <span class="normal">ipsum</span>:
    </vscode-label>
    <vscode-textfield id="responsive-textfield-01" placeholder="Placeholder example"></vscode-textfield>
    <vscode-form-helper>
      <p>Lorem ipsum <code>let dolor = sit amet</code>, consectetur adipiscing elit. <span class="error">Suspendisse</span> faucibus imperdiet sapien, a gravida <a href="#">dolor</a>.</p>
    </vscode-form-helper>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-button>Save</vscode-button>
    <vscode-button secondary>Cancel</vscode-button>
  </vscode-form-group>
</vscode-form-container>
```

## Collecting the form data

Click on the "save" button and check the developer console.

<component-preview>
  <vscode-form-container id="form-data-example">
    <vscode-form-group>
      <vscode-label for="data-example-textfield">
        Lorem <span class="normal">ipsum</span>:
      </vscode-label>
      <vscode-textfield id="data-example-textfield" name="data-example-textfield" placeholder="Placeholder example"></vscode-textfield>
      <vscode-form-helper>
        <p>Lorem ipsum <code>let dolor = sit amet</code>, consectetur adipiscing elit. <span class="error">Suspendisse</span> faucibus imperdiet sapien, a gravida <a href="#">dolor</a>.</p>
      </vscode-form-helper>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="data-example-single-select">
        <span class="lightened">Duis eget</span> erat accumsan:
      </vscode-label>
      <vscode-single-select id="data-example-single-select" name="data-example-single-select">
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-single-select>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="data-example-multi-select">
        <span class="lightened">Duis eget</span> erat accumsan:
      </vscode-label>
      <vscode-multi-select id="data-example-multi-select" name="data-example-multi-select">
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-multi-select>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="data-example-checkbox-1">
        Phasellus quam arcu:
      </vscode-label>
      <vscode-checkbox-group>
        <vscode-checkbox id="data-example-checkbox-1" name="data-example-checkbox" value="lorem" label="Lorem ipsum"></vscode-checkbox>
        <vscode-checkbox id="data-example-checkbox-2" name="data-example-checkbox" value="ipsum" label="Donec mi risus"></vscode-checkbox>
        <vscode-checkbox id="data-example-checkbox-3" name="data-example-checkbox" value="dolor">Duis <a href="#">ullamcorper</a></vscode-checkbox>
      </vscode-checkbox-group>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="data-example-radio-1">
        Phasellus quam arcu:
      </vscode-label>
      <vscode-radio-group>
        <vscode-radio id="data-example-radio-1" name="data-example-radio" value="lorem">Lorem ipsum</vscode-radio>
        <vscode-radio id="data-example-radio-2" name="data-example-radio" value="ipsum">Donec mi risus</vscode-radio>
        <vscode-radio id="data-example-radio-3" name="data-example-radio" value="dolor">Duis <a href="#">ullamcorper</a></vscode-radio>
      </vscode-radio-group>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-button id="save-button">Save</vscode-button>
      <vscode-button secondary>Cancel</vscode-button>
    </vscode-form-group>
  </vscode-form-container>
</component-preview>

<script type="module">
  const form = document.querySelector('#form-data-example');
  const button = document.querySelector('#save-button');

  button.addEventListener('click', () => {
    console.log(form.data);
  });
</script>

### HTML

```html
<vscode-form-container id="form-data-example">
  <vscode-form-group>
    <vscode-label for="data-example-textfield">
      Lorem <span class="normal">ipsum</span>:
    </vscode-label>
    <vscode-textfield id="data-example-textfield" name="data-example-textfield" placeholder="Placeholder example"></vscode-textfield>
    <vscode-form-helper>
      <p>Lorem ipsum <code>let dolor = sit amet</code>, consectetur adipiscing elit. <span class="error">Suspendisse</span> faucibus imperdiet sapien, a gravida <a href="#">dolor</a>.</p>
    </vscode-form-helper>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-label for="data-example-single-select">
      <span class="lightened">Duis eget</span> erat accumsan:
    </vscode-label>
    <vscode-single-select id="data-example-single-select" name="data-example-single-select">
      <vscode-option>Lorem</vscode-option>
      <vscode-option>Ipsum</vscode-option>
      <vscode-option>Dolor</vscode-option>
    </vscode-single-select>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-label for="data-example-multi-select">
      <span class="lightened">Duis eget</span> erat accumsan:
    </vscode-label>
    <vscode-multi-select id="data-example-multi-select" name="data-example-multi-select">
      <vscode-option>Lorem</vscode-option>
      <vscode-option>Ipsum</vscode-option>
      <vscode-option>Dolor</vscode-option>
    </vscode-multi-select>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-label for="data-example-checkbox-1">
      Phasellus quam arcu:
    </vscode-label>
    <vscode-checkbox-group>
      <vscode-checkbox id="data-example-checkbox-1" name="data-example-checkbox" value="lorem" label="Lorem ipsum"></vscode-checkbox>
      <vscode-checkbox id="data-example-checkbox-2" name="data-example-checkbox" value="ipsum" label="Donec mi risus"></vscode-checkbox>
      <vscode-checkbox id="data-example-checkbox-3" name="data-example-checkbox" value="dolor">Duis <a href="#">ullamcorper</a></vscode-checkbox>
    </vscode-checkbox-group>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-label for="data-example-radio-1">
      Phasellus quam arcu:
    </vscode-label>
    <vscode-radio-group>
      <vscode-radio id="data-example-radio-1" name="data-example-radio" value="lorem">Lorem ipsum</vscode-radio>
      <vscode-radio id="data-example-radio-2" name="data-example-radio" value="ipsum">Donec mi risus</vscode-radio>
      <vscode-radio id="data-example-radio-3" name="data-example-radio" value="dolor">Duis <a href="#">ullamcorper</a></vscode-radio>
    </vscode-radio-group>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-button id="save-button">Save</vscode-button>
    <vscode-button secondary>Cancel</vscode-button>
  </vscode-form-group>
</vscode-form-container>
```

### JavaScript

```javascript
const form = document.querySelector('#form-data-example');
const button = document.querySelector('#save-button');

button.addEventListener('click', () => {
  console.log(form.data);
});
```
