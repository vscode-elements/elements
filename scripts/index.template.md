---
layout: component.njk
title: %componentName%
tags: component
component: %tagName%
---

# %componentName%

<style>
  %tagName% p {
    border: solid 1px blue;
    padding: 8px;
  }
</style>

<component-preview>
  <%tagName%>
    <p>This is child content</p>
  </%tagName%>
</component-preview>

### CSS

```css
p {
  border: solid 1px blue;
  padding: 8px;
}
```

### HTML

```html
<%tagName%>
  <p>This is child content</p>
</%tagName%>
```
