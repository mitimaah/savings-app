context('Display ledger', () => {
  beforeEach(() => {
    cy.task('db:reset');

    cy.visit('/ledger');
  });

  it('Should display table', () => {
    cy.get('table').should('exist');
  });

  it('should show ledger data', () => {
    const rows = cy.get('tbody').children('.MuiTableRow-root');

    const tableText = {
      0: 'Wypłata',
      1: 'Waga łazienkowa',
      // 2: 'Chemia do kuchni',
    };
    rows.each(($el, idx) => {
      // action box + 4 columns
      cy.wrap($el).children().should('have.length', 5);

      cy.wrap($el)
        .children()
        .eq(0)
        .children()
        .first()
        .should('have.class', 'MuiCheckbox-root');
      cy.wrap($el).children().eq(1).should('have.text', tableText[idx]);
    });
  });
});
