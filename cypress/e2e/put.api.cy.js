/// <reference types="cypress" />


describe('Update de dispositivos', () => {

  it('Atualizar um dispositivo', () => {

    const dataAtual = new Date().toISOString().slice(0, 10)

    const bodyRegister = {
      "name": "Apple MacBook Air",
      "data": {
        "year": 2025,
        "price": 6500.99,
        "CPU model": "GPU 7‑core",
        "Hard disk size": "8 GB RAM, 256 GB"
      }
    }

    const bodyUpdate = {
      "name": "Apple MacBook Air - update",
      "data": {
        "year": 2025,
        "price": 6399.00,
        "CPU model": "GPU 7‑core",
        "Hard disk size": "8 GB RAM, 256 GB"
      }
    }

    cy.cadastrarDevice(bodyRegister)
      .then((response) => {
        expect(response.status).equal(200)
        expect(response.body.name).equal('Apple MacBook Air')

        const deviceId = response.body.id

        cy.alterarDevice(bodyUpdate, deviceId)
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