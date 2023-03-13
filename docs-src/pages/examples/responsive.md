---
layout: page.njk
title: Responsive form
tags: example
weight: 1
---

# Responsive form

<component-preview>
  <vscode-form-container responsive id="example-form">
    <vscode-form-group>
      <vscode-label for="textfield-01">
        Lorem <span class="normal">ipsum</span>:
      </vscode-label>
      <vscode-textfield id="textfield-01" name="input-1" placeholder="Placeholder example"></vscode-textfield>
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
      <vscode-label for="textfield-02">
        Dolor sit:
      </vscode-label>
      <vscode-textfield id="textfield-02" multiline name="input-2"></vscode-textfield>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="select-01">
        <span class="lightened">Duis eget</span> erat accumsan:
      </vscode-label>
      <vscode-single-select id="select-01" name="select-1">
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-single-select>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="select-02">
        <span class="lightened">Duis eget</span> erat accumsan:
      </vscode-label>
      <vscode-multi-select id="select-02" name="select-2">
        <vscode-option>Lorem</vscode-option>
        <vscode-option>Ipsum</vscode-option>
        <vscode-option>Dolor</vscode-option>
      </vscode-multi-select>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="checkbox-01">
        Phasellus quam arcu:
      </vscode-label>
      <vscode-checkbox-group>
        <vscode-checkbox id="checkbox-01" name="checkbox-group-1" value="lorem" label="Lorem ipsum"></vscode-checkbox>
        <vscode-checkbox id="checkbox-02" name="checkbox-group-1" value="ipsum" label="Donec mi risus"></vscode-checkbox>
        <vscode-checkbox id="checkbox-03" name="checkbox-group-1" value="dolor">Duis <a href="#">ullamcorper</a></vscode-checkbox>
      </vscode-checkbox-group>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="checkbox-04">
        Phasellus quam arcu:
      </vscode-label>
      <vscode-checkbox-group variant="vertical">
        <vscode-checkbox id="checkbox-04" name="checkbox-group-2" value="sit">Lorem ipsum</vscode-checkbox>
        <vscode-checkbox id="checkbox-05" name="checkbox-group-2" value="et">Donec mi risus</vscode-checkbox>
        <vscode-checkbox id="checkbox-06" name="checkbox-group-2" value="amur">Nullam tincidunt eros sit amet sollicitudin pharetra. Ut quis rutrum enim, non finibus odio. Morbi tempus lacus neque, eget rutrum sapien porttitor vitae. Vivamus placerat nisl eu turpis tristique, eu consectetur libero finibus. Duis vitae orci at risus ultrices gravida. Ut vitae nulla velit. Mauris sed enim eleifend, euismod tortor vitae, vehicula odio.</vscode-checkbox>
      </vscode-checkbox-group>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="radio-01">
        Phasellus quam arcu:
      </vscode-label>
      <vscode-radio-group>
        <vscode-radio id="radio-01" name="radio-group-1" value="lorem">Lorem ipsum</vscode-radio>
        <vscode-radio id="radio-02" name="radio-group-1" value="ipsum">Donec mi risus</vscode-radio>
        <vscode-radio id="radio-03" name="radio-group-1" value="dolor">Duis <a href="#">ullamcorper</a></vscode-radio>
      </vscode-radio-group>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-label for="radio-04">
        Phasellus quam arcu:
      </vscode-label>
      <vscode-radio-group variant="vertical">
        <vscode-radio id="radio-04" name="radio-group-2" value="sit">Lorem ipsum</vscode-radio>
        <vscode-radio id="radio-05" name="radio-group-2" value="et">Donec mi risus</vscode-radio>
        <vscode-radio id="radio-06" name="radio-group-2" value="amur">Duis ullamcorper</vscode-radio>
      </vscode-radio-group>
    </vscode-form-group>
    <vscode-form-group>
      <vscode-button id="save-button">Save</vscode-button>
      <vscode-button secondary>Cancel</vscode-button>
    </vscode-form-group>
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
<vscode-form-container responsive id="example-form">
  <vscode-form-group>
    <vscode-label for="textfield-01">
      Lorem <span class="normal">ipsum</span>:
    </vscode-label>
    <vscode-textfield id="textfield-01" name="input-1" placeholder="Placeholder example"></vscode-textfield>
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
    <vscode-label for="textfield-02">
      Dolor sit:
    </vscode-label>
    <vscode-textfield id="textfield-02" multiline name="input-2"></vscode-textfield>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-label for="select-01">
      <span class="lightened">Duis eget</span> erat accumsan:
    </vscode-label>
    <vscode-single-select id="select-01" name="select-1">
      <vscode-option>Lorem</vscode-option>
      <vscode-option>Ipsum</vscode-option>
      <vscode-option>Dolor</vscode-option>
    </vscode-single-select>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-label for="select-02">
      <span class="lightened">Duis eget</span> erat accumsan:
    </vscode-label>
    <vscode-multi-select id="select-02" name="select-2">
      <vscode-option>Lorem</vscode-option>
      <vscode-option>Ipsum</vscode-option>
      <vscode-option>Dolor</vscode-option>
    </vscode-multi-select>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-label for="checkbox-01">
      Phasellus quam arcu:
    </vscode-label>
    <vscode-checkbox-group>
      <vscode-checkbox id="checkbox-01" name="checkbox-group-1" value="lorem" label="Lorem ipsum"></vscode-checkbox>
      <vscode-checkbox id="checkbox-02" name="checkbox-group-1" value="ipsum" label="Donec mi risus"></vscode-checkbox>
      <vscode-checkbox id="checkbox-03" name="checkbox-group-1" value="dolor">Duis <a href="#">ullamcorper</a></vscode-checkbox>
    </vscode-checkbox-group>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-label for="checkbox-04">
      Phasellus quam arcu:
    </vscode-label>
    <vscode-checkbox-group variant="vertical">
      <vscode-checkbox id="checkbox-04" name="checkbox-group-2" value="sit">Lorem ipsum</vscode-checkbox>
      <vscode-checkbox id="checkbox-05" name="checkbox-group-2" value="et">Donec mi risus</vscode-checkbox>
      <vscode-checkbox id="checkbox-06" name="checkbox-group-2" value="amur">Nullam tincidunt eros sit amet sollicitudin pharetra. Ut quis rutrum enim, non finibus odio. Morbi tempus lacus neque, eget rutrum sapien porttitor vitae. Vivamus placerat nisl eu turpis tristique, eu consectetur libero finibus. Duis vitae orci at risus ultrices gravida. Ut vitae nulla velit. Mauris sed enim eleifend, euismod tortor vitae, vehicula odio.</vscode-checkbox>
    </vscode-checkbox-group>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-label for="radio-01">
      Phasellus quam arcu:
    </vscode-label>
    <vscode-radio-group>
      <vscode-radio id="radio-01" name="radio-group-1" value="lorem">Lorem ipsum</vscode-radio>
      <vscode-radio id="radio-02" name="radio-group-1" value="ipsum">Donec mi risus</vscode-radio>
      <vscode-radio id="radio-03" name="radio-group-1" value="dolor">Duis <a href="#">ullamcorper</a></vscode-radio>
    </vscode-radio-group>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-label for="radio-04">
      Phasellus quam arcu:
    </vscode-label>
    <vscode-radio-group variant="vertical">
      <vscode-radio id="radio-04" name="radio-group-2" value="sit">Lorem ipsum</vscode-radio>
      <vscode-radio id="radio-05" name="radio-group-2" value="et">Donec mi risus</vscode-radio>
      <vscode-radio id="radio-06" name="radio-group-2" value="amur">Duis ullamcorper</vscode-radio>
    </vscode-radio-group>
  </vscode-form-group>
  <vscode-form-group>
    <vscode-button id="save-button">Save</vscode-button>
    <vscode-button secondary>Cancel</vscode-button>
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
  log.innerHTML = JSON.stringify(document.querySelector('#example-form').data, null, 2);
});
```