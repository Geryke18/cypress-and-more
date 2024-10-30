// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('navigateMenu', (mainMenu, subManu) => {
    cy.get('[id="imdbHeader-navDrawerOpen"]').click();
    cy.get('[data-testid="category-expando"]').contains(mainMenu).click();
    cy.get('.ipc-list-item__text').contains(subManu).click();
})

Cypress.Commands.add('pokeApiGetRequest', (endPoint) => {
    cy.request("GET", `https://pokeapi.co${endPoint}`)
})

Cypress.Commands.add('invalidPokeApiGetRequest', (endPoint) => {
    cy.request({
        method: 'GET',
        url: `https://pokeapi.co${endPoint}`,
        failOnStatusCode: false
      })
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })