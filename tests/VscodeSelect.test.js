describe('vscode-select', () => {
  let elHandle;

  beforeAll(async () => {
    try {
      await page.goto('http://localhost:5001/tests/vscode-select.html', {
        waitUntil: 'networkidle0'
      });
    } catch(e) {
      console.error(e);
    }
  });

  beforeEach(async () =>{
    elHandle = await page.evaluateHandle(() => {
      const el = document.createElement('vscode-select');
      document.body.appendChild(el);
      return el;
    });
  });

  afterEach(async () => {
    await page.evaluateHandle((el) => {
      document.body.removeChild(el);
    }, elHandle);
  });

  it('Should display the label of the selected option', async () => {
    const label = await page.evaluate(async () => {
      const select = document.getElementById('select-selectedindex');
      const selectFace = select.shadowRoot.querySelector('.select-face');

      return Promise.resolve(selectFace.innerText);
    });

    expect(label).toBe('Option 2');
  });

  it('Should select the proper option by value', async () => {
    const label = await page.evaluate(async () => {
      const select = document.getElementById('select-default');
      const selectFace = select.shadowRoot.querySelector('.select-face');

      select.value = '3';
      await select.updateComplete;

      return Promise.resolve(selectFace.innerText);
    });

    expect(label).toBe('Option 3');
  });

  it('Value should be an empty string', async () => {
    const result = await page.evaluate(() => {
      const select = document.getElementById('select-empty-value');
      const selectFace = select.shadowRoot.querySelector('.select-face');

      return Promise.resolve({
        selectLabel: selectFace.innerText,
        selectValue: select.value
      });
    });

    expect(result.selectLabel).toBe('---Select an option---');
    expect(result.selectValue).toBe('');
  });
});
