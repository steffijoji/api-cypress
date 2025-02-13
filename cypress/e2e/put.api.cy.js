/// <reference types="cypress" />


describe('Update de dispositivos', () => {

  const dataDevice = require('../fixtures/device-data.json')

  it('Atualizar um dispositivo', () => {

    const dataAtual = new Date().toISOString().slice(0, 10)

    cy.cadastrarDevice(dataDevice.registerBody)
      .then((response) => {
        expect(response.status).equal(200)
        expect(response.body.name).equal('Apple MacBook Air')

        const deviceId = response.body.id

        cy.alterarDevice(dataDevice.updateBody, deviceId)
          .then((responseUpdate) => {
            expect(responseUpdate.status).equal(200)
            expect(responseUpdate.body).not.null
            expect(responseUpdate.body.name).equal('Apple MacBook Air - update')
            expect(responseUpdate.body.data.price).equal(6399.00)
            expect(responseUpdate.body.updatedAt.slice(0, 10)).equal(dataAtual)
          })
      })
  })
})