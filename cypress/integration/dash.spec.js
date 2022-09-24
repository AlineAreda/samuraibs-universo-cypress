
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



