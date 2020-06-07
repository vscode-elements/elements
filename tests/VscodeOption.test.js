describe('vscode-option', () => {
  let elHandle;

  beforeAll(async () => {
    try {
      await page.goto('http://localhost:5001/tests/vscode-option.html', {
        waitUntil: 'networkidle0'
      });
    } catch(e) {
      console.error(e);
    }
  });

  it('Should return an empty string', async () => {
    const val = await page.evaluate(async () => {
      const op = document.getElementById('op-1');

      return Promise.resolve(op.value);
    });

    expect(val).toBe('');
  });

  it('Should return "2"', async () => {
    const val = await page.evaluate(async () => {
      const op = document.getElementById('op-2');

      return Promise.resolve(op.value);
    });

    expect(val).toBe('2');
  });

  it('Value should be equals to the label', async () => {
    const val = await page.evaluate(async () => {
      const op = document.getElementById('op-4');

      return Promise.resolve(op.value);
    });

    expect(val).toBe('Option 4');
  });

  it('Should return description', async () => {
    const val = await page.evaluate(async () => {
      const op = document.getElementById('op-3');

      return Promise.resolve(op.description);
    });

    expect(val).toBe('Option 3 description');
  });

  it('Description should be an empty string', async () => {
    const val = await page.evaluate(async () => {
      const op = document.getElementById('op-4');

      return Promise.resolve(op.description);
    });

    expect(val).toBe('');
  });
});
