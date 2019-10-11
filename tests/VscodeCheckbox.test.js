describe('vscode-checkbox', () => {
  beforeAll(async () => {
    try {
      await page.goto('http://localhost:5001/test', {
        waitUntil: 'networkidle0'
      });
    } catch(e) {
      console.error(e);
    }
  });

  it('should be a vscode-checkbox instance', async () => {
    const tagName = await page.$eval('#checkbox-1', e => e.tagName);
    expect(tagName.toLowerCase()).toBe('vscode-checkbox');
  });

  it('should not be checked', async () => {
    const numIcons = await page.$eval('#checkbox-1', (e) => {
      e.checked = false;
      const icons = Array.from(e.querySelectorAll('.icon vscode-icon'));
      return icons.length;
    });

    expect(numIcons).toBe(0);
  });

  it('should be checked', async () => {
    const numIcons = await page.evaluate(async () => {
      const cb = document.createElement('vscode-checkbox');
      document.body.appendChild(cb);
      cb.checked = true;

      await cb.updateComplete;

      const icons = Array.from(cb.shadowRoot.querySelectorAll('.icon vscode-icon'));

      return Promise.resolve(icons.length);
    });

    expect(numIcons).toBe(1);
  });
});
