/// <reference types="cypress" />


describe('Exclusão de dispositivos', () => {

  const dataDevice = require('../fixtures/device-data.json')

  it('Excluir um dispositivo', () => {
    
    cy.cadastrarDevice(dataDevice.registerBody)
      .then((response) => {
        expect(response.status).equal(200)
        
        const deviceId = response.body.id

        cy.deletarDevice(deviceId)
          .then((responseDelete) => {
            expect(responseDelete.status).equal(200)
            expect(responseDelete.body).not.null
            expect(responseDelete.body.message).equal(`Object with id = ${response.body.id} has been deleted.`)
          })
      })
  })

  it('Excluir um dispositivo inexistente', () => {

    const idInexistente = '123'

    cy.deletarDevice(idInexistente)
      .then((response) => {
        expect(response.status).equal(404)
        expect(response.body).not.empty
        expect(response.body.error).equal(`Object with id = ${idInexistente} doesn't exist.`)
      })
  })
})