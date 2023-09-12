context('Ledger table data pagination interactions', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/ledger');
    });

    it('when changing number of rows per page should display proper number of records', () => {
      cy.get('.MuiTablePagination-root').should('exist');
      cy.get('.MuiTablePagination-root').find('.MuiInputBase-root').click()
        .get('ul > li[data-value=4]').click()

      const rows = cy.get('tbody').children('.MuiTableRow-root');

      rows.should('have.length', 4);
    });

    it('when on first page should disable previous page button', () => {
      cy.get('.MuiTablePagination-root').should('exist');
      // go to first page
      cy.get('.MuiTablePagination-actions').children().eq(0).should('have.attr', 'disabled')
      // go to last page
      cy.get('.MuiTablePagination-actions').children().eq(1).should('have.attr', 'disabled')
    })
  });