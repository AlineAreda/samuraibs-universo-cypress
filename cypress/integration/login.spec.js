
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'


describe('login', function() {

    context('quando o usuário é muito bom', function() {

        const user = {
            name: 'Gerson Jassa',
            email: 'jassa@samuraibs.com',
            password: 'test3qa',
            is_provider: true
        }

        before(function() {
            cy.postUser(user)

        })

        it('deve logar com sucesso', function() {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
            
        })
    })

    context('quando o usuário é bom mas a senha está incorreta', function() {

        let user = {
            name: 'Celso Kamura',
            email: 'Kamura@samuraibs.com',
            password: 'test3qa',
            is_provider: true
        }

        before(function() {
            cy.postUser(user).then(function() {
                user.password = 'ka123'
            })
        })

        it('deve notificar erro de credenciais', function() {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.toast.shouldHaveText(message)
        })
    })

    context('quando o formato do email é inválido', function() {

        const emails = [
            'aline.com.br',
            'gmail.com',
            '@yahoo.com',
            '123',
            '@',
            '$**^^!',
            'abc123'
        ]

        before(function() {
            loginPage.go()
        })

        emails.forEach(function(email) {
            it('não deve logar com email: ' + email, function() {
                const user = { email: email, password: 'test3qa' }

                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            })

        })

    })

    context('quando não preencho nenhum dos campos', function() {

        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function() {
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function(alert)  {

            it('deve exibir ' + alert.toLocaleLowerCase(), function() {
                loginPage.alert.haveText(alert)

            })

        })
    })
})
