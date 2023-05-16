context('Dummy test', () => {
  it('should always pass', () => {
    cy.visit('/budget');

    cy.get('div').should('exist');
  });
});
