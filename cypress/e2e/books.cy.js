describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
    //List books
    cy.visit('/')
      .get('[data-cy=link-to-books]').click()
    //Create book
    cy.get('[href="/books/create"]').click()
      .get('[data-cy=input-book-title]').type('Book-By-Cypress')
      .get('[data-cy=button-submit-book]').click()
      .get('[data-cy=book-list]').contains('Book-By-Cypress')
    //Show book
    cy.get('[data-cy^=link-to-visit-book-]').last().click()
      .get('h1').should('contain.text', 'Book-By-Cypress')
      .get('[href="/books"]').click()
    //Edit
    cy.get('[data-cy^=link-to-edit-book-]').last().click()
      .get('[data-cy=input-book-title]').clear().type('Book-By-Cypress-Edited')
      .get('[data-cy=button-submit-book]').click()
      .get('[data-cy=book-list]').contains('Book-By-Cypress-Edited')
    //Delete
    cy.get('[data-cy^=link-to-delete-book-]').last().click()
      .get('[data-cy^=link-to-visit-book-]').last().should('not.contain.text', 'Book-By-Cypress-Edited')
  })
})