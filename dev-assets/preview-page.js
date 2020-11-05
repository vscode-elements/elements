window.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll(
    '.theme-switcher-option button'
  );

  Array.from(buttons).forEach(element => {
    element.addEventListener('click', event => {
      document.body.classList.remove(
        'vscode-light',
        'vscode-dark',
        'vscode-high-contrast'
      );
      document.body.classList.add(event.target.value);
    });
  });
});
