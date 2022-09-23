
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'


describe('login', () => {

    context('quando o usuário é muito bom', () => {

        const user = {
            name: 'Gerson Jassa',
            email: 'jassa@samuraibs.com',
            password: 'test3qa',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)

        })

        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })
    })

    context('quando o usuário é bom mas a senha está incorreta', () => {

        let user = {
            name: 'Celso Kamura',
            email: 'Kamura@samuraibs.com',
            password: 'test3qa',
            is_provider: true
        }

        before(() => {
            cy.postUser(user).then(() => {
                user.password = 'ka123'
            })
        })

        it('deve notificar erro de credenciais', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.toast.shouldHaveText(message)
        })
    })

    context('quando o formato do email é inválido', () => {

        const emails = [
            'aline.com.br',
            'gmail.com',
            '@yahoo.com',
            '123',
            '@',
            '$**^^!',
            'abc123'
        ]

        before(() => {
            loginPage.go()
        })

        emails.forEach((email) => {
            it('não deve logar com email: ' + email, () => {
                const user = { email: email, password: 'test3qa' }

                loginPage.form(user)
                loginPage.submit()
                loginPage.alertHaveText('Informe um email válido')
            })

        })

    })

    context('quando não preencho nenhum dos campos', () => {

        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(() => {
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach((alert) => {

            it('deve exibir ' + alert.toLocaleLowerCase(), () => {
                loginPage.alertHaveText(alert)

            })

        })
    })
})
