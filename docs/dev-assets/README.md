To list all webview theme variables:

1. Execute VSCode without extensions: `code --disable-extensions`
2. Open the command palette, choose this command: `Developer: Open Webview Developer Tools`
3. Inspect any tag in the webview's html
4. Run the following snippet in the dev console

```javascript
(function () {
  const consoleMsg = Array.from(document.documentElement.style)
    .sort((a, b) => a.localeCompare(b))
    .map(
      (s) => `${s.replace(/\./g, '\\.')}: ${document.documentElement.style.getPropertyValue(s)};\n`
    )
    .join('');

  console.log(consoleMsg);
})();
```
