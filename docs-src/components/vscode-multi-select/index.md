---
layout: component.njk
title: MultiSelect
tags: component
component: vscode-multi-select
---

# MultiSelect

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-multiselect';
```

## Basic example

<component-preview>
  <vscode-multi-select id="select-example">
    <vscode-option description="Consectetur adipiscing elit">Lorem</vscode-option>
    <vscode-option selected description="Donec elit odio">Ipsum</vscode-option>
    <vscode-option description="Aliquam ac vulputate eros">Dolor</vscode-option>
  </vscode-multi-select>
</component-preview>
<script>
  const select = document.querySelector('#select-example');
  select.addEventListener('vsc-change', (event) => {
    console.log(event);
  });
</script>

<details>
  <summary>Code</summary>

### HTML

```html
<vscode-multi-select id="select-example">
  <vscode-option description="Consectetur adipiscing elit">Lorem</vscode-option>
  <vscode-option selected description="Donec elit odio">Ipsum</vscode-option>
  <vscode-option description="Aliquam ac vulputate eros">Dolor</vscode-option>
</vscode-multi-select>
```

### Javascript

```javascript
const select = document.querySelector('#select-example');
select.addEventListener('vsc-change', (event) => {
  console.log(event);
});
```

</details>

## Combobox mode

<component-preview>
  <vscode-multi-select filter="fuzzy" combobox>
    <vscode-option>Afghanistan</vscode-option>
    <vscode-option>Albania</vscode-option>
    <vscode-option>Algeria</vscode-option>
    <vscode-option>Andorra</vscode-option>
    <vscode-option>Angola</vscode-option>
    <vscode-option>Antigua and Barbuda</vscode-option>
    <vscode-option>Argentina</vscode-option>
    <vscode-option>Armenia</vscode-option>
    <vscode-option>Australia</vscode-option>
    <vscode-option>Austria</vscode-option>
    <vscode-option>Azerbaijan</vscode-option>
    <vscode-option>Bahamas</vscode-option>
    <vscode-option>Bahrain</vscode-option>
    <vscode-option>Bangladesh</vscode-option>
    <vscode-option>Barbados</vscode-option>
    <vscode-option>Belarus</vscode-option>
    <vscode-option>Belgium</vscode-option>
    <vscode-option>Belize</vscode-option>
    <vscode-option>Benin</vscode-option>
    <vscode-option>Bhutan</vscode-option>
    <vscode-option>Bolivia</vscode-option>
    <vscode-option>Bosnia and Herzegovina</vscode-option>
    <vscode-option>Botswana</vscode-option>
    <vscode-option>Brazil</vscode-option>
    <vscode-option>Brunei</vscode-option>
    <vscode-option>Bulgaria</vscode-option>
    <vscode-option>Burkina Faso</vscode-option>
    <vscode-option>Burundi</vscode-option>
    <vscode-option>Côte d'Ivoire</vscode-option>
    <vscode-option>Cabo Verde</vscode-option>
    <vscode-option>Cambodia</vscode-option>
    <vscode-option>Cameroon</vscode-option>
    <vscode-option>Canada</vscode-option>
    <vscode-option>Central African Republic</vscode-option>
    <vscode-option>Chad</vscode-option>
    <vscode-option>Chile</vscode-option>
    <vscode-option>China</vscode-option>
    <vscode-option>Colombia</vscode-option>
    <vscode-option>Comoros</vscode-option>
    <vscode-option>Congo (Congo-Brazzaville)</vscode-option>
    <vscode-option>Costa Rica</vscode-option>
    <vscode-option>Croatia</vscode-option>
    <vscode-option>Cuba</vscode-option>
    <vscode-option>Cyprus</vscode-option>
    <vscode-option>Czechia (Czech Republic)</vscode-option>
    <vscode-option>Democratic Republic of the Congo</vscode-option>
    <vscode-option>Denmark</vscode-option>
    <vscode-option>Djibouti</vscode-option>
    <vscode-option>Dominica</vscode-option>
    <vscode-option>Dominican Republic</vscode-option>
    <vscode-option>Ecuador</vscode-option>
    <vscode-option>Egypt</vscode-option>
    <vscode-option>El Salvador</vscode-option>
    <vscode-option>Equatorial Guinea</vscode-option>
    <vscode-option>Eritrea</vscode-option>
    <vscode-option>Estonia</vscode-option>
    <vscode-option>Eswatini (fmr. "Swaziland")</vscode-option>
    <vscode-option>Ethiopia</vscode-option>
    <vscode-option>Fiji</vscode-option>
    <vscode-option>Finland</vscode-option>
    <vscode-option>France</vscode-option>
    <vscode-option>Gabon</vscode-option>
    <vscode-option>Gambia</vscode-option>
    <vscode-option>Georgia</vscode-option>
    <vscode-option>Germany</vscode-option>
    <vscode-option>Ghana</vscode-option>
    <vscode-option>Greece</vscode-option>
    <vscode-option>Grenada</vscode-option>
    <vscode-option>Guatemala</vscode-option>
    <vscode-option>Guinea</vscode-option>
    <vscode-option>Guinea-Bissau</vscode-option>
    <vscode-option>Guyana</vscode-option>
    <vscode-option>Haiti</vscode-option>
    <vscode-option>Holy See</vscode-option>
    <vscode-option>Honduras</vscode-option>
    <vscode-option>Hungary</vscode-option>
    <vscode-option>Iceland</vscode-option>
    <vscode-option>India</vscode-option>
    <vscode-option>Indonesia</vscode-option>
    <vscode-option>Iran</vscode-option>
    <vscode-option>Iraq</vscode-option>
    <vscode-option>Ireland</vscode-option>
    <vscode-option>Israel</vscode-option>
    <vscode-option>Italy</vscode-option>
    <vscode-option>Jamaica</vscode-option>
    <vscode-option>Japan</vscode-option>
    <vscode-option>Jordan</vscode-option>
    <vscode-option>Kazakhstan</vscode-option>
    <vscode-option>Kenya</vscode-option>
    <vscode-option>Kiribati</vscode-option>
    <vscode-option>Kuwait</vscode-option>
    <vscode-option>Kyrgyzstan</vscode-option>
    <vscode-option>Laos</vscode-option>
    <vscode-option>Latvia</vscode-option>
    <vscode-option>Lebanon</vscode-option>
    <vscode-option>Lesotho</vscode-option>
    <vscode-option>Liberia</vscode-option>
    <vscode-option>Libya</vscode-option>
    <vscode-option>Liechtenstein</vscode-option>
    <vscode-option>Lithuania</vscode-option>
    <vscode-option>Luxembourg</vscode-option>
    <vscode-option>Madagascar</vscode-option>
    <vscode-option>Malawi</vscode-option>
    <vscode-option>Malaysia</vscode-option>
    <vscode-option>Maldives</vscode-option>
    <vscode-option>Mali</vscode-option>
    <vscode-option>Malta</vscode-option>
    <vscode-option>Marshall Islands</vscode-option>
    <vscode-option>Mauritania</vscode-option>
    <vscode-option>Mauritius</vscode-option>
    <vscode-option>Mexico</vscode-option>
    <vscode-option>Micronesia</vscode-option>
    <vscode-option>Moldova</vscode-option>
    <vscode-option>Monaco</vscode-option>
    <vscode-option>Mongolia</vscode-option>
    <vscode-option>Montenegro</vscode-option>
    <vscode-option>Morocco</vscode-option>
    <vscode-option>Mozambique</vscode-option>
    <vscode-option>Myanmar (formerly Burma)</vscode-option>
    <vscode-option>Namibia</vscode-option>
    <vscode-option>Nauru</vscode-option>
    <vscode-option>Nepal</vscode-option>
    <vscode-option>Netherlands</vscode-option>
    <vscode-option>New Zealand</vscode-option>
    <vscode-option>Nicaragua</vscode-option>
    <vscode-option>Niger</vscode-option>
    <vscode-option>Nigeria</vscode-option>
    <vscode-option>North Korea</vscode-option>
    <vscode-option>North Macedonia</vscode-option>
    <vscode-option>Norway</vscode-option>
    <vscode-option>Oman</vscode-option>
    <vscode-option>Pakistan</vscode-option>
    <vscode-option>Palau</vscode-option>
    <vscode-option>Palestine State</vscode-option>
    <vscode-option>Panama</vscode-option>
    <vscode-option>Papua New Guinea</vscode-option>
    <vscode-option>Paraguay</vscode-option>
    <vscode-option>Peru</vscode-option>
    <vscode-option>Philippines</vscode-option>
    <vscode-option>Poland</vscode-option>
    <vscode-option>Portugal</vscode-option>
    <vscode-option>Qatar</vscode-option>
    <vscode-option>Romania</vscode-option>
    <vscode-option>Russia</vscode-option>
    <vscode-option>Rwanda</vscode-option>
    <vscode-option>Saint Kitts and Nevis</vscode-option>
    <vscode-option>Saint Lucia</vscode-option>
    <vscode-option>Saint Vincent and the Grenadines</vscode-option>
    <vscode-option>Samoa</vscode-option>
    <vscode-option>San Marino</vscode-option>
    <vscode-option>Sao Tome and Principe</vscode-option>
    <vscode-option>Saudi Arabia</vscode-option>
    <vscode-option>Senegal</vscode-option>
    <vscode-option>Serbia</vscode-option>
    <vscode-option>Seychelles</vscode-option>
    <vscode-option>Sierra Leone</vscode-option>
    <vscode-option>Singapore</vscode-option>
    <vscode-option>Slovakia</vscode-option>
    <vscode-option>Slovenia</vscode-option>
    <vscode-option>Solomon Islands</vscode-option>
    <vscode-option>Somalia</vscode-option>
    <vscode-option>South Africa</vscode-option>
    <vscode-option>South Korea</vscode-option>
    <vscode-option>South Sudan</vscode-option>
    <vscode-option>Spain</vscode-option>
    <vscode-option>Sri Lanka</vscode-option>
    <vscode-option>Sudan</vscode-option>
    <vscode-option>Suriname</vscode-option>
    <vscode-option>Sweden</vscode-option>
    <vscode-option>Switzerland</vscode-option>
    <vscode-option>Syria</vscode-option>
    <vscode-option>Tajikistan</vscode-option>
    <vscode-option>Tanzania</vscode-option>
    <vscode-option>Thailand</vscode-option>
    <vscode-option>Timor-Leste</vscode-option>
    <vscode-option>Togo</vscode-option>
    <vscode-option>Tonga</vscode-option>
    <vscode-option>Trinidad and Tobago</vscode-option>
    <vscode-option>Tunisia</vscode-option>
    <vscode-option>Turkey</vscode-option>
    <vscode-option>Turkmenistan</vscode-option>
    <vscode-option>Tuvalu</vscode-option>
    <vscode-option>Uganda</vscode-option>
    <vscode-option>Ukraine</vscode-option>
    <vscode-option>United Arab Emirates</vscode-option>
    <vscode-option>United Kingdom</vscode-option>
    <vscode-option>United States of America</vscode-option>
    <vscode-option>Uruguay</vscode-option>
    <vscode-option>Uzbekistan</vscode-option>
    <vscode-option>Vanuatu</vscode-option>
    <vscode-option>Venezuela</vscode-option>
    <vscode-option>Vietnam</vscode-option>
    <vscode-option>Yemen</vscode-option>
    <vscode-option>Zambia</vscode-option>
    <vscode-option>Zimbabwe</vscode-option>
  </vscode-multi-select>
</component-preview>

<details>
  <summary>Code</summary>

### HTML

```html
<vscode-multi-select filter="fuzzy" combobox>
  <vscode-option>Afghanistan</vscode-option>
  <vscode-option>Albania</vscode-option>
  <vscode-option>Algeria</vscode-option>
  ...
</vscode-multi-select>
```

</details>

## Invalid state

<component-preview>
  <vscode-multi-select invalid>
    <vscode-option description="Consectetur adipiscing elit">Lorem</vscode-option>
    <vscode-option selected description="Donec elit odio">Ipsum</vscode-option>
    <vscode-option description="Aliquam ac vulputate eros">Dolor</vscode-option>
  </vscode-multi-select>
</component-preview>

<details>
  <summary>Code</summary>

### HTML

```html
<vscode-multi-select invalid>
  <vscode-option description="Consectetur adipiscing elit">Lorem</vscode-option>
  <vscode-option selected description="Donec elit odio">Ipsum</vscode-option>
  <vscode-option description="Aliquam ac vulputate eros">Dolor</vscode-option>
</vscode-multi-select>
```

</details>
