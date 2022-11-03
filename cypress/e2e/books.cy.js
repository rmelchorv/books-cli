describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
    //List books
    cy.visit('/')
      .get('[data-cy=link-to-books]').click()
    //Create book
    cy.get('[href="/books/create"]').click()
      .get('[data-cy=input-book-title]').type('Book-Cypress')
      .get('[data-cy=button-submit-book]').click()
      .get('[data-cy=book-list]').contains('Book-Cypress')
    //Show book
    cy.get('[data-cy^=link-to-visit-book-]').last().click()
      .get('h1').should('contain.text', 'Book-Cypress')
      .get('[href="/books/create"]').click()
    //Edit
    cy.get('[data-cy^=link-to-edit-book-]').last().click()
      .get('[data-cy=input-book-title]').clear().type('Book-Cypress-Edited')
      .get('[data-cy=button-submit-book]').click()
      .get('[data-cy=book-list]').contains('Book-Cypress-Edited')
    //Delete
    cy.get('[data-cy^=link-to-delete-book-]').last().click()
      .get('[data-cy^=link-to-visit-book-]').last().should('not.contain.text', 'Book-Cypress-Edited')
  })
})