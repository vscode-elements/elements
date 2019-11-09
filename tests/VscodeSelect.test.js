describe('vscode-select', () => {
  let elHandle;

  beforeAll(async () => {
    try {
      await page.goto('http://localhost:5001/test', {
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
      const select = document.getElementById('select-1');
      const selectFace = select.shadowRoot.querySelector('.select-face');

      return Promise.resolve(selectFace.innerText);
    });

    expect(label).toBe('Option 2');
  });

  it('Should select the proper option by value', async () => {
    const label = await page.evaluate(async () => {
      const select = document.getElementById('select-2');
      const selectFace = select.shadowRoot.querySelector('.select-face');

      select.value = '3';
      await select.updateComplete;

      return Promise.resolve(selectFace.innerText);
    });

    expect(label).toBe('Option 3');
  });
});
