/// <reference types="cypress" />


describe('Exclusão de dispositivos', () => {

  it('Excluir um dispositivo', () => {

    const body = {
      "name": "Apple MacBook Air",
      "data": {
        "year": 2025,
        "price": 6500.99,
        "CPU model": "GPU 7‑core",
        "Hard disk size": "8 GB RAM, 256 GB"
      }
    }

    cy.request({
      method: 'POST',
      url: 'https://api.restful-api.dev/objects',
      failOnStatusCode: false,
      body: body
    }).as('postRegisterDevice')

    //validaçõesS
    cy.get('@postRegisterDevice')
      .then((response) => {
        expect(response.status).equal(200)

        cy.request({
          method: 'DELETE',
          url: `https://api.restful-api.dev/objects/${response.body.id}`
        }).as('deleteDevice')

        cy.get('@deleteDevice').then((responseDelete) => {
          expect(responseDelete.status).equal(200)
          expect(responseDelete.body).not.null
          expect(responseDelete.body.message).equal(`Object with id = ${response.body.id} has been deleted.`)
        })
      })
  })

  it.only('Excluir um disposiivo inexistente', () => {

    const idInexistente = '123'

    cy.request({
      method: 'DELETE',
      url: `https://api.restful-api.dev/objects/${idInexistente}`,
      failOnStatusCode: false
    }).as('deleteDevice')

    cy.get('@deleteDevice').then((response) => {
      expect(response.status).equal(404)
      expect(response.body).not.empty
      expect(response.body.error).equal(`Object with id = ${idInexistente} doesn't exist.`)
    })
  })
})