
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('dashboard', function () {

    context('quando o cliente faz um agendamento no app mobile', function () {

        const data = {
            provider: {
                name: 'Luiz Vargas',
                email: 'vargas@samuraibs.com',
                password: 'test3qa',
                is_provider: true

            },
            customer: {
                name: 'Guto Santos',
                email: 'guto@yahoo.com',
                password: 'test3qa',
                is_provider: false
            },
            appointmentHour: '14:00'
        }

        before(function () {
            cy.postUser(data.provider)
            cy.postUser(data.customer)

            cy.apiLogin(data.customer)
            cy.setProviderId(data.provider.email)
            cy.createAppointment(data.appointmentHour)
        })

        it('o mesmo deve ser exibido no dasboard', function () {

            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()

            dashPage.calendarShouldBeVisible()

            const day = Cypress.env('appointmentDay')
            dashPage.selectDay(day)

            dashPage.appointmentShouldBe(data.customer, data.appointmentHour)
        })
    })
})

//Commands(refatorar)

import moment from 'moment'
import login from '../support/pages/login'

Cypress.Commands.add('createAppointment', function (hour) {
    let now = new Date()
    now.setDate(now.getDate() + 2)

    Cypress.env('appointmentDay', now.getDate())

    const day = moment(now).format('YYYY-MM-DD ' + hour + ':00')


    const payload = {
        provider_id: Cypress.env('providerId'),
        date: day
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/appointments',
        body: payload,
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }


    }).then(function (response) {
        expect(response.status).to.eq(200)

    })
})



Cypress.Commands.add('setProviderId', function (providerEmail) {

    cy.request({
        method: 'GET',
        url: 'http://localhost:3333/providers',
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)
        cy.log(response.body)

        const providerList = response.body

        providerList.forEach(function (provider) {
            if (provider.email == providerEmail) {
                Cypress.env('providerId', provider.id)
            }
        })
    })
})


Cypress.Commands.add('apiLogin', function (user) {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload

    }).then(function (response) {
        expect(response.status).to.eq(200)
        Cypress.env('apiToken', response.body.token)

    })

})