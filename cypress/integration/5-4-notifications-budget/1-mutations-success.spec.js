context('Succeeded Mutations', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/budget');
    });
  
    it('should show notification when add budget record succeeds', () => {
      cy.contains('Zdefiniuj budżet').click();
  
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(0)
        .find('input')
        .type('1000000')
        .should('have.value', '1000000');
  
      cy.get('.MuiModal-root').find('.MuiFormControl-root').eq(1).click();
      cy.get('li[data-value="5"]').click();
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .should('have.value', '5');
  
      cy.get('.MuiModal-root').contains('Zapisz').click();
  
      cy.wait(150);
  
      cy.contains('Budżet został zdefiniowany').should('be.visible');
    });
  
    it('should show notification when remove budget record succeeds', () => {
      cy.intercept('DELETE', 'http://localhost:4320/budget', { statusCode: 400 });
  
      cy.get('tbody').find('input[type="checkbox"]').first().click();
      cy.get('[data-testid="DeleteIcon"]').click();
  
      cy.contains('Element został usunięty').should('be.visible');
    });
  });