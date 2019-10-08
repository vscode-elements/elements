import VscodeCheckbox from '../components/VscodeCheckbox';

describe('vscode-checkbox', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('Props passed', () => {
    const cb = document.createElement('vscode-checkbox');

    cb.label = 'Test label';
    cb.checked = true;
    cb.value = 'Test value';

    document.body.appendChild(cb);

    console.dir(cb);

    const input = cb.shadowRoot.querySelector('input');

    expect(input.value).toBe('Test value');
  });
});
