/// <reference types="cypress" />

describe('Buscar dispositivos', () => {

  it('Buscar um dispositivo específico', () => {

    const deviceId = '7'

    cy.buscarDeviceEspecifico(deviceId)
      .then((response) => {
        expect(response.status).equal(200)
        expect(response.body).not.empty
        expect(response.body.id).equal('7')
        expect(response.body.name).equal('Apple MacBook Pro 16')
        expect(response.body.data).not.empty
        expect(response.body.data.year).not.string
        expect(response.body.data.year).equal(2019)
        expect(response.body.data.price).not.string
        expect(response.body.data.price).equal(1849.99)
        expect(response.body.data['CPU model']).not.empty
        expect(response.body.data['CPU model']).equal('Intel Core i9')
        expect(response.body.data['Hard disk size']).not.empty
        expect(response.body.data['Hard disk size']).equal('1 TB')
      })
  })

  it('Buscar um dispositivo inexistente', () => {

    const deviceId = '123'

    cy.buscarDeviceEspecifico(deviceId)
      .then((response) => {
        expect(response.status).equal(404)
        expect(response.body).not.empty
        expect(response.body.error).equal(`Oject with id=${deviceId} was not found.`)
      })
  })
})