export default (story) => {
  document.body.classList.remove(
    'vscode-light',
    'vscode-dark',
    'vscode-high-contrast'
  );
  document.body.classList.add('vscode-light');
  return story();
};
