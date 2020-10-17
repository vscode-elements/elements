describe('vscode-select', () => {
  beforeEach(() => {
    cy.visit('/pages/vscode-select');
  });

  it('Default behavior', () => {
    cy.get('#vscode-select__default vscode-select').as('vscodeSelect');
    cy.get('#vscode-select__default .logger').as('logger');

    cy.get('@logger').should('contain', 'Lorem');
    cy.get('@vscodeSelect').find('.select-face').should('contain', 'Lorem');

    cy.get('@vscodeSelect').click();

    cy.get('@vscodeSelect').find('vscode-option[data-index=1]').as('option2');
    cy.get('@option2').should('contain', 'Ipsum');
    cy.get('@option2').click();

    cy.get('@logger').should('contain', 'Ipsum');
    cy.get('@vscodeSelect').should('have.prop', 'value', 'Ipsum');
    cy.get('@vscodeSelect').find('.select-face').should('contain', 'Ipsum');

    cy.get('@vscodeSelect').invoke('prop', 'selectedIndex', -1);
    cy.get('@vscodeSelect')
      .find('.select-face')
      .should('have.prop', 'innerHTML', '<!---->&nbsp;<!---->');
    cy.get('@vscodeSelect').should('have.prop', 'value', '');
  });

  it('Explicit values', () => {
    cy.get('#vscode-select__value vscode-select').as('vscodeSelect');

    cy.get('@vscodeSelect').click();
    cy.get('@vscodeSelect').find('vscode-option[data-index=1]').as('option2');
    cy.get('@option2').should('contain', 'Ipsum');
    cy.get('@option2').click();
    cy.get('@vscodeSelect').should('have.prop', 'value', 'test value 2');
  });

  it('Option descriptions', () => {
    cy.get('#vscode-select__description vscode-select').as('vscodeSelect');

    cy.get('@vscodeSelect').click();
    cy.get('@vscodeSelect')
      .find('vscode-option[data-index=1]')
      .trigger('mouseenter');
    cy.get('@vscodeSelect')
      .find('.dropdown')
      .should('contain', 'Test description 2');
    cy.get('@vscodeSelect').click();
  });

  it('Create element', () => {
    cy.get('#vscode-select__create-element vscode-select').as('vscodeSelect');

    cy.get('@vscodeSelect').should('have.prop', 'value', 'test value 2');
    cy.get('@vscodeSelect')
      .invoke('prop', 'selectedIndex', 2)
      .find('.select-face')
      .should('contain', 'Dolor');
    cy.get('@vscodeSelect').should('have.prop', 'value', 'test value 3');
    cy.get('@vscodeSelect')
      .invoke('prop', 'value', 'test value 1')
      .find('.select-face')
      .should('contain', 'Lorem');
  });
});
