/// <reference types="cypress" />


describe('Cadastro de dispositivos', () => {

  const dataDevice = require('../fixtures/device-data.json') 

  it('Cadastrar um dispositivo', () => {

    const dataAtual = new Date().toISOString().slice(0,10)

    cy.cadastrarDevice(dataDevice.registerBody)
      .then((response) => {
        expect(response.status).equal(200)
        expect(response.body).not.empty
        expect(response.body.name).equal('Apple MacBook Air')
        expect(response.body.createdAt).not.empty
        expect(response.body.createdAt.slice(0, 10)).equal(dataAtual)
        expect(response.body.data).not.empty
        expect(response.body.data.year).not.string
        expect(response.body.data.year).equal(2025)
        expect(response.body.data.price).not.string
        expect(response.body.data.price).equal(6500.99)
        expect(response.body.data['CPU model']).not.empty
        expect(response.body.data['CPU model']).equal('GPU 7‑core')
        expect(response.body.data['Hard disk size']).not.empty
        expect(response.body.data['Hard disk size']).equal('8 GB RAM, 256 GB')
      })
  })
})