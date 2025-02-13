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

    cy.cadastrarDevice(body)
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