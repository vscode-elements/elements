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
});
