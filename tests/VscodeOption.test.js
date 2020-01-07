describe('vscode-select', () => {
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

    expect(val).toBe('');
  });

  it('Value should be equals to the label', async () => {
    const val = await page.evaluate(async () => {
      const op = document.getElementById('op-5');

      return Promise.resolve(op.value);
    });

    expect(val).toBe('Option-5');
  });
});
