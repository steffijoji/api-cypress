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
Cypress.Commands.add('buscarDeviceEspecifico', (deviceId) => {
    cy.request({
        method: 'GET',
        url: `/objects/${deviceId}`,
        failOnStatusCode: false
    }).then((response) => { return response})
})

Cypress.Commands.add('cadastrarDevice', (body) => {
    cy.request({
        method: 'POST',
        url: '/objects',
        failOnStatusCode: false,
        body: body
    }) //sem o .then e return, funciona normalmente
})

Cypress.Commands.add('alterarDevice', (body, deviceId) => {
    cy.request({
        method: 'PUT',
        url: `/objects/${deviceId}`,
        failOnStatusCode: false,
        body: body
    })
})

Cypress.Commands.add('deletarDevice', (deviceId) => {
    cy.request({
        method: 'DELETE',
        url: `/objects/${deviceId}`,
        failOnStatusCode: false
      }).as('deleteDevice')
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