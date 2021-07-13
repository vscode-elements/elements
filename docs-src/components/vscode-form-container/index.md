---
layout: component.njk
title: FormContainer
tags: component
component: vscode-form-container
toc:
  - label: Responsive form
    path: responsive-form
---

# VscodeFormContainer

```typescript
import { VscodeFormContainer } '@bendera/vscode-webview-elements';
```

## Responsive form

Try to resize the browser window. The children elements will be resized to the container.

<component-preview>
  <vscode-form-container responsive>
    <vscode-form-group vertical>
      <vscode-label for="inputbox-01" side-aligned="end">
        Lorem <span class="normal">ipsum</span>:
      </vscode-label>
      <vscode-inputbox id="inputbox-01" placeholder="Placeholder example"></vscode-inputbox>
      <vscode-form-helper>
        <p>Lorem ipsum <code>let dolor = sit amet</code>, consectetur adipiscing elit. <span class="error">Suspendisse</span> faucibus imperdiet sapien, a gravida <a href="#">dolor</a>.</p>
        <ul>
          <li>Lorem</li>
          <li>Ipsum</li>
          <li>Dolor</li>
        </ul>
      </vscode-form-helper>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="inputbox-02" side-aligned="end">
        Dolor sit:
      </vscode-label>
      <vscode-inputbox id="inputbox-02" multiline></vscode-inputbox>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="select-01" side-aligned="end">
        <span class="lightened">Duis eget</span> erat accumsan:
      </vscode-label>
      <vscode-single-select id="select-01">
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-single-select>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="select-02" side-aligned="end">
        <span class="lightened">Duis eget</span> erat accumsan:
      </vscode-label>
      <vscode-multi-select id="select-02">
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-multi-select>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="checkbox-01" side-aligned="end">
        Phasellus quam arcu:
      </vscode-label>
      <vscode-checkbox-group>
        <vscode-checkbox id="checkbox-01" label="Lorem ipsum"></vscode-checkbox>
        <vscode-checkbox id="checkbox-02" label="Donec mi risus"></vscode-checkbox>
        <vscode-checkbox id="checkbox-03">Duis <a href="#">ullamcorper</a></vscode-checkbox>
      </vscode-checkbox-group>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="checkbox-04" side-aligned="end">
        Phasellus quam arcu:
      </vscode-label>
      <vscode-checkbox-group vertical>
        <vscode-checkbox id="checkbox-04">Lorem ipsum</vscode-checkbox>
        <vscode-checkbox id="checkbox-05">Donec mi risus</vscode-checkbox>
        <vscode-checkbox id="checkbox-06">Nullam tincidunt eros sit amet sollicitudin pharetra. Ut quis rutrum enim, non finibus odio. Morbi tempus lacus neque, eget rutrum sapien porttitor vitae. Vivamus placerat nisl eu turpis tristique, eu consectetur libero finibus. Duis vitae orci at risus ultrices gravida. Ut vitae nulla velit. Mauris sed enim eleifend, euismod tortor vitae, vehicula odio.</vscode-checkbox>
      </vscode-checkbox-group>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="radio-01" side-aligned="end">
        Phasellus quam arcu:
      </vscode-label>
      <vscode-radio-group>
        <vscode-radio id="radio-01" name="radio-example">Lorem ipsum</vscode-radio>
        <vscode-radio id="radio-02" name="radio-example">Donec mi risus</vscode-radio>
        <vscode-radio id="radio-03" name="radio-example">Duis <a href="#">ullamcorper</a></vscode-radio>
      </vscode-radio-group>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="radio-04" side-aligned="end">
        Phasellus quam arcu:
      </vscode-label>
      <vscode-radio-group vertical>
        <vscode-radio id="radio-04" name="radio-example-2">Lorem ipsum</vscode-radio>
        <vscode-radio id="radio-05" name="radio-example-2">Donec mi risus</vscode-radio>
        <vscode-radio id="radio-06" name="radio-example-2">Duis ullamcorper</vscode-radio>
      </vscode-radio-group>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-button>Save</vscode-button>
      <vscode-button secondary>Cancel</vscode-button>
    </vscode-form-group>
  </vscode-form-container>
</component-preview>

### HTML

```html

```
