Run this snippet in a webview instance (ex. release notes page) to get all the theme variables:

javascript```
let __html = document
  .querySelector('iframe')
  .contentDocument.querySelector('html');

Array.from(__html.style)
  .sort((a, b) => a.localeCompare(b))
  .map(
    (s) => `  ${s.replace(/\./g, '\\.')}: ${__html.style.getPropertyValue(s)};\n`
  )
  .join('');
```