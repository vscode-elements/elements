describe('vscode-checkbox', () => {
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
      const el = document.createElement('vscode-checkbox');
      document.body.appendChild(el);
      return el;
    });
  });

  afterEach(async () => {
    await page.evaluateHandle((el) => {
      document.body.removeChild(el);
    }, elHandle);
  });

  it('Should not be checked', async () => {
    const numIcons = await page.evaluate(async (el) => {
      el.checked = false;
      await el.updateComplete;
      const icons = Array.from(el.shadowRoot.querySelectorAll('.icon vscode-icon'));
      return Promise.resolve(icons.length);
    }, elHandle);

    expect(numIcons).toBe(0);
  });

  it('Should be checked', async () => {
    const numIcons = await page.evaluate(async (el) => {
      el.checked = true;
      await el.updateComplete;
      const icons = Array.from(el.shadowRoot.querySelectorAll('.icon vscode-icon'));
      return Promise.resolve(icons.length);
    }, elHandle);

    expect(numIcons).toBe(1);
  });

  it('The label should be display', async () => {
    const labelExpected = 'Test label';

    const labelActual = await page.evaluate(async (el, labelExpected) => {
      el.label = labelExpected;
      await el.updateComplete;
      return Promise.resolve(el.shadowRoot.querySelector('label').innerText);
    }, elHandle, labelExpected);

    expect(labelActual).toBe(labelExpected);
  });

  it('The slotted content should be display', async () => {
    const slotted = await page.evaluate(async (el) => {
      const content = document.createElement('b');
      content.innerHTML = 'Test label';

      el.appendChild(content);
      await el.updateComplete;

      const slot = el.shadowRoot.querySelector('slot');
      const assignedElementInfo = {
        tagName: slot.assignedElements()[0].tagName,
        innerHTML: slot.assignedElements()[0].innerHTML,
      };

      return Promise.resolve(assignedElementInfo);
    }, elHandle);

    expect(slotted.tagName.toLowerCase()).toBe('b');
    expect(slotted.innerHTML).toBe('Test label');
  });

  it('Should dispatch custom event', async () => {
    const customEventDetail = await page.evaluate(async (el) => {
      let event;

      el.checked = false;
      el.label = 'Test label';
      el.value = 'Test value';

      el.addEventListener('vsc-change', (ev) => {
        event = ev;
      });

      el.shadowRoot.querySelector('label').dispatchEvent(new MouseEvent('click'));

      return Promise.resolve(event.detail);
    }, elHandle);

    expect(customEventDetail.checked).toBe(true);
    expect(customEventDetail.label).toBe('Test label');
    expect(customEventDetail.value).toBe('Test value');
  });
});
